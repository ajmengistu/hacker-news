import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Post from './Post'


const POSTS_SEARCH_QUERY = gql`
    query PostsSearchQuery($search: String!){
        posts(search: $search){
            id
            url
            description
            postedBy{
                id
                username
            }
            votes
        }
    }
`

class Search extends Component {

  state = {
    posts: [],
    search: ''
  }

  render() {
    return (
      <div>
        <div>
          Search
          <input
            type='text'
            onChange={e => this.setState({ search: e.target.value })} 
          />
          <button onClick={() => this._executeSearch()}>OK</button>
        </div>
        {this.state.posts.map((post, index) => (
          <Post key={post.id} post={post} index={index} />
        ))}
      </div>
    )
  }

  _executeSearch = async () => {
    const { search } = this.state
    const result = await this.props.client.query({
        query: POSTS_SEARCH_QUERY,
        variables: { search },
    })
    const posts = result.data.posts
    this.setState({ posts })
  }
}

// withApollo function injects the ApolloClient instance that is created
// in index.js into the Search component as a new prop cal.
// This client has a method called query that sends a query manually instead
// of using the graphql higher-order component
export default withApollo(Search)