import graphene
from graphene_django import DjangoObjectType
from users.schema import UserType
from datetime import datetime

from .models import Post



class PostType(DjangoObjectType):
    class Meta:
        model = Post

class Query(graphene.ObjectType):
    posts = graphene.List(PostType)

    def resolve_posts(self, info, **kwargs):
        return Post.objects.all()

class CreatePost(graphene.Mutation):
    id = graphene.Int()
    url = graphene.String()
    description = graphene.String()
    posted_by = graphene.Field(UserType)
    votes = graphene.Int()
    created_date = graphene.DateTime()

    class Arguments:
        url = graphene.String()
        description = graphene.String()

    def mutate(self, info, url, description):
        user = info.context.user or None

        post = Post(
            url=url, 
            description=description,
            posted_by=user,
            votes=0,
            created_date=datetime.now(),
        )        
        post.save()

        return CreatePost(
            id=post.id,
            url=post.url,
            description=post.description,
            posted_by=post.posted_by,
            votes=post.votes,
            created_date=post.created_date
        )

class UpdateVote(graphene.Mutation):
    post = graphene.Field(PostType)
    user = graphene.Field(UserType)

    class Arguments:
        post_id = graphene.Int()
    
    def mutate(self, info, post_id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('You must be logged to vote!')
        
        post = Post.objects.filter(id=post_id).first()
        if not post:
            raise Exception('Invalid Post!')
        
        post.votes += 1
        post.save()

        return UpdateVote(user=user, post=post)


class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()
    update_vote = UpdateVote.Field()