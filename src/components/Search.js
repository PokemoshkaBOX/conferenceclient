import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import {observer} from "mobx-react";
import {Context} from "../index";

const Search = observer( () => {
    const {conferences} = useContext(Context)
    return (
        <div>
            <Form.Control
                style={{margin: 10}}
                placeholder="Поиск по конференциям"
                onChange = {(e => conferences.setSelectedName(e.target.value))}
            />

        </div>
    );
});

export default Search;