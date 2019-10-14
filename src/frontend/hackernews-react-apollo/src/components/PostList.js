import React, { Component } from 'react'
import Post from './Post'

class PostList extends Component{
    render(){
        const postsToRender = [
            {
                id: '1',
                description: 'Prisma turns your database into a GraphQL API 😎',
                url: 'https://www.prismagraphql.com',
              },
              {
                id: '2',
                description: 'The best GraphQL client',
                url: 'https://www.apollographql.com/docs/react/',
              },
        ]

        return (
            <div>
                {postsToRender.map(
                    post => <Post key={post.id} post={post} />
                )}
            </div>
        )
    }
}

export default PostList