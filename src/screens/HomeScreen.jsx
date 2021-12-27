import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader'
import Message from '../components/Message';


import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import { useLocation } from 'react-router-dom';
import Paginate from '../components/Paginate';


function HomeScreen() {
    let keyword1 = useLocation()
    let keyword = keyword1.search
    // console.log(word)
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])
    return (
        <div>
            <h1>Latest Products </h1>
            {loading ? <Loader />
                : error ? <Message variant='danger' > {error} </Message>
                    :
                    <div>
                        <Row>
                            {/* Map this dummy data will be API  */}
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    {/* Send Object of product as a props */}
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

export default HomeScreen

