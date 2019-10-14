import React, { Component } from 'react'
import Post from './Post'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const POSTS_QUERY = gql`    
        query{
            posts{
                id
                url
                description
                
            }
        }    
`

class PostList extends Component{
    render(){
        return (
            <Query query={POSTS_QUERY}>
                {({ loading, error, data}) =>{
                    if (loading) return <div>Fetching...</div>
                    if (error) return <div>Error</div>

                    const postsToRender = data.posts 
                    console.log(postsToRender)                 

                    return (
                        <div>
                            {postsToRender.map(
                                post => 
                                    <Post key={post.id} post={post} />
                            )}
                        </div>
                    )
                }
            }
            </Query>
        )
    }
}

export default PostList