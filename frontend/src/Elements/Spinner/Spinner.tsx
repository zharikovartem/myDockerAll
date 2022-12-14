import React, { FC } from "react"
import { ScaleLoader } from "react-spinners"
import styled from "styled-components"


export const Spinner: FC = () => {

    return (
        <SpinContainer>
            <ScaleLoader
                color={'rgb(121, 125, 249)'}
                loading={true}
                height={100}
                width={20}
            />
        </SpinContainer>
    )
}

export const SpinContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%'
})