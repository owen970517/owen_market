import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({ title } : { title? : string }) => {
  return (
    <Helmet>
        <title>{title ? `${title} | 중고사이트` : '중고사이트'} </title>
    </Helmet>
  )
}

export default Title