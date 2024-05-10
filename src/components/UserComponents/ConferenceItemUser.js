import React, {useEffect, useState} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {editUser, getOneUserInfo} from "../../http/userAPI";

const UserInfo = ({ user}) => {
    const [editing, setEditing] = useState(false); // Состояние редактирования
    const [editedUser, setEditedUser] = useState({ ...user }); // Состояние измененного пользователя
    const [userInfo, setUserInfo] = useState('')
    const [userId, setUserId] = useState(user.id)
    useEffect(()=> {
        getOneUserInfo(userId).then(data =>
            setUserInfo(data)
        )
    }, [userId])
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleConfirm = () => {
        editUser(user.id, editedUser.email, editedUser.role).then(data =>{
        })
        console.log('Изменения сохранены:', editedUser);

        setEditing(false);
    };

    return (
        <Row style={{ marginTop: "10px" }}>

            <Col style={{ borderColor: "blue", borderRadius: "10px", border: "solid" }} md={2}>
                {userInfo.surname}{' '}
                {userInfo.name && userInfo.name.charAt(0)}.
                {userInfo.patronymic && userInfo.patronymic[0]}.
            </Col>
            <Col style={{ borderColor: "blue", borderRadius: "10px", border: "solid" }} md={4}>
                {editing ? (
                    <input
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    />
                ) : (
                    <div style={{ textAlign: "center" }}>{user.email}</div>
                )}
            </Col>
            <Col style={{ borderColor: "blue", borderRadius: "10px", border: "solid" }} md={3}>
                {editing ? (
                    <select
                        name="role"
                        value={editedUser.role}
                        onChange={handleInputChange}
                        style={{ width: "100%" }}
                    >
                        <option value="USER">Пользователь</option>
                        <option value="MANAGER">Менеджер</option>
                        <option value="ADMIN">Администратор</option>
                    </select>
                ) : (
                    <div style={{ textAlign: "center" }}>{user.role}</div>
                )}
            </Col>
            <Col>
                {editing ? (
                    <Button onClick={handleConfirm}>Подтвердить</Button>
                ) : (
                    <Button onClick={handleEdit}>Изменить</Button>
                )}
            </Col>
        </Row>
    );
};

export default UserInfo;
