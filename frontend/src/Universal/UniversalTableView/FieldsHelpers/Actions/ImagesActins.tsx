import React from 'react'
import styled from 'styled-components'
import { url } from '../../../../Api/Api'

type ImagesActionsPropsType = {
    data: any
}

const ImagesActions:React.FC<ImagesActionsPropsType> = (props) => {

    console.log('ImagesActions', props)

    return (
        <ImagesActionsContainer>
            <img src={url+props.data.logoFileName}></img>
        </ImagesActionsContainer>
    )
}

export default  ImagesActions

const ImagesActionsContainer = styled.div({
    height: 40,
    width: 40
})