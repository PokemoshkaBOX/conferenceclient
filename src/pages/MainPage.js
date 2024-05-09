import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ConferenceList from "../components/conferenceComponents/ConferenceList";
import {observer} from "mobx-react";
import {fetchConferences} from "../http/ConferenceAPI";
import {Context} from "../index";


const MainPage = observer(() => {
    const {conferences} = useContext(Context)
    useEffect(() => {
        fetchConferences(conferences.SelectedName).then(data =>
            conferences.setConferences(data.rows))
    },[conferences.SelectedName])
    console.log(conferences.SelectedName)
    return (
        <Container fluid>
            <Row className="mt-2" style={{justifyContent: "center"}}>
                <Col md={6}>
                    <ConferenceList/>
                </Col>
            </Row>
        </Container>
    );
});

export default MainPage;