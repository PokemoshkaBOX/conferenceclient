import React, { useContext, useEffect, useState } from 'react';
import {Button, Card, Col, Container, Dropdown, Form, Row} from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneConference, fetchOneParticipant, updateUserStatus } from "../http/ConferenceAPI";
import {fetchUsersInConference, uploadCorrectedArticle, uploadTeacherArticle, userInfo} from "../http/userAPI";
import { Context } from "../index";
import FileIcon from "../components/conferenceComponents/FilePath";
const ConferenceInfoAdmin = () => {
    const {user} = useContext(Context)
    const [conference, setOneConference] = useState({})
    const [usersWithPresentations, setUsersWithPresentations] = useState([]);
    const [oneParticipant, setOneParticipant] = useState([]);
    const [statuses, setStatuses] = useState({});
    const { id } = useParams()
    const [file, setFile] = useState('');
    const [authors, setAuthors]= useState('')
    useEffect(() => {
        const fetchData = async () => {
            const conferenceData = await fetchOneConference(id);
            setOneConference(conferenceData);
            const usersData = await fetchUsersInConference(id);
            setUsersWithPresentations(usersData);
            const participantData = await fetchOneParticipant(id);
            setOneParticipant(participantData);
            // Инициализируем состояния для каждого участника
            const initialStatuses = {};
            participantData.forEach(user => {
                initialStatuses[user.id] = user.status || ''; // Устанавливаем статус, если он уже есть
            });
            setStatuses(initialStatuses);
        };
        fetchData();
    }, [id]);

    const getPresentationForUser = (userId) => {
        return usersWithPresentations.find(presentation => presentation.participantId === userId);
    };
    const getDoclad = (userId) => {
        console.log(user.userInfo.surname)
        return usersWithPresentations.find(presentation => presentation.participantId === userId && presentation.teacher === user.userInfo.surname);
    }
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
    const handleFileChange = (e, mail) => {
        const file = e.target.files[0]; // Получение первого выбранного файла
        setAuthors(mail)
        setFile(e.target.files[0])
        console.log('Выбранный файл:', file);
    };

    const sendUserArticle = () => {
        const formData = new FormData()
        formData.append('authors', authors)
        formData.append('file', file)
        uploadTeacherArticle(formData)
            .then(() => {
                alert("Доклад успешно отправлен")
            })
            .catch(error => {
                console.error("Error uploading corrected article:", error);
            });
    };

    const handleStatusSelect = (userId, status) => {
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [userId]: status
        }));
    };

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    if (conference && usersWithPresentations && oneParticipant) {
        return (
            <Container fluid style={{ minHeight: "800px" }}>
                <Row style={{ justifyContent: "center" }} className="mt-3" bg="dark" data-bs-theme="dark">
                    <Col md={7} className="mt-3">
                        <Card border={"black"} style={{
                            cursor: "pointer",
                            shadowColor: "black",
                            shadowOffset: { height: 5 },
                            shadowOpacity: 0.5,
                            padding: "20px",
                            minHeight: "600px"
                        }}>
                            <Row>
                                <Row md={12}>
                                    <h1 style={{ fontSize: 20, textAlign: "center" }}>{conference.title}</h1>
                                    <Col md={6} style={{ justifyItems: "center" }}>
                                        <div style={{ textAlign: "center" }}><b>Дата начала:</b> {formatDate(conference.date_begin)}</div>
                                        <div style={{ textAlign: "center" }}><b>Время начала:</b> {formatTime(conference.date_begin)}</div>
                                    </Col>
                                    <Col md={6} style={{ justifyItems: "center" }}>
                                        <div style={{ textAlign: "center" }}><b>Дата окончания:</b> {formatDate(conference.date_end)}</div>
                                        <div style={{ textAlign: "center" }}><b>Время окончания:</b> {formatTime(conference.date_end)}</div>
                                    </Col>

                                    <Row>
                                        <Col style={{ minHeight: "400px", marginTop: "20px" }} md={8}>
                                            <div><b>Описание:</b> </div>
                                            <div>{conference.info}</div>
                                            <div className="mt-3"><b>Программа конференции:</b>{conference.infoprog}</div>
                                            <div className="mt-3"><b>Секции и научные направления конференции:</b></div>
                                            {conference.infosections && conference.infosections.split(',').map((direction, index) => (
                                                <li key={index}>{`${index + 1}. ${direction.trim()}`}</li>
                                            ))}
                                        </Col>
                                        <Col style={{ marginTop: "20px" }}>
                                            <div><b>Место проведения:</b></div>
                                            <div>{conference.infoarea}</div>
                                            <div style={{ marginTop: "20px" }}><b>План мероприятия:</b></div>
                                            <div>{conference.infoplan}</div>
                                        </Col>
                                        <div style={{ marginTop: "20px" }}><b>Участники и руководители направлений:</b></div>
                                        <Row>
                                            <Row style={{ marginTop: "20px" }}>
                                                <Col style={{ borderColor: "white", borderStyle: "solid" }}>
                                                    <div>Наименование секции</div>
                                                </Col>
                                                <Col style={{ borderColor: "white", borderStyle: "solid" }}>
                                                    <div>Руководитель секции</div>
                                                </Col>
                                                <Col style={{ borderColor: "white", borderStyle: "solid" }}>
                                                    <div>Контакты</div>
                                                </Col>
                                            </Row>
                                        </Row>
                                        <Row style={{ overflowY: "auto"}}>
                                            {usersWithPresentations.map(user => (
                                                <Row key={user.id}>
                                                    <Col style={{ borderColor: "white", borderStyle: "solid" }}>
                                                        <div>{user.section}</div>
                                                    </Col>
                                                    <Col style={{ borderColor: "white", borderStyle: "solid" }}>
                                                        <div>{user.teacher}</div>
                                                    </Col>
                                                    <Col style={{ borderColor: "white", borderStyle: "solid" }}>
                                                        <div>{user.authors}</div>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </Row>
                                    </Row>
                                </Row>
                            </Row>
                        </Card>
                    </Col>
                    <Col style={{ justifyItems: "center" }}>
                        <div>Таблица участников конференции</div>
                        <Row>
                            <Row>
                                <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                    <div>Участник</div>
                                </Col>
                                <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                    <div>Статус</div>
                                </Col>
                                <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                    <div>Пришёл/Не пришёл</div>
                                </Col>
                            </Row>
                            {oneParticipant.map(user => {
                                const author = getPresentationForUser(user.id);
                                if (author) {
                                    return (
                                        <Row key={user.id}>
                                            <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                                <div>{author.authors}</div>
                                            </Col>
                                            <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                                <div>{user.role}</div>
                                            </Col>
                                            <Col style={{ borderColor: "black", borderStyle: "solid" }} md={3}>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        {statuses[user.id] || user.status || 'Выбрать статус'}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleStatusSelect(user.id, 'Пришёл')}>Пришёл</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleStatusSelect(user.id, 'Не пришёл')}>Не пришёл</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Col>
                                            <Col>
                                                <Button onClick={() => handleStatusChange(user.id)}>
                                                    Подтвердить
                                                </Button>
                                            </Col>
                                        </Row>
                                    );
                                }
                            })}
                        </Row>
                        <div style={{marginTop: "20px"}}>Доклады ожидающие проверки</div>
                        <Row style={{maxHeight: "400px", overflowY: "auto"}}>
                            {oneParticipant.map(data => {
                                const artecleUser = getDoclad(data.id);
                                if(artecleUser) {
                                    return (
                                        <Row>
                                            <Col>
                                                <div>Докладчик</div>
                                                <div>{artecleUser.authors}</div>
                                            </Col>
                                            <Col>
                                                <div>Доклад</div>
                                                {artecleUser.file &&
                                                    <FileIcon filePath={artecleUser.file}/>
                                                }
                                                <Form.Group controlId="formArticle">
                                                  <Form.Label>Добавить исправленный доклад</Form.Label>
                                                  <Form.Control type="file" onChange={(e) =>handleFileChange(e, artecleUser.authors)}/>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                            <Button style={{ marginTop: "30px" }} type="file"  onClick={sendUserArticle}>Загрузить исправленный доклад</Button>
                                            <Button style={{ marginTop: "30px" }}  onClick={sendUserArticle}>Подтвердить доклад</Button>
                                            </Col>
                                        </Row>
                                    )
                                }
                            })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default ConferenceInfoAdmin;
