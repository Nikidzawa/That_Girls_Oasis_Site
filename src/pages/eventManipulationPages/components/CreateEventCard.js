import styled from "styled-components";
import React from "react";
import IMAGE from "../../../img/calendar.png"
import STAR from "../../../img/star.png"
import HEART from "../../../img/heart.png"
import NULL_PHOTO from "../../../img/camera.png"
import DateFormatter from "../../../commonComponents/DateFormatter";

const Card = styled.div`
    height: 450px;
    width: 320px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    background-color: #333;
    margin-top: 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    border-radius: 20px;

    @media screen and (max-width: 360px) {
        height: 400px;
        width: 250px;
    }

    @media screen and (min-width: 768px) {
        height: 500px;
        width: 350px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 50%;
    border-radius: 20px 20px 0 0;
    object-fit: cover;
`;

const Content = styled.div`
    padding: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const Name = styled.div`
    font-size: 1.375rem;
    font-weight: bold;
    padding: 10px 0 2px 0;

    @media screen and (max-width: 360px) {
        font-size: 1.125rem;
        padding: 5px 0 5px 0;
    }
`;

const Location = styled.div`
    font-size: 0.9375rem;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 360px) {
        font-size: 0.8125rem;
    }
`;

const MainContainer = styled.div`
    height: 83%;
    overflow: hidden;
`;

const Description = styled.div`
    font-size: 0.875rem;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    @media screen and (max-width: 360px) {
        height: 70px;
        font-size: 0.8125rem;
    }
`;

const Date = styled.div`
    font-size: 0.9375rem;
    white-space: nowrap;

    @media screen and (max-width: 360px) {
        font-size: 0.8125rem;
    }
`;

const StarAndCostContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Cost = styled.div`
    font-size: 1.45rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 0.3125rem 0.625rem 0.3125rem 0.625rem;
    text-align: center;
    align-items: center;

    @media screen and (max-width: 360px) {
        font-size: 1.375rem;
    }
`;

const StarContainer = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    background-color: green;
    border-radius: 10px;
    padding: 0.3125rem 0.625rem 0.3125rem 0.625rem;
    border: 1px solid black;
    font-size: 1.3rem;
    gap: 3px;

    @media screen and (max-width: 360px) {
        font-size: 1.375rem;
    }
`;

const HeartContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    border-radius: 0 0 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const Circle = styled.div`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: white;
    margin-right: 5px;
`;

const EventType = styled.div`
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
`;

export default function CreateEventCard ({name, date, address, smallDescription, rating, cost, image, type}) {
    return (
        <Card>
            <HeartContainer>
                <img width={"35px"} src={HEART}/>
            </HeartContainer>
            <Image src={image ? image : NULL_PHOTO}></Image>
            <Content>
                <MainContainer>
                    <Location>
                        <div>{address ? address : "Адрес"}</div>
                        <div style={{display: "flex", alignItems: "center", paddingLeft: "10px"}}>
                            <img style={{paddingRight: "7px"}} width={"18px"} src={IMAGE} alt={"календарь"}/>
                            <Date>{date ? DateFormatter.format(date) : "Дата"}</Date>
                        </div>
                    </Location>
                    <Name><strong>{name ? name : "Название"}</strong></Name>
                    <EventType><Circle/>{type ? type.name : "тип не выбран"}</EventType>
                    <Description>{smallDescription ? smallDescription : "Краткое описание"}</Description>
                </MainContainer>
                <StarAndCostContainer>
                    <StarContainer>
                        <img alt={"рейтинг"} width={"25spx"} src={STAR}/>
                        <div style={{paddingLeft: "2px"}}>{rating ? rating : "Рейтинг"}</div>
                    </StarContainer>
                    <Cost>{cost ? cost : "цена"}₽</Cost>
                </StarAndCostContainer>
            </Content>
        </Card>
    )
}