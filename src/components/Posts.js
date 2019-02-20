import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Posts extends Component {
  render() {
    return (
        <ul style={{paddingLeft:0, marginLeft:197, marginTop:0, borderLeft:"1px solid #ededed"}}>
          {this.props.posts.map((post, i) => (
              <li key={i}>
                {post.thumbnail && !post.is_self? <img src={post.thumbnail}/>:<p style={{textAlign:"center", fontWeight:600}}>No Image</p>}
                <div className={'content'}>
                  <p style={{fontSize:11}}>
                    <span><b>subscribers</b> : {post.subreddit_subscribers} </span>
                  </p>
                  <h3 className={'title'}>{post.url?<a href={post.url} target="_blank">{post.title}</a>:`${post.title}`}</h3>
                  <p style={{fontSize:11}}><span>author: {post.author_fullname}</span></p>
                  <p style={{fontSize:11}}><span>{new Date(post.created_utc).toDateString()}</span></p>
                  <p style={{fontSize:11}}>
                    <span>&#128077; {post.ups} </span>
                    <span> <b>comments</b> : {post.num_comments} </span>
                  </p>
                </div>
              </li>
          ))}
        </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}