import React, { useEffect, useState, useRef } from 'react';
import { Container, Button, Table, Modal, Row, Col, Form } from "react-bootstrap";
import "../App.css";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";


function ProductManagement() {
    const API_URI = process.env.REACT_APP_API_URL;

    const [products, setProducts] = useState([]);
    const [productRows, setProductRows] = useState([]);
    const [show, setShow] = useState(false);
    const [modeAdd, setModeAdd] = useState(false);
    const [product, setProduct] = useState({
        code: '',
        name: '',
        price: 0
    })

    //Input Ref
    const refCode = useRef();
    const refName = useRef();
    const refPrice = useRef();

    useEffect(() => {
        console.log(API_URI)
        fetch(`${API_URI}/products`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);

                const rows = data.map((e, i) => {
                    return (
                        <tr key={i}>
                            <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FaPencilAlt onClick={() => handleUpdate(e)} />
                                    <FaTrashAlt onClick={() => handleDelete(e)} />
                                </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>{e.code}</td>
                            <td style={{}}>{e.name}</td>
                            <td>
                                <div style={{ textAlign: 'right', marginRight: '30%' }}>
                                    $ {formatNumber(e.price)}
                                </div>


                            </td>
                        </tr>
                    )
                })

                setProductRows(rows);
            })
    }, [])



    const handleClose = () => {
        setModeAdd(false);
        setShow(false);
        refCode.current = "";
        refName.current = "";
        refPrice.current = 0;
    };

    const handleShow = () => setShow(true);

    const handleShowAdd = () => {
        setModeAdd(true);
        setShow(true);
    }

    const handleUpdate = (product) => {
        console.log(product)
        setShow(true)
        setProduct(product)
    }

    const formatNumber = (x) => {
        x = Number.parseFloat(x)
        return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    async function handleDelete(product) {
        console.log(product)
        if (window.confirm(`Are you sure to delete ${product.name}`)) {
            await fetch(`${API_URI}/products/${product._id}`, {
                method: "DELETE",
                mode: "cors",
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log("Delete Result", json);
                    handleClose();
                });
            window.location.reload(false);

        }

    }

    async function handleFormAction() {
        if (modeAdd) {

            if (refCode.current.value === "" || refName.current.value === "") {
                alert("Please complete the form.")
            }
            else {
                const newProduct = {
                    code: refCode.current.value,
                    name: refName.current.value,
                    price: refPrice.current.value,
                }
                console.log(newProduct);

                handleClose()
                await fetch(`${API_URI}/products`, {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(newProduct),
                })
                    .then(res => res.json())
                    .then(json => {
                        console.log("POST Result", json)
                        products.push(json)
                        const rows = products.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <FaPencilAlt onClick={() => handleUpdate(e)} />
                                            <FaTrashAlt onClick={() => handleDelete(e)} />
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>{e.code}</td>
                                    <td style={{}}>{e.name}</td>
                                    <td>
                                        <div style={{ textAlign: 'right', marginRight: '30%' }}>
                                            $ {formatNumber(e.price)}
                                        </div>


                                    </td>
                                </tr>
                            )
                        })
                        setProducts(products);
                        setProductRows(rows);
                    })
            }



        }

        else {
            //update
            const updatedProduct = {
                _id: product._id,
                code: refCode.current.value,
                name: refName.current.value,
                price: refPrice.current.value,
            };

            console.log(updatedProduct)

            await fetch(`${API_URI}/products`, {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(updatedProduct),
            })
                .then(res => res.json())
                .then(json => {
                    console.log("POST Result", json)

                })
            window.location.reload(false);
        }
    }


    return (
        <>
            <Container className='box'>
                <div className='header'>
                    <h1> Product Management </h1>

                    <Button className='btn-add' variant="outline-success" onClick={handleShowAdd}>
                        <FaPlus /> ADD
                    </Button>
                </div>

                <div style={{ width: '95%', margin: 'auto' }}>
                    <Table striped bordered hover className="table">
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }}></th>
                                <th style={{ textAlign: 'center', width: "15%" }}>Code</th>
                                <th style={{ textAlign: 'center' }}>Name</th>
                                <th style={{ textAlign: 'center', width: "18%" }}>Price/Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productRows}
                        </tbody>

                    </Table>
                </div>


            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton style={{ backgroundColor: 'rgb(200, 250, 235)' }}>
                    <Modal.Title>{modeAdd ? "Add New Product" : "Update Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: 'rgb(233, 248, 244)' }}>
                    <Form className="form-row" >
                        <Row>
                            <Form.Group>
                                <Col>Code</Col>
                                <Col><Form.Control type="text" ref={refCode} defaultValue={product.code} /></Col>

                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Col>Name</Col>
                                <Col><Form.Control type="text" ref={refName} defaultValue={product.name} /></Col>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Col>Price</Col>
                                <Col><Form.Control type="number" ref={refPrice} defaultValue={product.price} /></Col>

                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'rgb(233, 248, 244)' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleFormAction}>{modeAdd ? "ADD" : "Update"}</Button>
                </Modal.Footer>
            </Modal>
        </>




    );
}
export default ProductManagement;