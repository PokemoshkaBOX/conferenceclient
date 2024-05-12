import React, {useState} from 'react';
import UserSearch1 from "../UserComponents/UserSearch1";
import {Button, Col, Dropdown, Row} from "react-bootstrap";
import {updateUserStatus} from "../../http/ConferenceAPI";


const UserConference = ( usersWithPresentations, oneParticipant) => {
    const [statuses, setStatuses] = useState({});
    const handleStatusSelect = (userId, status) => {
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [userId]: status
        }));
    };
    const initialStatuses = {};
            participantData.forEach(user => {
                initialStatuses[user.id] = user.status || ''; // Устанавливаем статус, если он уже есть
            });
            setStatuses(initialStatuses);

    const handleStatusChange = async (userId) => {
        try {
            const selectedStatus = statuses[userId];
            if (userId && selectedStatus) {
                await updateUserStatus(userId, selectedStatus);
            }
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };
     const getPresentationForUser = (userId) => {
        return usersWithPresentations.find(presentation => presentation.participantId === userId);
    };
    return (
         <Col style={{ justifyItems: "center" }}>
                        <div>Таблица участников конференции</div>
                        <UserSearch1/>
                        <Row>
                            <Row>
                                <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                    <div>Участник</div>
                                </Col>
                                <Col style={{ borderColor: "black", borderStyle: "solid" }} md={2}>
                                    <div>Статус</div>
                                </Col>
                                <Col style={{ borderColor: "black", borderStyle: "solid" }} md={2}>
                                                <div>телефон</div>
                                </Col>
                                <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                    <div>Пришёл/Не пришёл</div>
                                </Col>
                            </Row>
                            {oneParticipant.map(user => {
                                const author = getPresentationForUser(user.id);
                                if (author) {
                                    const userInfos = userInfo.find(info => info.email === author.authors);
                                    if (userInfos) {
                                        console.log(userInfos)
                                        return (
                                            <Row key={user.id}>
                                                <Col style={{borderColor: "black", borderStyle: "solid"}} md={3}>
                                                    <div>{author.authors}</div>
                                                </Col>
                                                <Col style={{borderColor: "black", borderStyle: "solid"}} md={2}>
                                                    <div>{user.role}</div>
                                                </Col>
                                                <Col style={{borderColor: "black", borderStyle: "solid"}} md={2}>
                                                    <div>{userInfos.phone}</div>
                                                </Col>
                                                <Col style={{borderColor: "black", borderStyle: "solid"}} md={3}>
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            {statuses[user.id] || user.status || 'Выбрать статус'}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item
                                                                onClick={() => handleStatusSelect(user.id, 'Пришёл')}>Пришёл</Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={() => handleStatusSelect(user.id, 'Не пришёл')}>Не
                                                                пришёл</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Col>
                                                <Col md={2}>
                                                    <Button onClick={() => handleStatusChange(user.id)}>
                                                        Подтвердить
                                                    </Button>
                                                </Col>
                                            </Row>
                                        );
                                    }
                                }
                            })}
                        </Row>
             </Col>
    )
};

export default UserConference;