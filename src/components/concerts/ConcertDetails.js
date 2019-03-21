import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const ConcertDetails = (props) => {
  const {concert, auth } = props

    if(!auth.uid) return <Redirect to='/signin'/>
    if(concert){
      return(
      <div className="container section concert-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">{concert.artist}</span>
          <p>{concert.date} at {concert.time}</p>
          <p>{concert.venue}</p>
          <br/>
          <p>{ concert.notes }</p>
        </div>
        <div className='card-action grey lighten-4 grey-text'>
          <div>Posted by {concert.authorFirstName} {concert.authorLastName}</div>
          <div>{moment(concert.createdAt.toDate()).calendar()}</div>
        </div>
      </div>
      </div>
      )
  } else {
    return(
      <div className='container center'>
        <p>Loading concert...</p>
      </div>
      )
  }
}


// this is what gives this component props
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  const concerts = state.firestore.data.concerts
  // if there are concerts, get concert by id and send it as props
  const concert = concerts ? concerts[id] : null
  return {
    concert: concert,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection:'concerts'}
    ])
  )(ConcertDetails)
