import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate} from '../utils'

class Post extends Component{
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
          <div className="flex mt2 items-start">
            <div className="flex items-center">
              <span className="gray">{this.props.index + 1}.</span>
              {authToken && (
                <div className="ml1 gray f11" onClick={() => this._voteForLink()}>
                  ▲ 
                </div>
              )}
            </div>
            <div className="ml1">
              <div>
                {this.props.post.description} ({this.props.post.url})
              </div>
              <div className="f6 lh-copy gray">
                {this.props.post.votes} votes | by{' '} 
                {this.props.post.postedBy.username} {''}
                {timeDifferenceForDate(this.props.post.createdDate)}
            </div>
            </div>
          </div>
        )
      }
}

export default Post