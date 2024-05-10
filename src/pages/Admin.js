import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateConference from "../components/models/CreateConference";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ConferenceListUsers from "../components/UserComponents/ConferenceListUsers";
import Search from "../components/Search";
import ConferenceListAdmin from "../components/conferenceComponents/ConferenceListAdmin";
import {observer} from "mobx-react";
import {Context} from "../index";
import {fetchConferences} from "../http/ConferenceAPI";
import {getAllUsers} from "../http/userAPI";
import UserSearch from "../components/UserComponents/UserSearch";

const Admin = observer(() => {
    const [conferenceVisible, SetConferenceVisible] = useState(false)
    const {conferences, user} = useContext(Context)
    useEffect(() => {
        fetchConferences(conferences.SelectedName).then(data =>
            conferences.setConferences(data.rows))
    },[conferences.SelectedName])
    useEffect(() => {
        getAllUsers(user.selectedUser).then(data =>
            user.setUsers(data.rows))
    },[user.selectedUser])
    console.log(user.selectedUser)
    return (
        <Container fluid>
            <Row>
                {user.user.role === 'ADMIN' &&
                <Col md={5} style={{alignItems: "center"}}>
                    <Row>
                        <h1>Зарегистрированные пользователи</h1>
                    </Row>
                    <Row>
                        <Col md={1} >

                        </Col>
                        <Col md={6} >
                            <UserSearch/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ConferenceListUsers/>
                        </Col>
                    </Row>
                </Col>
                }
                <Col>
                    <Row >
                        <h1 style={{textAlign: "center"}}>Текущие конференции</h1>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Button
                                variant={"outline-dark"}
                                className="mt-4 p-2"
                                onClick={()=> SetConferenceVisible(true)}
                                style={{marginLeft: "20px"}}
                            >
                                Добавить конференцию
                            </Button>
                        </Col>
                        <Col md={4} style={{marginTop: "15px"}}>
                            <Search/>
                        </Col>
                    </Row>
                    <CreateConference show={conferenceVisible} onHide={() => SetConferenceVisible(false)}/>
                    <ConferenceListAdmin/>
                </Col>
            </Row>
        </Container>
    );
});

export default Admin;