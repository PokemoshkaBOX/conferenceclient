import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {Container, Row} from "react-bootstrap";
import {Context} from "../../index";
import ConferenceItemUser from "./ConferenceItemUser";
import Col from "react-bootstrap/Col";

const ConferenceListUser = observer(() => {
    const {user} = useContext(Context)
    console.log(user.Users)
    return (
        <Container>
            <Row>
                    <Col md={4}>
                        <div style={{textAlign: "center"}}>Пользователь</div>
                    </Col>
                    <Col style={{ marginLeft: "10px" }} md={4}>
                        <div style={{textAlign: "center"}}>Роль</div>
                    </Col>
            </Row>
            {user.Users.map(users =>
                    <ConferenceItemUser key = {users.id} user = {users}/>
                )}
        </Container>
    );
});

export default ConferenceListUser;