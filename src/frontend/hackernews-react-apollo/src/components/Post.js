import React, { Component } from 'react'

class Post extends Component{
    render(){
        return (
            <div>
                <div>
                    {this.props.post.description} ({this.props.post.url})
                </div>
            </div>
        )
    }
}

export default Post