import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, CONFERENCE_ROUTE, LC_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import Search from "./Search";
import logo from './assets/YSTU logo.png';
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    console.log(user.user.role)
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>

            <Navbar.Brand><Button variant={'dark'} style={{justifyContent: "center", fontSize: 25}}><img src = {logo} style={{width: "60px", marginLeft: "10px"}} onClick={() => history(CONFERENCE_ROUTE)}></img> ЯГТУ</Button></Navbar.Brand>
            <Search/>
            {user.isAuth ?
                  <Nav className="ml-auto">
                    <Button style={{marginRight: "20px"}} variant={'outline-light' } onClick={() => history(LC_ROUTE)}>Личный кабинет</Button>
                      {(user.user.role === 'ADMIN' || user.user.role === 'MANAGER') && (
                            <Button style={{ marginRight: "20px" }} variant={'outline-light'} onClick={() => history(ADMIN_ROUTE)}>Админ панель</Button>
                      )}
                      <Button variant={'outline-light' } onClick={() => user.Logout() && history(LOGIN_ROUTE)}>Выйти</Button>
                  </Nav>
                :
                  <Nav className="ml-auto">
                      <Button variant={'outline-light'} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                  </Nav>
            }
        </Container>
      </Navbar>
    );
});

export default NavBar;