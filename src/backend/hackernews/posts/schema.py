import graphene
from graphene_django import DjangoObjectType

from .models import Post



class PostType(DjangoObjectType):
    class Meta:
        model = Post

class Query(graphene.ObjectType):
    posts = graphene.List(PostType)

    def resolve_posts(self, info, **kwargs):
        return Post.objects.all()

# class CreatePost(graphene.Mutation):
#     id = graphene.Int()
#     url = graphene.String()
#     description = graphene.String()
#     posted_by = 
#     votes = graphene.Int()mmm
#     created_date = graphene.Date()

#     class Arguments:
#         url = graphene.String()
#         description = graphene.String()

#     def mutate(self, info, url, description):
#         post = Post(url=url, description=description)
#         post.save()

#         return CreatePost(
#             id=post.id,
#             url=post.url,
#             description=post.description,
#         )
# class Mutation(graphene.ObjectType):
#     create_post = CreatePost.Field()