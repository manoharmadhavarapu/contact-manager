import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {

  let { contactId } = useParams();
  let navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    errorMessage: '',
    groups: []
  })

  const getOneContact = async () => {
    try {
      setState({ ...state, loading: true })
      //let response = await axios.get('http://localhost:9000/contacts');
      let response = await ContactService.getSingleContact(contactId);
      let groupResponse = await ContactService.getGroups();
      setState({
        ...state,
        loading: false,
        contact: response.data,
        groups: groupResponse.data
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

  const updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      ContactService.updateContact(state.contact, contactId)
      navigate('/contacts/list')
    } catch (error) {
      navigate('/contacts/edit/' + contactId)
    }
  }


  return (
    <React.Fragment>
      <section className='edit-contact p-3'>
        <div className='container'>

          <div className='row'>
            <div className='col'>
              <p className='h4 text-primary fw-bold'>Edit Contact</p>
              <p className='fst-italic'>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
                dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
              </p>
            </div>
          </div>

          {
            state.loading ? <Spinner></Spinner> : <>
              <div className='row align-items-center'>
                <div className='col-md-4'>
                  <form onSubmit={handleSubmit}>
                    <div className='mb-2'>
                      <input
                        name='name'
                        value={state.contact.name}
                        onChange={updateInput}
                        required={true}
                        type='text' className='form-control' placeholder='Name'
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='photo'
                        value={state.contact.photo}
                        onChange={updateInput}
                        required={true}
                        type='text' className='form-control' placeholder='Photo Url'
                      />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='mobile'
                        value={state.contact.mobile}
                        onChange={updateInput}
                        required={true}
                        type='number' className='form-control' placeholder='Mobile' />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='email'
                        value={state.contact.email}
                        onChange={updateInput}
                        required={true}
                        type='email' className='form-control' placeholder='Email' />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='company'
                        value={state.contact.company}
                        onChange={updateInput}
                        required={true}
                        type='text' className='form-control' placeholder='Company' />
                    </div>
                    <div className='mb-2'>
                      <input
                        name='title'
                        value={state.contact.title}
                        onChange={updateInput}
                        required={true}
                        type='text' className='form-control' placeholder='Title' />
                    </div>
                    <div className='mb-2'>
                      <select
                        name='groupId'
                        value={state.contact.groupId}
                        onChange={updateInput}
                        required={true}
                        className='form-control'>
                        <option value=''>Select a Group</option>
                        {
                          state.groups.length > 0 && state.groups.map(group => {
                            return (
                              <option key={group.id} value={group.id}>{group.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-center'>
                      <input type='submit' className='btn btn-success' value='Update' />
                      <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Go Back</Link>
                    </div>
                  </form>
                </div>

                <div className='col-md-6'>
                  <img src={state.contact.photo} alt='' className='contact-img' />
                </div>

              </div>
            </>
          }

        </div>
      </section>
    </React.Fragment>
  )
}

export default EditContact