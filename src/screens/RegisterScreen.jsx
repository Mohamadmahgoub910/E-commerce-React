import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}
function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    let navigate = useNavigate();
    // const redirect = search.search ? search.split('=')[1] : '/'
    const { redirect = "/" } = useQuery();
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password Do not match!')
        } else {

            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1> SIGN UP!  </h1>
            {message && <Message variant='danger' > {message} </Message>}
            {error && <Message variant='danger'> {error} </Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='name' >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
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
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm' >
                    <Form.Label> confirm Password </Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br />
                <Button
                    type='submit'
                    variant='primary'
                >
                    REGISTER
                </Button>
            </Form>
            <Row>
                <Col>
                    Have an account ?
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                        Sign In</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
