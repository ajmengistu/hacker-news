import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

// Submit a Post Query
const POST_MUTATION = gql`
    mutation PostMutation($url: String!, $description: String!){
        createPost(url: $url, description: $description){
            id
            url
            description
            createdDate
            postedBy{
                username
            }
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
                value={description}
                onChange={e => this.setState({ description: e.target.value })}
                type="text"
                placeholder="A URL for the link"
              />
              <input
                className="mb2"
                value={url}
                onChange={e => this.setState({ url: e.target.value })}
                type="text"
                placeholder="The description for the link"
              />
            </div>
           <Mutation mutation={POST_MUTATION} variables={{ url, description }}>
               { postMutation => <button onClick={postMutation}>Submit</button>}
           </Mutation>            
          </div>
        )
    }
}

export default CreatePost