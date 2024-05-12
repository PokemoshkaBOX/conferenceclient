import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import {observer} from "mobx-react";
import {Context} from "../../index";

const UserSearch1 = observer(({ setSearchValue }) => {
    return (
            <Form.Control
                style={{ marginTop: "10px", marginBottom: "10px", maxWidth: "300px"}}
                placeholder="Поиск по участникам конференции"
                onChange={(e) => setSearchValue(e.target.value)}
            />
    );
});


export default UserSearch1;