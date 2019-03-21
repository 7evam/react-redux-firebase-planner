import React, { Component } from 'react';
import { createConcert } from '../../store/actions/concertActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class CreateConcert extends Component {
  state={
    artist:'',
    date:'',
    notes:'',
    time:'',
    venue:''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createConcert(this.state)
    this.props.history.push('/');

  }

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to='/signin'/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Add New Concert</h5>
          <div className="input-field">
            <label htmlFor="artist">Artist</label>
            <input type="text" id="artist" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="date">Date</label>
            <input type="text" id="date" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="time">Time</label>
            <input type="text" id="time" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="time">Venue</label>
            <input type="text" id="venue" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="notes">Notes</label>
            <textarea className='materialize-textarea' id="notes" onChange={this.handleChange} />
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
    //props.createConcert will call this function
    createConcert: (concert) => dispatch(createConcert(concert))
  }
}
// first paramter of connect function is map state to props
export default connect(mapStateToProps, mapDispatchToProps)(CreateConcert)
