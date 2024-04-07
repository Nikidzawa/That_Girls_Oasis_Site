import LUPA from "../../../img/lupa.png";
import LIGHT from "../../../img/ligth.png";
import Money from "../../../img/money.png";
import BALLON from "../../../img/ballon.png";
import RedHeart from "../../../img/red_heart.png";
import styled from "styled-components";
import {useEffect, useMemo, useState} from "react";
import InternalAPI from "../../../API/InternalAPI";

const Button = styled.button`
    height: 40px;
    font-size: 15px;
    min-width: auto;
    border-radius: 20px;
    background-color: #F5F5F5;
    padding: ${props => props.backgroundImage ? "10px 15px 10px 32px" : "10px 20px 10px 20px"};
    background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'};
    background-repeat: no-repeat;
    background-position: center left 5px;
    background-size: 25px;

    ${(props) =>
    props.selected &&
    `
            background-color: green;
            color: white;
            `
}

    ${(props) =>
    !props.selected &&
    `
            background-color: white;
            color: black;
            `
}
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 50px;
    overflow-x: auto;
    white-space: nowrap;
    @media screen and (max-width: 300px) {
        gap: 8px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding-left: 38px;
    border-radius: 20px;
    font-size: 14px;
    height: 40px;
    outline: none;
    background-image: ${props => `url('${props.backgroundImage}')`};
    background-repeat: no-repeat;
    background-position: center left 5px;
    background-size: 28px;
`

const SearchContainer = styled.div`
    background-color: #333;
    padding: 10px 15px 10px 15px;
`

const Select = styled.select`
    height: 40px;
    border-radius: 20px;
    font-size: 15px;
    width: auto;
    border: none;
    outline: none;
    text-align: center;
    max-width: 190px;
    background-color: #F5F5F5;
    padding: ${props => props.backgroundImage ? "10px 10px 10px 32px" : "10px 10px 10px 10px"};
    background-image: ${props => props.backgroundImage ? `url('${props.backgroundImage}')` : 'none'};
    background-repeat: no-repeat;
    background-position: center left 5px;
    background-size: 25px;
    ${(props) => props.value !== "NONE" ? 
            `
            background-color: green;
            color: white;
            ` 
            : 
            `
            background-color: #F5F5F5;
            color: black;
            `
    }
    option {
        background-color: white;
        color: black;
    }
`

const Option = styled.option`
    
`

export default function SearchPanel ({events, setSortedEvents}) {
    const [sortBy, setSortBy] = useState(["Скоро", "Рядом"]);
    const [priceSort, setPriceSort] = useState("NONE");
    const [search, setSearch] = useState("");
    const [typeSort, setTypeSort] = useState("NONE");
    const [types, setTypes] = useState("");

    useEffect(() => {
        getTypes();
        async function getTypes () {
            const response = await InternalAPI.getAllEventTypes();
            setTypes(response);
        }
    }, [])

    useMemo(() => {
        if (!events) return;
        const sortedEvents = sortEvents(events);
        setSortedEvents(sortedEvents);
    }, [events, sortBy, search, priceSort]);

    function sortEvents(sortedEvents) {
        let sorted = sortedEvents;

        if (sortBy.includes("Скоро")) {
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        if (sortBy.includes("Недорогие")) {
            sorted.sort((a, b) => a.cost - b.cost);
        } else if (sortBy.includes("Дорогие")) {
            sorted.sort((a, b) => b.cost - a.cost);
        }
        if (typeSort !== "NONE") {
            sorted = sorted.filter(event => event.eventType.name === typeSort);
            return searchSort(sorted);
        }

        if (sortBy.includes("Избранное")) {
            sorted = sorted.filter(event => {
                const favouriteEvents = localStorage.getItem("favouriteEvents");
                if (favouriteEvents) {
                    const favouriteEventsArray = favouriteEvents.split(",");
                    return favouriteEventsArray.includes(event.id.toString());
                }
                return false;
            });
        }
        return searchSort(sorted);
    }

    function searchSort(sortedEvents) {
        return sortedEvents.filter(event =>
            event.name.toLowerCase().includes(search.toLowerCase()) ||
            event.smallDescription.toLowerCase().includes(search.toLowerCase()) ||
            event.fullDescription.toLowerCase().includes(search.toLowerCase()) ||
            event.city.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    function handleSort (option) {
        if (sortBy.includes(option)) {
            setSortBy(sortBy.filter(item => item !== option));
        } else {
            setSortBy([...sortBy, option])
        }
    }

    function handlePriceSort (option) {
        const sorted = sortBy.filter(item => item !== priceSort);
        setPriceSort(option);
        setSortBy([...sorted, option]);
    }
    function handleTypeSort(type) {
        const sorted = sortBy.filter(item => item !== typeSort);
        setTypeSort(type);
        setSortBy([...sorted, type]);
    }

    return (
        <SearchContainer>
            <div style={{display: "flex", margin: "0 0 10px 0"}}>
                <Input placeholder={"Найти мероприятие"} onChange={e => setSearch(e.target.value)} backgroundImage={LUPA}/>
            </div>
            <ButtonContainer>
                <Button
                    backgroundImage={LIGHT}
                    selected={sortBy.includes('Скоро')}
                    onClick={() => handleSort('Скоро')}
                >Скоро</Button>
                <Select onChange={e => handleTypeSort(e.target.value)} backgroundImage={BALLON} value={typeSort}>
                    <Option value={"NONE"}>Без категории</Option>
                    {
                        types &&
                        types.map(type => <Option value={type.name}>{type.name}</Option>)
                    }
                </Select>
                <Select onChange={e => handlePriceSort(e.target.value)} backgroundImage={Money} value={priceSort}>
                    <Option value={"NONE"}>Цена не важна</Option>
                    <Option value={"Недорогие"}>Сначала недорогие</Option>
                    <Option value={"Дорогие"}>Сначала дорогие</Option>
                </Select>
                <Button
                    backgroundImage={RedHeart}
                    selected={sortBy.includes('Избранное')}
                    onClick={() => handleSort('Избранное')}
                >Избранное
                </Button>
            </ButtonContainer>
        </SearchContainer>
    )
}