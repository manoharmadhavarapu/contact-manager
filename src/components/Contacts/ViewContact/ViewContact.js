import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {
  let { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: '',
    group:{}
  })

  const getOneContact = async () => {
    try {
      setState({ ...state, loading: true })
      //let response = await axios.get('http://localhost:9000/contacts');
      let response = await ContactService.getSingleContact(contactId);
      let groupResponse = await ContactService.getSingleGroup(response.data);
      setState({
        ...state,
        loading: false,
        contact: response.data,
        group:groupResponse.data
      })

    }
    catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message
      })
    }
  }

  useEffect(() => {
    getOneContact()
  }, [contactId])
  
  return (
    <React.Fragment>
      <section className='view-contact-intro p-3'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <p className='h3 text-info fw-bold'>Contact Details</p>
            </div>
          </div>
        </div>
      </section>

      {state.loading ? <Spinner></Spinner> : <React.Fragment>
        {
          Object.keys(state.contact).length > 0 && Object.keys(state.group).length > 0 && <section className='view-contact'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col-md-4'>
                  <img src={state.contact.photo} alt='' className='contact-img' />
                </div>
                <div className='col-md-8'>
                  <ul className='list-group'>
                    <li className='list-group-item list-group-item-action'>
                      Name : <span className='fw-bold'>{state.contact.name}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Mobile : <span className='fw-bold'>{state.contact.mobile}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Email : <span className='fw-bold'>{state.contact.email}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Company : <span className='fw-bold'>{state.contact.company}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Title : <span className='fw-bold'>{state.contact.title}</span>
                    </li>
                    <li className='list-group-item list-group-item-action'>
                      Group : <span className='fw-bold'>{state.group.name}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <Link to={'/contacts/list'} className='btn btn-warning'>Go Back</Link>
                </div>
              </div>
            </div>
          </section>
        }
      </React.Fragment>}


    </React.Fragment>
  )
}

export default ViewContact