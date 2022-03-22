import { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocalStorage } from "react-use";
import QuotationTable from "./QuotationTable";


function Quotation() {

    const API_URI = process.env.REACT_APP_API_URL;

    const itemRef = useRef();
    const priceRef = useRef();
    const qtyRef = useRef();

    const [localDataItems, setLocalDataItems, remove] = useLocalStorage(
        "data-items",
        JSON.stringify([])
    );

    const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));

    const [products, setProducts] = useState([]);
    const [productOptions, setProductOptions] = useState([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch(`${API_URI}/products`)
            .then((res) => res.json())
            .then((data) => {
                data = data.filter(e => 'code' in e)

                console.log(data);
                const z = data.map((v) => (
                    <option key={v._id} value={v._id}>
                        {v.name}
                    </option>
                ));
                setProducts(data);
                setProductOptions(z);
            });
    }, []);

    const deleteProduct = () => {
        let item = products.find((v) => itemRef.current.value === v._id);

        if (window.confirm(`Are you sure to delete ${item.name}`)) {
            fetch(`${API_URI}/products/${item._id}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    _id: item._id
                })
            })
                .then(res => res.json)
                .then(data => {
                    console.log('Delete ', data)
                })
                .catch(err => {
                    console.error(err)
                })
        }


    }

    const addItem = () => {
        let item = products.find((v) => itemRef.current.value === v._id);

        if (priceRef.current.value == null || priceRef.current.value <= 0 || qtyRef.current.value == null || qtyRef.current.value <= 0) {
            alert("Please insert a proper price or quantity")
        }
        else {
            var found = false;
            dataItems.forEach(items => {
                if (items._id == item._id && items.price == priceRef.current.value) {
                    items.quantity = parseInt(items.quantity) + parseInt(qtyRef.current.value);
                    found = true;
                }
            })

            if (!found) {

                var itemObj = {
                    _id: item._id,
                    code: item.code,
                    product: item.name,
                    price: priceRef.current.value,
                    quantity: qtyRef.current.value,
                };
                dataItems.push(itemObj);
            }
            setDataItems([...dataItems]);
            setLocalDataItems(JSON.stringify(dataItems));
            console.log("after", dataItems);
        }
    };



    const updateDataItems = (dataItems) => {
        setDataItems([...dataItems]);
        setLocalDataItems(JSON.stringify(dataItems));
    }

    const clearDataItems = () => {
        setDataItems([]);
        setLocalDataItems(JSON.stringify([]));
    };

    const productChange = () => {
        console.log("productChange", itemRef.current.value);
        let item = products.find((v) => itemRef.current.value === v._id);
        console.log("productChange", item);
        priceRef.current.value = item.price;
        console.log(priceRef.current.value);
    };




    return (
        <Container style={{ marginTop: '3%' }}>
            <Row style={{ width: '80vw' }}>
                <Col md={4} className="box1">
                    <div style={{ textAlign: 'center' }}>
                        <h1>Add Quotation</h1>
                    </div>


                    <Row>
                        <Col>
                            Item
                            <Form.Select ref={itemRef} onChange={productChange}>
                                {productOptions}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Price Per Unit</Form.Label>
                            <Form.Control
                                type="number"
                                ref={priceRef}
                                value={price}
                                onChange={(e) => setPrice(priceRef.current.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" ref={qtyRef} defaultValue={1} />
                        </Col>
                    </Row>
                    <hr />
                    <div className="d-grid gap-2">
                        <Button variant="success" onClick={addItem}>
                            Add
                        </Button>
                        <Button variant="danger" onClick={deleteProduct}>
                            Delete
                        </Button>
                    </div>
                </Col>
                <Col md={7}>
                    <QuotationTable
                        data={dataItems}
                        clearDataItems={clearDataItems}
                        updateDataItems={updateDataItems}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Quotation;