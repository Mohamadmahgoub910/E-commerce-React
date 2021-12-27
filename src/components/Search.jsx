import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBox() {

    let navigate = useNavigate()


    const [keyWord, setKeyWord] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyWord) {
            navigate(`/?keyword=${keyWord}&page=1`)
        } else {
            navigate('/')
        }
    }


    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                name='q'
                onChange={(e) => setKeyWord(e.target.value)}
                // className='mr-sm-1 ml-sm-3'
                type="search"
                placeholder="Search"
                className="me-2 text-center"
                aria-label="Search"

            ></Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className='p-1'
            >
                Submit
            </Button>

        </Form>
    )
}

export default SearchBox
