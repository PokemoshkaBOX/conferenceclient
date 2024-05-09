import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import {observer} from "mobx-react";
import {Context} from "../../index";

const UserSearch = observer( () => {
    const {user} = useContext(Context)
    return (
        <div>
            <Form.Control
                style={{margin: 10}}
                placeholder="Поиск по пользователям"
                onChange = {(e => user.setSelectedUsers(e.target.value))}
            />

        </div>
    );
});

export default UserSearch;