import { Button } from 'antd'
import React from 'react'

type ParserRowActionsPropsType = {
    
}

const ParserRowActions:React.FC<ParserRowActionsPropsType> = (props) => {

    return (
        <>
            <Button style={{marginRight: 5}} size='small' type='primary'>Settings</Button>
            <Button style={{marginRight: 5}} size='small' type='primary'>Start</Button>
            <Button style={{marginRight: 5}} size='small' type='primary' danger>Delete</Button>
        </>
    )
}

export default  ParserRowActions