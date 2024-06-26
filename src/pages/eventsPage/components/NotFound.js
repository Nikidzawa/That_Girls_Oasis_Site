import styled from "styled-components";
import NOTFOUND_IMAGE from "../../../img/notFound2.png"
import React from 'react';

const Background = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 40vh;
    left: 0;
`

const Text = styled.div`
    font-size: 22px;
`

export default function NotFound () {
    return (
        <Background>
            <img alt={"не найдено"} width={"150px"} src={NOTFOUND_IMAGE}/>
            <Text>К сожалению, ничего не нашли</Text>
        </Background>
    )
}