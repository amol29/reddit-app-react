import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchPostsIfNeeded, invalidateSubreddit, selectSubreddit} from '../actions'
import Posts from '../components/Posts'
import {NavLink} from "react-router-dom";
import {subredditList} from "../helper";

class SubredditApp extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const {match: {params}, dispatch} = this.props
    this.props.dispatch(selectSubreddit(params.filter))
    dispatch(fetchPostsIfNeeded(params.filter))
  }

  componentDidUpdate(prevProps) {
    const {match: {params}, dispatch} = this.props
    this.props.dispatch(selectSubreddit(params.filter))
    dispatch(fetchPostsIfNeeded(params.filter))

  }

  handleRefreshClick(e) {
    e.preventDefault()
    const {dispatch, selectedSubreddit} = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const {posts, isFetching, lastUpdated} = this.props
    return (
        <div style={{position:"relative"}}>
          <div className={'side-nav'}>
            {subredditList.map((subreddit, i) => {
              return <NavLink key={i} to={`/${subreddit}`}>
                {subreddit}
              </NavLink>
            })
            }
          </div>
          <p style={{textAlign:"right"}}>
            {lastUpdated && (
                <span style={{fontSize:11, opacity:0.6}}>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
            )}
            {!isFetching && (
                <button onClick={this.handleRefreshClick}>Refresh</button>
            )}
          </p>
          {isFetching && posts.length === 0 && <h2>Loading...</h2>}
          {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
          {posts.length > 0 && (
              <div style={{opacity: isFetching ? 0.5 : 1, border:"1px solid #ededed", borderRadius:3}}>
                <Posts posts={posts}/>
              </div>
          )}
        </div>
    )
  }
}

SubredditApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const {selectedSubreddit, postsBySubreddit} = state
  const {isFetching, lastUpdated, items: posts} = postsBySubreddit[
      selectedSubreddit
      ] || {
    isFetching: true,
    items: []
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(SubredditApp)