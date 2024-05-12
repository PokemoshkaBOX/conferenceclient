import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, CONFERENCE_ROUTE, CONFIRMITION_ROUTE} from "../utils/consts";
import {observer} from "mobx-react";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [phone, setPhone] = useState('');
    const click = () => {
        try {
            let data;
            if (!isLogin) {
                if (password !== password1) {
                    setPasswordsMatch(false); // Устанавливаем состояние, если пароли не совпадают
                    return; // Прерываем выполнение функции
                }
                try {
                    console.log(phone)
                    data = user.Registration(email, password, name, surname, patronymic, phone)
                    if(data) {
                        console.log(user.user.isActivated)
                        alert("Подтвердите почту")
                        history(LOGIN_ROUTE)
                    }
                }
                catch (e){
                    history(LOGIN_ROUTE)
                }

            } else {
                data = user.Login(email, password)
                if(data) {
                        console.log(user.user.isActivated)
                        if (user.user.isActivated === 'false') {
                            alert("Почта не подтверждена")
                        } else {
                            history(CONFERENCE_ROUTE)
                        }
                }
            }

        } catch (e){
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style = {{height: window.innerHeight -54  }}
        >
            {isLogin ?
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto"> Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type = "password"
                    />
                    <Row className = "d-flex align-self-auto mt-3 pl-3 pr-3">
                            <Col xs={4} md={8}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйся! </NavLink>
                            </Col>
                        <Col xs={3} md={2}>

                        </Col>
                        <Col xs={4} md={2}>
                            <Button
                                variant= "outline-dark"
                                onClick={click}
                            >
                                Войти
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
                :
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto"> Регистрация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Фамилия"
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    <Row>
                        <Col>
                            <Form.Control
                                className="mt-3"
                                placeholder="Имя"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                className="mt-3"
                                placeholder="Отчество"
                                value={patronymic}
                                onChange={e => setPatronymic(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control
                                className="mt-3"
                                placeholder="Телефон"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control
                                className="mt-3"
                                placeholder="Пароль"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type = "password"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                className="mt-3"
                                placeholder="Пароль ещё раз"
                                value={password1}
                                onChange={e => setPassword1(e.target.value)}
                                type = "password"
                            />
                        </Col>
                    </Row>
                    <Row className = "d-flex align-self-auto mt-3 pl-3 pr-3">
                            <Col xs={4} md={7}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите! </NavLink>
                            </Col>
                        <Col xs={3} md={2}>

                        </Col>
                        <Col xs={4} md={2}>
                            <Button
                                variant= "outline-dark"
                                onClick={click}
                            >
                                 Регистрация
                            </Button>
                        </Col>
                    </Row>
                    {!passwordsMatch && <p className="text-danger">Пароли не совпадают!</p>}
                </Form>
            </Card>
            }
        </Container>
    );
});

export default Auth;