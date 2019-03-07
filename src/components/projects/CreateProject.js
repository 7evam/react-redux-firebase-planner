import React, { Component } from 'react';
import { createProject } from '../../store/actions/projectActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
  state={
    title:'',
    content:'',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state)
    this.setState({
      title:'',
      content:'',
    })
  }

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin'>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create New Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Project Content</label>
            <textarea className='materialize-textarea' id="content" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  //every property you want to add to the props gets added to this object
  return {
    //props.createProject will call this function
    createProject: (project) => dispatch(createProject(project))
  }
}
// first paramter of connect function is map state to props
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
