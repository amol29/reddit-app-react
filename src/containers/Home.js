import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {subredditList} from "../helper";

class Home extends Component {
  render() {
    return (
        <div style={{marginTop:60}}>
          {subredditList.map((subreddit, i) => {
            return <NavLink className={'link-box'} key={i} to={`/${subreddit}`}>
              {subreddit}
            </NavLink>
          })
          }
        </div>
    )
  }
}

export default (Home)