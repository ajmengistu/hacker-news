import React, { Component } from 'react'
import Post from './Post'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const POSTS_QUERY = gql`    
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
                                    <Post 
                                        key={post.id} 
                                        post={post} 
                                        index={index}
                                        // Trigger a rerender of the component and thus update the UI
                                        // with the correct info!
                                        updateStoreAfterVote={this._updateCacheAfterVote} />
                            )}
                        </div>
                    )
                }
            }
            </Query>
        )
    }

    // OBJECTIVE: UI displays the correct number of votes right
    // after the vote mutation is performed.
    // store: InMemoryCache
    // updateVote: the name of the Graphene vote mutation. This mutation returns a
    // Post(id, votes) object with an updated vote count. (See Vote_Mutation in Post.js).
    // postId: the Id of currently voted Post.
    _updateCacheAfterVote = (store, updateVote, postId) => {
        // readQuery: reads the query objects from POST_QUERY
        const data = store.readQuery({ query: POSTS_QUERY })        
        const votedPost = data.posts.find(post => post.id === postId)        
        // Update the vote count for the Post that was voted on
        // using the returned Post(votes) from the VoteMutation.
        // (See Vote_Mutation in Post.js)
        votedPost.votes = updateVote.updateVote.post.votes
        store.writeQuery({ query : POSTS_QUERY, data })
    }
}

export default PostList