import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneConference} from "../http/ConferenceAPI"
import { getOneUserInfoFromConference} from "../http/userAPI";
import {fetchUsersInConference} from "../http/userAPI";
const ConferenceInfo = () => {
    const [conference, setOneConference] = useState({})
    const [usersWithPresentations, setUsersWithPresentations] = useState([]);
    const {id} = useParams()
    const [userInfo, setUserInfo] = useState('')

    useEffect(() => {
        getOneUserInfoFromConference().then(data =>  setUserInfo(data))
        fetchOneConference(id).then(data => setOneConference(data))
        fetchUsersInConference(id).then(data => setUsersWithPresentations(data))
    }, [id])
    console.log(conference, usersWithPresentations)
    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      };

      const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      };
    if(conference && usersWithPresentations) {
        return (
            <Container fluid style={{minHeight: "800px"}}>
                <Row style={{justifyContent: "center"}} className="mt-3" bg="dark" data-bs-theme="dark">
                    <Col md={8}  className="mt-3">
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
                              <h1 style={{ fontSize: 20, textAlign: "center"}}>{conference.title}</h1>
                            <Col md={6} style={{justifyItems: "center"}}>
                              <div style={{textAlign: "center"}}><b>Дата начала:</b> {formatDate(conference.date_begin)}</div>
                              <div style={{textAlign: "center"}}><b>Время начала:</b> {formatTime(conference.date_begin)}</div>
                            </Col>
                            <Col md={6} style={{justifyItems: "center"}}>
                              <div style={{textAlign: "center"}}><b>Дата окончания:</b> {formatDate(conference.date_end)}</div>
                              <div style={{textAlign: "center"}}><b>Время окончания:</b> {formatTime(conference.date_end)}</div>
                            </Col>

                            <Row>
                              <Col style={{minHeight: "400px", marginTop: "20px"}} md={8}>
                                  <div><b>Описание:</b> </div>
                                  <div>{conference.info}</div>
                                <div className="mt-3"><b>Программа конференции:</b>{conference.infoprog}</div>
                                <div className="mt-3"><b>Секции и научные направления конференции:</b></div>
                                  <div className="mt-3"><b>Секции и научные направления конференции:</b>
                                    <ul>
                                        {conference.infosections && conference.infosections.split(',').map((direction, index) => (
                                            <li key={index}>{`${index + 1}. ${direction.trim()}`}</li>
                                        ))}
                                    </ul>
                                  </div>
                              </Col>
                              <Col style={{marginTop: "20px"}}>
                                  <div><b>Место проведения:</b></div>
                                <div>{conference.infoarea}</div>
                                <div style={{marginTop: "20px"}}><b>План мероприятия:</b></div>
                                <div>{conference.infoplan}</div>
                              </Col>
                                  <div style={{marginTop: "20px"}}><b>Участники и руководители направлений:</b></div>
                                  <Row style={{marginTop: "20px"}}>
                                    <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                        <div>Наименование секции</div>
                                    </Col>
                                      <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                        <div>Руководитель секции</div>
                                    </Col>
                                    <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                        <div>Контакты</div>
                                    </Col>
                                    <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                        <div>ФИО</div>
                                    </Col>
                                  </Row>
                                  {usersWithPresentations.map(user => {
                                      if(userInfo) {
                                          const userInfos = userInfo.find(info => info.email === user.authors);
                                          return (
                                              <Row key={user.id}>
                                                  <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                                      <div>{user.section}</div>
                                                  </Col>
                                                  <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                                      <div>{user.teacher}</div>
                                                  </Col>
                                                  <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                                      <div>{user.authors}</div>
                                                  </Col>
                                                  <Col style={{borderColor: "white", borderStyle: "solid"}}>
                                                      {userInfos.surname}{' '}
                                                      {userInfos.name && userInfos.name.charAt(0)}.
                                                      {userInfos.patronymic && userInfos.patronymic[0]}.
                                                  </Col>
                                              </Row>
                                          );
                                      }
                                })}
                            </Row>
                          </Row>
                        </Row>
                      </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default ConferenceInfo;