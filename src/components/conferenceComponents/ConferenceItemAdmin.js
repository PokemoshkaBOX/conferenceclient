import React, {useContext, useState} from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {CONFERENCEITEMADMIN_ROUTE} from "../../utils/consts";
import EditConference from "../models/EditConference"; // Импорт компонента для редактирования конференции
import {deleteConference, fetchConferences} from "../../http/ConferenceAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../../index"; // Предполагается, что у вас есть функция для удаления конференции

const ConferenceItemAdmin = observer(({ conference }) => {
  const {conferences} = useContext(Context)
  const history = useNavigate();
  const [showEditConference, setShowEditConference] = useState(false); // Состояние для отслеживания видимости компонента для редактирования конференции

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleEditConferenceShow = () => {
    setShowEditConference(true); // Показать компонент для редактирования конференции
  };

  const handleEditConferenceHide = () => {
    setShowEditConference(false); // Скрыть компонент для редактирования конференции
  };

  const handleDeleteConference = async () => {
    try {
      console.log(conference.id)
      const id = conference.id;
      await deleteConference(id); // Вызов функции удаления конференции с передачей идентификатора конференции
      await fetchConferences().then(data =>
          conferences.setConferences(data.rows)
      );
      console.log("Конференция успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении конференции:", error);
    }
  };

  return (
    <Col md={12} className="mt-3" bg="dark" data-bs-theme="dark">
      <Card border={"black"} style={{
        cursor: "pointer",
        shadowColor: "black",
        shadowOffset: { height: 5 },
        shadowOpacity: 0.5,
        padding: "20px",
      }}>
        <Row>
          <Col md={6} onClick={() => history(CONFERENCEITEMADMIN_ROUTE + '/' + conference.id)}>
            <div style={{ fontSize: 20 }}>{conference.title}</div>
            <div>Дата начала: {formatDate(conference.date_begin)}</div>
            <div>Время начала: {formatTime(conference.date_begin)}</div>
            <div>Дата окончания: {formatDate(conference.date_end)}</div>
            <div>Время окончания: {formatTime(conference.date_end)}</div>
          </Col>
          <Col md={6}>
            <Row>
              <Button onClick={handleEditConferenceShow}>Редактировать</Button> {/* Нажатие на кнопку вызывает показ компонента для редактирования */}
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Button class="btn btn-danger" onClick={handleDeleteConference}>Удалить</Button> {/* Нажатие на кнопку вызывает функцию удаления конференции */}
            </Row>
          </Col>
        </Row>
      </Card>
      {showEditConference && ( // Отображение компонента для редактирования, если showEditConference равно true
        <EditConference show={showEditConference} onHide={handleEditConferenceHide} conference={conference} />
      )}
    </Col>
  );
});

export default ConferenceItemAdmin;
