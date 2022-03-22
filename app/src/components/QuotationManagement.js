import React, { useEffect, useState, useRef } from 'react';
import { Container, Button, Table, Modal, Row, Col, Form } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import "../App.css";



function QuotationManagement() {
    const API_URI = process.env.REACT_APP_API_URL;

    const [products, setProducts] = useState([]);
    const [productRows, setProductRows] = useState([]);
    const [total, setTotal] = useState(0);



    useEffect(() => {
        console.log(API_URI)
        fetch(`${API_URI}/quotations`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                let sum = 0;
                const rows = data.reverse().map((e, i) => {
                    sum += e.price * e.quantity
                    return (
                        <tr key={i}>
                            <td style={{ textAlign: 'center' }}>
                                <FaTrashAlt onClick={() => handleDelete(e)} />
                            </td>
                            <td style={{ textAlign: 'center' }}>{e.quantity}</td>
                            <td>{e.product}</td>
                            <td >
                                <div style={{ textAlign: 'right', marginRight: '29%' }}>
                                    $ {formatNumber(e.price)}
                                </div>
                            </td>

                            <td >
                                <div style={{ textAlign: 'right', marginRight: '29%' }}>
                                    $ {formatNumber(e.price * e.quantity)}
                                </div>
                            </td>
                        </tr>
                    )
                })
                setProductRows(rows);
                setTotal(sum);
            })
    }, [])

    async function handleDelete(product) {
        console.log(product)
        if (window.confirm(`Are you sure to delete ${product.product}`)) {
            await fetch(`${API_URI}/quotations/${product._id}`, {
                method: "DELETE",
                mode: "cors",
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log("Delete Result", json);
                });

            window.location.reload(false);
        }

    }

    const handleFormAction = () => {

    }

    const formatNumber = (x) => {
        x = Number.parseFloat(x)
        return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (

        <div className="page">

            <Container className="box">
                <div className="header">

                    <h1> Quotation Management </h1>
                    <Button className="btn-add" variant="outline-success" href="/react-quotation/quotation" >
                        <FaPlus /> ADD
                    </Button>

                </div>





                <div style={{ width: '95%', margin: 'auto' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: "5%" }}>&nbsp;</th>
                                <th style={{ textAlign: 'center', width: "10%" }}>Quantity</th>
                                <th style={{ textAlign: 'center', width: "50%" }}>Item</th>
                                <th style={{ textAlign: 'center' }}>Price/Unit</th>
                                <th style={{ textAlign: 'center' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                    Total
                                </td>
                                <td >
                                    <div style={{ textAlign: 'right', marginRight: '29%' }}>
                                        $ {formatNumber(total)}
                                    </div>
                                    
                                </td>
                            </tr>
                        </tfoot>

                    </Table>
                </div>

            </Container>




        </div>
    );
}
export default QuotationManagement;