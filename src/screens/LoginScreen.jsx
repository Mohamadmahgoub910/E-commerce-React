import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { useNavigate, useLocation, Link } from 'react-router-dom'



const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    // const redirect = search.search ? search.split('=')[1] : '/'
    const { redirect = "/" } = useQuery();
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Sign In </h1>
            {error && <Message variant='danger'> {error} </Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' >
                    <Form.Label> Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br />
                <Button
                    type='submit'
                    variant='btn btn-success'
                >
                    SIGN IN
                </Button>
            </Form>
            <Row>
                <Col>
                    New Customer ?
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Register</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
