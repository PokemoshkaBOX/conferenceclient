import React, {useContext, useEffect, useState} from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CONFERENCEITEM_ROUTE } from "../../utils/consts";
import ConfReg from "./ConfReg";
import {getOneUserInfo} from "../../http/userAPI";
import {Context} from "../../index";

const ConferenceItem = ({ conference }) => {
  const history = useNavigate();
  const [showConfReg, setShowConfReg] = useState(false);
  const [stat, setStat] = useState();

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleConfRegShow = (role) => {
    setShowConfReg(true);
    setStat(role);
  };

  const handleConfRegHide = () => {
    setShowConfReg(false);
  };
  console.log(conference.info)
  return (
    <Col md={12} className="mt-3" bg="dark" data-bs-theme="dark">
      <Card border={"black"} style={{
        cursor: "pointer",
        shadowColor: "black",
        shadowOffset: { height: 5 },
        shadowOpacity: 0.5,
        padding: "20px",
        minHeight: "600px"
      }}>
        <Row>
          <Row md={12} onClick={() => history(CONFERENCEITEM_ROUTE + '/' + conference.id)}>
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
              <Col style={{minHeight: "400px",maxHeight: "400px", marginTop: "20px", overflowY: "auto"}} md={8}>
                <div><b>Описание:</b></div>
                <div>{ conference.info } </div>
              </Col>
              <Col style={{marginTop: "20px"}}>
                <div><b>Место проведения:</b></div>
                <div>ЯГТУ</div>
                <div style={{marginTop: "20px"}}><b>План мероприятия:</b></div>
                <div>ДОКИ</div>
              </Col>
            </Row>
          </Row>
          <Row md={12}>
            <Col md={6} style={{textAlign: "center", marginTop: "20px"}}>
              <Button onClick={() => handleConfRegShow('участник')}>Зарегистрироваться как участник</Button>
            </Col>
            <Col ms={6} style={{textAlign: "center", marginTop: "20px"}}>
              <Button onClick={() => handleConfRegShow('докладчик')}>Зарегистрироваться как докладчик</Button>
            </Col>
          </Row>
        </Row>
      </Card>
      <ConfReg show={showConfReg} onHide={handleConfRegHide} stat={stat} id={conference.id}/>
    </Col>
  );
};

export default ConferenceItem;
