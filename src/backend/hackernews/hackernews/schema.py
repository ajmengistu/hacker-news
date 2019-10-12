import graphene

import posts.schema

class Query(posts.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)