import {Navigate, Route, Routes} from "react-router-dom";
import EventsPage from "./pages/eventsPage/EventsPage";
import React, {useEffect, useState} from "react";
import Loading from "./commonComponents/Loading";
import CreateEventPage from "./pages/eventManipulationPages/createEventPage/CreateEventPage";
import styled from "styled-components";
import Header from "./commonComponents/Header";
import EventPage from "./pages/eventPage/EventPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import ShoppingCartPage from "./pages/shoppingCartPage/ShoppingCartPage";
import AboutUsPage from "./pages/aboutUs/AboutUsPage";
import UsersAPI from "./API/internal/categoryes/users/UsersAPI";
import RolesAPI from "./API/internal/categoryes/users/RolesAPI";
import CheckRegister from "./pages/checkRegister/CheckRegister";
import EditEventPage from "./pages/eventManipulationPages/editEvent/EditEventPage";
import EventsAPI from "./API/internal/categoryes/events/EventsAPI";


const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

function App() {
    const [user, setUser] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [eventsCart, setEventsCart] = useState(null)

    useEffect(() => {
        getUser();
        async function getUser() {
            updateCartData()
            const tg = window.Telegram.WebApp;
            const user = tg.initDataUnsafe.user;
            if (user) {
                const userData = await UsersAPI.getUser(user.id);
                if (userData.ok) {
                    const user = await userData.json();
                    setUser(user);
                    getUserStatus(user)
                }
            }
            localStorage.setItem("userId", user ? user.id : 0);
            setLoading(false);
        }

        async function getUserStatus (user) {
            const status = await RolesAPI.getRole(user.id);
            setUserStatus(status);
        }

        async function updateCartData () {
            const cartsData = JSON.parse(localStorage.getItem("cartEvents")) || [];
            const eventPromises = cartsData.map(async (event) => {
                let response = await EventsAPI.getEventById(event.id);
                if (response.ok) {
                    let updatedEvent = await response.json()
                    updatedEvent.count = event.count;
                    return updatedEvent;
                }
                return null;
            });

            const resolvedEvents = await Promise.all(eventPromises);
            const filteredEvents = resolvedEvents.filter(event => event !== null);

            localStorage.setItem("cartEvents", JSON.stringify(filteredEvents));
            setEventsCart(filteredEvents);
        }
    }, []);

    return (
        <div>
            {loading ? <LoaderWrapper><Loading circleColor={"#333"}/></LoaderWrapper> :
                <div>
                    {/*//TODO-СТАТУС*/}
                    <Header userStatus={"creator"}/>
                    <div style={{paddingTop: "70px"}}>
                        <Routes>
                            <Route path={"/events"} element={<EventsPage user={user}/>} />
                            {/*//TODO-СТАТУС*/}
                            <Route path={"/events/:id"} element={<EventPage role={"creator"}/>} />
                            <Route path={"/events/edit/:id"} element={<EditEventPage/>}></Route>
                            <Route path={"/createEvents"} element={<CreateEventPage user={user}/>} />
                            <Route path={"/shopping_cart"} element={<ShoppingCartPage eventCarts={eventsCart} setEventCarts={setEventsCart}/>} />
                            <Route path={"/aboutUs"} element={<AboutUsPage />} />
                            <Route path={"/checkMemberStatus/:eventId/:token"} element={<CheckRegister/>}></Route>
                            <Route path={"/404"} element={<NotFoundPage />} />
                            <Route path={"/*"} element={<Navigate to={"/events"} />} />
                        </Routes>
                    </div>
                </div>
            }
        </div>
    );
}

export default App;