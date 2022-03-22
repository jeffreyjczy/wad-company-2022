import { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocalStorage } from "react-use";
import Quotation from "./components/Quotation";
import ProductManagement from "./components/ProductManagement"
import QuotationManagement from "./components/QuotationManagement"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";

const API_URL = process.env.REACT_APP_API_URL

function App() {
  const [user, setUser] = useState();

  const handleLogin = (data) => {
    console.log('handleLogin', data)
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          window.alert("Error: " + data.error)
        } else {
          window.alert("Welcome " + data.name)
          console.log(data);
          setUser(data);
        }
      })
  }

  return (
    <div style={{ height: '100%', minHeight: '100vh', backgroundColor: 'rgb(200, 250, 235)'}}>
      <Router>
        <Navbar variant="dark" style ={{backgroundColor: 'rgb(124, 194, 173)', height: '65px', fontSize: '20px'}} >
          <Container>
            <Navbar.Brand style = {{fontSize: '24px'}} href="/">VMS COMPANY</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/react-quotation/quotation-management">Quotation</Nav.Link>
              <Nav.Link href="/react-quotation/product-management">Product</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/react-quotation/product-management"
            element={<ProductManagement />}
          />
          <Route
            path="/react-quotation/quotation"
            element={<Quotation />}
          />
          <Route
            path="/react-quotation/quotation-management"
            element={<QuotationManagement />}
          />
          <Route path="/"
            element={
              <Container>
                {user ? (
                  <div> Hello {user.name} </div>
                ) : (
                  <Login onLogin={handleLogin} />
                )}

              </Container>}
          />
        </Routes>
      </Router>

    </div>

  );
}

export default App;
