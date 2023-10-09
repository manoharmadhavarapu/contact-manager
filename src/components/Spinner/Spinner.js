import React from 'react'
import spinnerImage from '../../assets/images/loading-white.gif';

const Spinner = () => {
  return (
    <React.Fragment>
        <div>
            <img src={spinnerImage} alt='' className='d-block m-auto' style={{width:'200px'}}/>
        </div>
    </React.Fragment>
  )
}

export default Spinner