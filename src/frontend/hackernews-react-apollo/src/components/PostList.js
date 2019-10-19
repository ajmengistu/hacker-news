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
                postedBy{
                    id
                    username                                        
                }
                votes
                createdDate                
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
                    return (
                        <div>
                            {postsToRender.map(
                                (post, index) => 
                                    <Post key={post.id} post={post} index={index} />
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