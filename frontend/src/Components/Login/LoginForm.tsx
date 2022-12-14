import { Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
import { LoginDataType } from '../../Api/authApi'
import { login } from '../../Redux/authReducer'
import { useAppDispatch } from '../../Redux/store'

type LoginFormPropsType = {

}

const LoginForm: React.FC<LoginFormPropsType> = (props) => {

    const dispatch = useAppDispatch()

    const [loginData, setLoginData] = useState<LoginDataType>({
        email: 'admin@admin.com',
        username: 'admin@admin.com',
        password: '12345678'
    })

    const onFinish = (values: any) => {
        console.log('Success:', values)
        dispatch(login({
            username: values.username,
            password: values.password
        }))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ 
                remember: true,
                username: 'admin@admin.com',
                password: '12345678'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm