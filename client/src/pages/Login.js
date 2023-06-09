import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { Alert } from 'antd';
//import {AuthContext} from '../utils/context'

//AntD imports
import { Button, Checkbox, Form, Input } from 'antd';

function Login(props) {
  const [form] = Form.useForm();
  //const context = useContext(AuthContext);
  const [login, { error }] = useMutation(LOGIN);

  //For alert
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (event) => {
    //event.preventDefault(); -- this was throwing a "not a function error", no errors thrown upon removal, functionality still works
    try {
      const mutationResponse = await login({
        variables: { email: form.getFieldValue().email, password: form.getFieldValue().password },
      });
      const token = mutationResponse.data.login.token;
      //context.login(mutationResponse.data.login);
      Auth.login(token);
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        setShowAlert(true)
      }, 500);
    }
  };

  const setStatetoFalse = () => {
    setShowAlert(false);
  }

  return (
    <div>
      <div>
        {showAlert &&
          <Alert type='error'
            message='Error'
            description='Incorrect Credentials, Please Try Again!'
            closable
            onClose={setStatetoFalse}
            style={{ margin: '10px' }}
          />}
      </div>
      <Form
        className="logForm"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          marginLeft: 50,
          marginTop: 50,
          marginBottom: 100,
          backgroundColor: '#f7f6cf',
          padding: 50,
          borderRadius: 10,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleFormSubmit}
        autoComplete="off"
        form={form}
      >
        <h1 style={{ marginBottom: 20, }}>Log In!</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    // <div className="container my-1">
    //   <Link to="/signup">← Go to Signup</Link>

    //   <h2>Login</h2>
    //   <form onSubmit={handleFormSubmit}>
    //     <div className="flex-row space-between my-2">
    //       <label htmlFor="email">Email address:</label>
    //       <input
    //         placeholder="youremail@test.com"
    //         name="email"
    //         type="email"
    //         id="email"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="flex-row space-between my-2">
    //       <label htmlFor="pwd">Password:</label>
    //       <input
    //         placeholder="******"
    //         name="password"
    //         type="password"
    //         id="pwd"
    //         onChange={handleChange}
    //       />
    //     </div>
    //     {error ? (
    //       <div>
    //         <p className="error-text">The provided credentials are incorrect</p>
    //       </div>
    //     ) : null}
    //     <div className="flex-row flex-end">
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
  );
}

export default Login;
