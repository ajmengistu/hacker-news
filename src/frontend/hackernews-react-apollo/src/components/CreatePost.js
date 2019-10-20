import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { POSTS_QUERY } from './PostList'

// Submit a Post Query
const POST_MUTATION = gql`
    mutation PostMutation($url: String!, $description: String!){
        createPost(url: $url, description: $description){
            id
            url
            description
            createdDate
            postedBy{
                id
                username
            }
            votes
        }
    }
`

class CreatePost extends Component {
    state = {
        url: '',
        description:'',
    }

    render(){
        const { url, description } = this.state
        return (
            <div>
            <div className="flex flex-column mt3">
              <input
                className="mb2"
                value={url}
                onChange={e => this.setState({ url: e.target.value })}
                type="text"
                placeholder="A URL for the link"
              />
              <input
                className="mb2"
                value={description}
                onChange={e => this.setState({ description: e.target.value })}
                type="text"
                placeholder="The description for the link"
              />
            </div>
           <Mutation 
                mutation={POST_MUTATION} 
                variables={{ url, description }} 
                onCompleted={() => this.props.history.push('/')}
                // update: It allows you to update the store based on
                // a mutation's result
                // store: InMemoryCache
                // createPost: the currently submitted valid Post that is returned
                // from the POST_MUTATION (See GQL query above).
                // OBJECTIVE: read the current state of the POSTS_QUERY.
                // Then, insert the newst link at the beginning and write the query
                // results back to the store.
                update={(store, {data: { createPost }}) => {                                    
                    const data = store.readQuery({ query: POSTS_QUERY })                                      
                    data.posts.unshift(createPost)
                    store.writeQuery({
                        query: POSTS_QUERY,
                        data
                    })
                }}>                
               { postMutation => <button onClick={postMutation}>Submit</button>}
           </Mutation>            
          </div>
        )
    }
}

export default CreatePost