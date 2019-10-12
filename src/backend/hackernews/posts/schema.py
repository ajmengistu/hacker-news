import graphene
from graphene_django import DjangoObjectType
import users.schema 
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
    posted_by = graphene.Field(users.schema.UserType)
    votes = graphene.Int()
    created_date = graphene.DateTime()

    class Arguments:
        url = graphene.String()
        description = graphene.String()
        posted_by = graphene.Int()
        votes = graphene.Int()
        # created_date = graphene.DateTime()

    def mutate(self, info, url, description, posted_by, votes):
        post = Post(url=url, description=description, posted_by=posted_by, votes=votes, created_date=datetime.now())
        post.save()

        return CreatePost(
            id=post.id,
            url=post.url,
            description=post.description,
            posted_by=post.posted_by,
            votes=post.votes,
            created_date=post.created_date
        )

class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()