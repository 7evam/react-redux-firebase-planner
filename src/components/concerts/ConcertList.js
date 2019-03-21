import React from 'react'
import ConcertSummary from './ConcertSummary'
import { Link } from 'react-router-dom'

const ConcertList = ({ concerts }) => {
  return (
    <div className="concert-list section">
      {concerts && concerts.map(concert => {
        return (
          <Link to={'/concert/' + concert.id}>
          <ConcertSummary concert={concert} key={concert.id} />
          </Link>
          )
      })}
    </div>
  )
}

export default ConcertList
