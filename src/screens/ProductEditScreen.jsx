import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormContainer from '../components/FormContainer';
import { ListProductsDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from './../constants/productConstants';
import axios from 'axios';

function ProductEditScreen() {

    let navigate = useNavigate()


    let params = useParams();
    const productId = params.id;

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate



    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(ListProductsDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [dispatch, product, productId, successUpdate, navigate])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }
    const uploadFileHandler = async (e) => {
        // console.log('File is uploading')
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }

    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1> Edit Product  </h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'> {errorUpdate} </Message>}

                {loading ? <Loader /> :
                    error ? <Message variant='danger'> {error} </Message>
                        : (
                            <Form onSubmit={submitHandler} >
                                <Form.Group controlId='name' >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price' >
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Price]'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control

                                        type='text'
                                        placeholder='Enter image'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    >
                                    </Form.Control>
                                    <Form.Group controlId="image-file" className="mb-3" onChange={uploadFileHandler} >
                                        <Form.Label>Choose File</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group controlId='brand' >
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter name'
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='countinstock' >
                                    <Form.Label>countInStock</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Stock'
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='category' >
                                    <Form.Label>Category </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description' >
                                    <Form.Label>Description </Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>


                                <br />
                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='btn btn-info'
                                >
                                    UPDATE
                                </Button>
                            </Form>
                        )}

            </FormContainer>
        </div>
    )
}

export default ProductEditScreen