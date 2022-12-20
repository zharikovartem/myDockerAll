import { Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { redirect, useNavigate } from 'react-router-dom'

type HeaderPropsType = {

}

const Header: React.FC<HeaderPropsType> = (props) => {
    const [current, setCurrent] = useState('mail')

    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e)
        setCurrent(e.key)
        navigate(`/${e.key}`)
    }

    return <Menu    onClick={onClick} 
                    selectedKeys={[current]} 
                    mode="horizontal" 
                    items={items} />
}

export default Header

const items: MenuProps['items'] = [
    {
        label: 'Main',
        key: '',
        icon: <MailOutlined />,
    },
    {
        label: 'Parsers',
        key: 'parsers',
        icon: <AppstoreOutlined />
    },
    {
        label: 'To Do',
        key: 'to_do',
        icon: <AppstoreOutlined />
    },
    {
        label: 'Any',
        key: 'SubMenu',
        icon: <SettingOutlined />,
        children: [
            {
                type: 'group',
                label: 'Products',
                children: [
                    {
                        label: 'Product groups',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        label: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
        key: 'alipay',
    },
]