import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import "../App.css";
import { FaTrashAlt } from "react-icons/fa";

function QuotationTable({ data, clearDataItems, updateDataItems }) {
  const API_URI = process.env.REACT_APP_API_URL;

  const [dataRows, setDataRows] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = 0;
    const z = data.map((v, i) => {
      let amount = v.quantity * v.price;
      sum += amount;
      return (
        <tr key={i}>
          <td style={{ textAlign: 'center' }}>
            <FaTrashAlt onClick={() => deleteItem(v._id, v.price)} />
          </td>
          <td style={{ textAlign: 'center' }}>{v.quantity}</td>
          <td>{v.product}</td>
          <td style={{ textAlign: 'right' }}>$ {formatNumber(v.price)}</td>
          <td style={{ textAlign: 'right' }}>$ {formatNumber(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    setTotal(sum);
  }, [data]);

  const deleteItem = (id, price) => {
    console.log(id, price)
    var z = data.filter((value, index, arr) => value._id != id || value.price != price);
    updateDataItems(z);
  };

  const clearTable = () => {
    clearDataItems();
    setDataRows([]);
  };

  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const saveTable = () => {
    data.forEach(items => {
      const newProduct = {
        product: items.product,
        price: items.price,
        quantity: items.quantity,
      }

      fetch(`${API_URI}/quotations`, {
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
        })
    })
    clearTable();
    alert("successfully save quotations.")

  };

  return (
    <div>
      <div className="header" style={{}}>
        <Button className="btn-add" onClick={clearTable} variant="outline-danger">
          <FaTrashAlt /> Clear All
        </Button>
        
      </div>

      <Table striped bordered hover style={{ backgroundColor: 'white' }}>
        <thead>
          <tr>
            <th style={{ width: "20px" }}>&nbsp;</th>
            <th style={{ textAlign: 'center' }}>Qty</th>
            <th style={{ textAlign: 'center' }}>Item</th>
            <th style={{ textAlign: 'center' }}>Price/Unit</th>
            <th style={{ textAlign: 'center' }}>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>
              Total
            </td>
            <td style={{ textAlign: 'right' }}>
              $ {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
      </Table>
      <Button onClick={saveTable} variant="outline-success" style={{width: '100%'}}>
          Save
        </Button>
    </div>
  );
}

export default QuotationTable;
