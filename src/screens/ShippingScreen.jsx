import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen() {
    let navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address,
            city,
            postalCode,
            country
        }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps />
            <h3>Shipping Cart</h3>
            <Form
                onSubmit={submitHandler}
            >
                <Form.Group controlId='address' >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='City' >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='PostalCode' >
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='Enter postalCode'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='Country' >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br />
                <Button
                    type='submit'
                    variant='primary'
                    className='btn btn-success'
                >
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
