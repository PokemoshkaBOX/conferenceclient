import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {fetchConferences, fetchUserConferences} from "../http/ConferenceAPI";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container} from "react-bootstrap";
import ConferenceListUser from "../components/conferenceComponents/ConferenceListUser";
import {userInfo} from "../http/userAPI";
import {observer} from "mobx-react-lite";

const Lc = observer(() => {
    const {user, conferences} = useContext(Context)
    const id = user.user.id
    console.log(user.user.role)
    console.log(user.user.id)
    useEffect(() => {
        // Запрос информации о пользователе
        userInfo(id)
            .then(data => {
                user.setUserInfo(data);
            })
            .catch(error => {
                console.error("Ошибка при получении информации о пользователе:", error);
            });

        // Запрос конференций пользователя
        fetchUserConferences(id)
            .then(data => {
                conferences.setUserConferences(data.rows);
            })
            .catch(error => {
                console.error("Ошибка при получении конференций пользователя:", error);
            });
    }, [id, user, conferences]);
        return (
            <Container fluid>
                <Row style={{marginTop: "20px"}}>
                    <Col md={3}>
                        <div style={{fontSize: 40}}>Мои данные</div>
                        <div style={{marginTop: 20}}>Имя {user.userInfo.name}</div>
                        <div>Фамилия {user.userInfo.surname}</div>
                        <div>Отчество {user.userInfo.patronymic}</div>
                        <div>Телефон +{user.userInfo.phone}</div>
                        <div>Возраст 21</div>
                    </Col>
                    <Col md={9}>
                        <div style={{fontSize: 40, alignItems: "center"}}>Мои конференции</div>
                        {conferences.UserConferences &&
                        <ConferenceListUser/>
                        }
                    </Col>
                </Row>
            </Container>
        );
});

export default Lc;