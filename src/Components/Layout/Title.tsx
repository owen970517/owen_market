import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Title = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>중고사이트</title>
      </Helmet>
    </HelmetProvider>
  )
}

export default Title