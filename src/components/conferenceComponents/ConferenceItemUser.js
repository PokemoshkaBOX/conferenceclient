import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {CONFERENCEITEM_ROUTE} from "../../utils/consts";
import {fetchUsersInConference, sendArticleForReview, uploadCorrectedArticle} from "../../http/userAPI";
import {fetchRole} from "../../http/userAPI";
import {Context} from "../../index";
import {fetchOneArticle} from "../../http/userAPI";
import FileIcon from "./FilePath";
import {createArticle} from "../../http/ConferenceAPI";

const ConferenceItemUser = ({conference, role, conferenceId}) => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const [article, setArticle] = useState({})
    const [file, setFile] = useState('');
    console.log(article.fileteacher)
    console.log(article.file)
    const id = conferenceId
    console.log(user.user.id)
    console.log(id)
    useEffect(() => {
        fetchOneArticle(user.user.id, id).then(data => setArticle(data))
    }, [user.user.id, id])
    if(role) {
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const sendArticle = () => {
        sendArticleForReview(user.user.id, id, file)
            .then(() => {
                fetchOneArticle(user.user.id, id).then(data => setArticle(data))
            })
            .catch(error => {
                console.error("Error sending article:", error);
                // Обработайте ошибку отправки доклада
            });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Получение первого выбранного файла
        setFile(e.target.files[0])
        console.log('Выбранный файл:', file);
    };

    const addArticle = () => {
        const formData = new FormData()
        formData.append('conferenceId', id)
        formData.append('userId', user.user.id)
        formData.append('file', file)
        uploadCorrectedArticle(formData)
            .then(() => {
            })
            .catch(error => {
                console.error("Error uploading corrected article:", error);
            });
    };
        return (
            <Col md={12} className="mt-3"  bg="dark"
                 data-bs-theme="dark">
                <Card border={"black"} style={{
                    cursor: "pointer",
                    shadowColor: "black",
                    shadowOffset: {height: 5},
                    shadowOpacity: 0.5,
                    padding: "20px",
                    minHeight: "600px"
                }}>
                    <Row>
                            <Row md={12}>
                                <Row onClick={() => history(CONFERENCEITEM_ROUTE + '/' + conference.id)}>
                                    <h2 style={{fontSize: 20, textAlign: "center"}}>{conference.title}</h2>
                                    <h2 style={{color: "green", textAlign: "center"}}> Вы зарегестрированы в качестве {role.rows[0].role}</h2>
                                    <Col md={6} style={{justifyItems: "center"}}>
                                        <div style={{textAlign: "center"}}><b>Дата
                                            начала:</b> {formatDate(conference.date_begin)}</div>
                                        <div style={{textAlign: "center"}}><b>Время
                                            начала:</b> {formatTime(conference.date_begin)}</div>
                                    </Col>
                                    <Col md={6} style={{justifyItems: "center"}}>
                                        <div style={{textAlign: "center"}}><b>Дата
                                            окончания:</b> {formatDate(conference.date_end)}</div>
                                        <div style={{textAlign: "center"}}><b>Время
                                            окончания:</b> {formatTime(conference.date_end)}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{
                                        minHeight: "400px",
                                        maxHeight: "400px",
                                        marginTop: "20px",
                                        overflowY: "auto"
                                    }} md={6}>
                                        <div><b>Описание:</b></div>
                                        <div>{conference.info}</div>
                                    </Col>
                                        <Col style={{marginTop: "20px"}} md={4}>
                                            <div><b>Мой доклад</b></div>
                                            <hr/>
                                            {article.file &&
                                                <FileIcon filePath={article.file}/>
                                            }
                                            <div style={{marginTop: "20px"}}><b>Доклад от преподавателя с правками</b></div>
                                            <hr/>
                                            {article.fileteacher &&
                                                <FileIcon filePath={article.fileteacher}/>
                                            }
                                            <Form.Group controlId="formArticle">
                                                  <Form.Label>Добавить статью</Form.Label>
                                                  <Form.Control type="file" onChange={(e) =>handleFileChange(e)}/>
                                              </Form.Group>
                                            <Button style={{ marginTop: "30px" }}  type="file"  onClick={sendArticle}>Отправить на проверку</Button>
                                            <Button style={{ marginTop: "30px" }} type="file"  onClick={addArticle}>Загрузить исправленный доклад</Button>
                                        </Col>
                                        <Col style={{marginTop: "20px"}} md={2}>
                                            <div><b>Статус</b></div>
                                            <hr/>
                                            {article.fileteacher?
                                                <div style={{ color:  'green'}}>
                                                    Исправить
                                                </div>
                                                :
                                                <div style={{ color: article.status === 'Новое' ? 'green' : 'red' }}>
                                                    {article.status}
                                                </div>
                                            }
                                        </Col>
                                </Row>
                            </Row>
                    </Row>
                </Card>
            </Col>
        );
    }
};

export default ConferenceItemUser;