import React, { Component } from 'react'
import loading from './loading.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img height="150px" width="150px" src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
