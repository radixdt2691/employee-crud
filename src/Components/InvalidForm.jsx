import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'

export default class InvalidForm extends Component {
  render() {
    return (
      <div className='container mx-auto'>
        <div className='d-flex align-items-center py-5 justify-content-center'>
            <h1 className='h1 text-danger text-center'>You entered invalid details in the form!!</h1>
        </div>
        <ToastContainer/>
      </div>
    )
  }
}
