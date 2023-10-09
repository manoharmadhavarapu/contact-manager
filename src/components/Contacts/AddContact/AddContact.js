import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner';

const AddContact = () => {

  const navigate = useNavigate();

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
    groups: [],
    errorMessage: ''
  })

  const getGroupIds = async () => {
    try {
      setState({ ...state, loading: true })
      //let response = await axios.get('http://localhost:9000/contacts');
      let response = await ContactService.getGroups()
      setState({
        ...state,
        loading: false,
        groups: response.data,
      })
      //console.log(response.data);

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
    getGroupIds()
  }, [])

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
    //console.log(state.contact);
    try {
      ContactService.createContact(state.contact)
      //  .then(res=>{
      //   if(res.status === 200){
      //     console.log(res.status);
      //     navigate('/contacts/list')
      //   }
      // })
      navigate('/contacts/list')
    } catch (error) {
      navigate('/contacts/add')
    }

  }

  return (
    <React.Fragment>

      <section className='add-contact p-3'>
        <div className='container'>

          <div className='row'>
            <div className='col'>
              <p className='h4 text-success fw-bold'>Create Contact</p>
              <p className='fst-italic'>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
                dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
              </p>
            </div>
          </div>

          {
            state.loading ? <Spinner></Spinner> : <>
              <div className='row justify-content-center'>
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
                              <option value={group.id}>{group.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className='mb-2 d-flex justify-content-center'>
                      <input type='submit' className='btn btn-success' value='Create' />
                      <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Go Back</Link>
                    </div>
                  </form>
                </div>
              </div>
            </>
          }

        </div>
      </section>
    </React.Fragment>
  )
}

export default AddContact