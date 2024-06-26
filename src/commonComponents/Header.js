import {Link, useLocation, useNavigate} from "react-router-dom";
import styled, {keyframes} from "styled-components";
import React, {useEffect, useState} from "react";
import MENU_BUTTON_IMAGE from "../img/menu.png"
import SHOPPING_CART_IMAGE from "../img/cart.png"
import GREEN_SHOPPING_CART_IMAGE from "../img/cart_green.png"
import EVENT_IMAGE from "../img/event.png"
import GREEN_EVENT_IMAGE from "../img/event_green.png"
import ADD_EVENT_IMAGE from "../img/addEvent.png"
import GREEN_ADD_EVENT_IMAGE from "../img/addEvent_green.png"
import CLOSE_BUTTON from "../img/close.png"
import LOGO from "../img/logo.png"
import OUR_IMAGE from "../img/our.png"
import OUR_GREEN_IMAGE from "../img/our_green.png"

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`
const HeaderContainer = styled.header`
    width: 100%;
    background-color: #f1e3d8;
    position: fixed;
    border-bottom: 2px solid #562626;
    z-index: 100;
`

const HeaderContent = styled.div`
    color: #562626;
    font-weight: bold;
    height: 100%;
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
`

const SiteName = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 24px;
    cursor: pointer;
    
    @media screen and (max-width: 370px){
        font-size: 22px;
    }
`

const MenuButton = styled.img`
    width: 30px;
    cursor: pointer;
`

const ModalWindow = styled.div`
    z-index: 99;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    opacity: ${props => props.visible ? "1" : "0"};
    pointer-events: ${props => props.visible ? "auto" : "none"};;
    animation: ${props => props.visible ? fadeIn : fadeOut} 0.4s ease;
    background: rgba(0, 0, 0, 0.85);
`

const ModalWindowContent = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 100%;
    gap: 30px;
`

const PageLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f1e3d8;

    &.active {
        color: green;
    }
`

const LinkImage = styled.img`
    width: 35px;
    position: absolute;
    margin-right: ${props => props.value || "0"};
`

const LinkText = styled.div`
    font-size: 28px;
`

const LinkTextAdmin = styled.div`
    font-size: 20px;
`

const HeaderPagesLine = styled.div`
    display: flex;
    gap: 25px;
    font-size: 19px;
`

const InlinePageLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #562626;

    &.active {
        border-bottom: 3px green solid;
        border-radius: 2px;
    }
`

const Circle = styled.div`
    display: ${props => props.count > 0 ? 'flex' : 'none'};;
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 23px;
    height: 23px;
    background-color: green;
    border-radius: 50%;
    color: white;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    margin-left: 138px;
    margin-top: 2px;
`

export default function Header ({userStatus}) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [buttonSelected, setButton] = useState("events");
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const [isPhone, setIsPhone] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        getCartEventsCount();
        function getCartEventsCount () {
            const cartsData = JSON.parse(localStorage.getItem("cartEvents")) || 0;
            const length = cartsData.length;
            setCartItemsCount(length > 99 ? 99 : length);
        }
    }, [menuVisible]);

    useEffect(() => {
        if (location.pathname.includes("/events")) {
            setButton("events");
        } else if (location.pathname.includes("/profile")) {
            setButton("profile");
        } else if (location.pathname.includes("/shopping_cart")) {
          setButton("shopping_cart")
        } else if (location.pathname.includes("/aboutUs")) {
            setButton("aboutUs");
        } else if (location.pathname.includes("/createEvents")) {
            setButton("createEvents");
        }
    }, [location.pathname]);

    useEffect(() => {
        window.innerWidth > 600 ? setIsPhone(false) : setIsPhone(true);
        setLoading(false);
    }, [])

    function handleMenu() {
        setMenuVisible(!menuVisible);
    }

    function goToEventsPage () {
        navigate("./events")
    }

    return (
        <>
            <header>
                <HeaderContainer>
                    <HeaderContent>
                        <SiteName onClick={goToEventsPage}>
                            <img src={LOGO} width={"40px"}/>
                            <div>THAT GIRL OASIS</div>
                        </SiteName>
                        {
                            !isLoading &&
                            isPhone ? <MenuButton onClick={handleMenu} src={menuVisible ? CLOSE_BUTTON : MENU_BUTTON_IMAGE}/> :
                            <HeaderPagesLine>
                                <InlinePageLink to={"/events"} className={buttonSelected === "events" ? "active" : ""}>Мероприятия</InlinePageLink>
                                <InlinePageLink to={"shopping_cart"} className={buttonSelected === "shopping_cart" ? "active" : ""}>корзина</InlinePageLink>
                                <InlinePageLink to={"/aboutUs"} className={buttonSelected === "aboutUs" ? "active" : ""}>о нас</InlinePageLink>
                            </HeaderPagesLine>
                        }
                    </HeaderContent>
                </HeaderContainer>
            </header>

            <ModalWindow visible={menuVisible} onClick={() => setMenuVisible(false)}>
                <ModalWindowContent>
                    <PageLink to={"/events"} className={buttonSelected === "events" ? "active" : ""}>
                        <LinkImage src={buttonSelected === "events" ? GREEN_EVENT_IMAGE : EVENT_IMAGE} value={"225px"}/>
                        <LinkText>мероприятия</LinkText>
                    </PageLink>
                    <PageLink to={"shopping_cart"} className={buttonSelected === "shopping_cart" ? "active" : ""}>
                        <LinkImage onClick={handleMenu}
                                   src={buttonSelected === "shopping_cart" ? GREEN_SHOPPING_CART_IMAGE : SHOPPING_CART_IMAGE}
                                   value={"155px"}/>
                        <LinkText>корзина</LinkText>
                        <Circle count={cartItemsCount}>{cartItemsCount}</Circle>
                    </PageLink>
                    <PageLink to={"/aboutUs"} className={buttonSelected === "aboutUs" ? "active" : ""}>
                        <LinkImage src={buttonSelected === "aboutUs" ? OUR_GREEN_IMAGE : OUR_IMAGE} value={"130px"}/>
                        <LinkText>о нас</LinkText>
                    </PageLink>
                    {userStatus && (userStatus === "creator" || userStatus === "administrator") &&
                        <div>
                            <div style={{marginBottom: "20px"}}>---------Функции Администратора---------</div>
                            <ModalWindowContent>
                                <PageLink to={"/createEvents"}
                                          className={buttonSelected === "createEvents" ? "active" : ""}>
                                    <LinkImage
                                        src={buttonSelected === "createEvents" ? GREEN_ADD_EVENT_IMAGE : ADD_EVENT_IMAGE}
                                        value={"255px"}/>
                                    <LinkTextAdmin>Создать мероприятие</LinkTextAdmin>
                                </PageLink>
                            </ModalWindowContent>
                        </div>
                    }
                </ModalWindowContent>
            </ModalWindow>
        </>
    )
}