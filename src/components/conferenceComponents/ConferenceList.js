import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {Row} from "react-bootstrap";
import {Context} from "../../index";
import ConferenceItem from "./ConferenceItem";

const ConferenceList = observer(() => {
    const {conferences} = useContext(Context)

    return (
        <Row className="d-flex" md={12} style={{
            borderRadius: 10,
            margin: 10,
            maxHeight: "800px",
            overflowY: "auto"
        }}>
            {conferences.Conferences.map(conference =>
                <ConferenceItem key = {conference.id} conference = {conference}/>
            )}
        </Row>
    );
});

export default ConferenceList;