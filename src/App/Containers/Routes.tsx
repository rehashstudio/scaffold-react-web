import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => null

const Home = Loadable({
  loader: () => import('../Components/Intro'),
  loading: Loading,
  delay: 300,
})

class AppRoot extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
      </div>
    )
  }
}

export default AppRoot
