import React from 'react'
import moment from 'moment'

const ConcertSummary = ({ concert }) => {
  return (
    <div className="card z-depth-0 concert-summary hover">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{ concert.artist } on {concert.date}</span>
        <p>Posted by {concert.authorFirstName} {concert.authorLastName}</p>
        <p className="grey-text">{moment(concert.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default ConcertSummary
