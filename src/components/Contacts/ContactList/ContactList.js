import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

const ContactList = () => {
    
    const [query,setQuery] = useState('');

    const [state, setState] = useState({
        loading: false,
        contacts: [],
        errorMessage: ''
    })
    
    //const [filteredContacts,setFilteredContacts] = useState([]);

    const getContacts = async () => {
        try {
            setState({ ...state, loading: true })
            //let response = await axios.get('http://localhost:9000/contacts');
            let response = await ContactService.getAllContacts()
            setState({
                ...state,
                loading: false,
                contacts: response.data,
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
        getContacts()
    }, [])

    const handleDelete= (id)=>{
         ContactService.deleteContact(id)
        getContacts()
    }

    const filteredContacts = state.contacts.filter(contact=>{
        return contact.name.toLowerCase().includes(query.toLowerCase())
    })
    console.log(filteredContacts);

    return (
        <React.Fragment>
            <section className='contact-search p-3'>
                <div className='container'>
                    <div className='grid'>
                        <div className='row'>
                            <div className='col'>
                                <p className='h3 fw-bold'>Contact Manager
                                    <Link to={'/contacts/add'} className='btn btn-primary ms-2'>
                                        <i className='fa fa-plus-circle me-2' />New</Link>
                                </p>
                                <p className='fst-italic'>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
                                    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
                                </p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <form className='row'>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <input name='query' value={query} onChange={(e)=>setQuery(e.target.value)} type='text' className='form-control' placeholder='Search Names' />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-2'>
                                            <input type='submit' className='btn btn-outline-dark' value='search' />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                state.loading ? <Spinner></Spinner> : <>
                    <section className='contact-list'>
                        <div className='container'>
                            <div className='row'>
                                {filteredContacts && filteredContacts.map(contact => {
                                    return (
                                        <div className='col-md-6' key={contact.id}>
                                            <div className='card my-2'>
                                                <div className='card-body'>
                                                    <div className='row align-items-center d-flex justify-content-around'>
                                                        <div className='col-md-4'>
                                                            <img src={contact.photo} alt='' className='contact-img' />
                                                        </div>
                                                        <div className='col-md-7'>
                                                            <ul className='list-group'>
                                                                <li className='list-group-item list-group-item-action'>
                                                                    Name : <span className='fw-bold'>{contact.name}</span>
                                                                </li>
                                                                <li className='list-group-item list-group-item-action'>
                                                                    Mobile : <span className='fw-bold'>{contact.mobile}</span>
                                                                </li>
                                                                <li className='list-group-item list-group-item-action'>
                                                                    Email : <span className='fw-bold'>{contact.email}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-md-1 d-flex flex-column align-items-center'>
                                                            <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                                                <i className='fa fa-eye' />
                                                            </Link>
                                                            <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                                                <i className='fa fa-pen' />
                                                            </Link>
                                                            <button className='btn btn-danger my-1' onClick={()=>handleDelete(contact.id)}>
                                                                <i className='fa fa-trash' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </section>
                </>
            }

        </React.Fragment>
    )
}

export default ContactList