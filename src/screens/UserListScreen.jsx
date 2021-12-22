import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams, useNavigationType } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { listUsers, deleteUser } from '../actions/userActions';


function UserListScreen() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {

            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, successDelete, userInfo])
    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <div>
            <h1>USERS</h1>
            {loading ? (<Loader />)
                : error ? (<Message variant='danger'> {error} </Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} >
                                        <td> {user._id} </td>
                                        <td> {user.name} </td>
                                        <td> {user.email} </td>
                                        <td> {user.isAdmin ? (
                                            <i class="fas fa-check" style={{ color: 'green' }} aria-hidden="true"></i>
                                        ) : (
                                            <i class="fas fa-times" style={{ color: 'red' }} aria-hidden="true"></i>
                                        )} </td>
                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}`} >
                                                <Button variant='light' className='btn-sm' >
                                                    <i class="fas fa-edit" aria-hidden="true"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm'
                                                onClick={() => deleteHandler(user._id)}
                                            >
                                                <i class="fas fa-trash" aria-hidden="true"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen
