import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate} from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
  mutation VoteMutation($postId: Int!){
    updateVote(postId: $postId){
      post{
        id
        votes
      }
    }
  }
`

class Post extends Component{
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
          <div className="flex mt2 items-start">
            <div className="flex items-center">
              <span className="gray">{this.props.index + 1}.</span>
              {authToken && (
                <Mutation 
                  mutation={VOTE_MUTATION} 
                  variables={{ postId: this.props.post.id }}
                  // Update called directly after the server returned the response.
                  // store: current cache                  
                  update={(store, { data }) =>                     
                    this.props.updateStoreAfterVote(store, data, this.props.post.id)}>

                  {mutation => (
                    <div className="ml1 gray f11" onClick={mutation}>
                      ▲
                    </div>
                  )}
                </Mutation>
              )}
            </div>
            <div className="ml1">
              <div>
                {this.props.post.description} ({this.props.post.url})
              </div>
              <div className="f6 lh-copy gray">
                {this.props.post.votes} votes | by{' '} 
                {this.props.post.postedBy.username ? 
                this.props.post.postedBy.username : 'Unkown'} {''}
                {timeDifferenceForDate(this.props.post.createdDate)}
            </div>
            </div>
          </div>
        )
      }
}

export default Post