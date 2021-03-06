import React from 'react';
import { Login } from '../components/Login'
import 'bootstrap/dist/css/bootstrap.css';
// import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Form/Login',
    component: Login,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    //   argTypes: {
    //     backgroundColor: { control: 'color' },
    //   },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    email: 'hello@gmail.com',
    password: '123',
    onLogin: (data) => {
        console.log("1",data)
    }
};

export const MissingPassword = Template.bind({});
MissingPassword.args = {
    email: 'hello@gmail.com',
    password: ''
}

export const LoginFailed = Template.bind({});
LoginFailed.args = {
    email: 'hello@gmail.com',
    password: '123',
    onLogin: (data) => {
        console.log("Simulate Login Failed")
        alert("Login Failed")
    }
}

