import React from 'react'

const ErrorMessage = ({error}:any) => {
    if (!error) {
        return null;
      }
    
    return <p style={{color: 'red'}}>{error.message}</p>;
}

export default ErrorMessage