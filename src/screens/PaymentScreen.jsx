import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';



function PaymentScreen() {
    let navigate = useNavigate();
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress.address) {
        navigate('/shipping')
    }


    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 step4 />
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'> Select Method </Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button
                    type='primary'
                    variant='primary'
                    className='btn btn-success'
                >
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
