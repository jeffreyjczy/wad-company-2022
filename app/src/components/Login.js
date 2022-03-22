import React from 'react'
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";
import { Form, Button, Row } from "react-bootstrap";


export function Login({ email, password, onLogin }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        
        <Form className="box2" onSubmit={handleSubmit(onLogin)} >
            <Form.Group className="mb-3" controlId="formBasicEmail">

                <Row style={{ textAlign: 'center' }}>
                    <h1>VMS Company</h1>
                </Row>

                <Form.Label>
                    Email address
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                    defaultValue={email}
                    {...register("email", { required: true, maxLength: 80 })} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type="password" placeholder="Password"
                    defaultValue='123'
                    {...register("password", { required: true, min: 8 })} />
            </Form.Group>
            <div className="d-grid gap-2">
                <Button type="submit" variant="outline-success">Login</Button>
            </div>
        </Form>
    )
}


Login.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    onLogin: PropTypes.func
};

Login.defaultProps = {
    email: null,
    password: false,
    onLogin: undefined,
};
