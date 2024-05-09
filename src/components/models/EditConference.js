import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import CalendarRange from "../conferenceComponents/CalendarRange";
import TimeRange from "../conferenceComponents/TimeRange";
import {createConference, fetchConferences, updateConference} from "../../http/ConferenceAPI";
import {Context} from "../../index"; // Предполагается, что у вас есть функция для обновления конференции

const EditConference = ({ show, onHide, conference }) => {
    const {conferences} = useContext(Context)
    const [title, setTitle] = useState(conference.title || '');
    const [info, setInfo] = useState(conference.info || '');


    const [chosenDateStart, setChosenDateStart] = useState(conference.date_begin ? conference.date_begin.split('T')[0] : '');
    const [chosenDateEnd, setChosenDateEnd] = useState(conference.date_end ? conference.date_end.split('T')[0] : '');
    const [startTime, setStartTime] = useState(conference.date_begin ? conference.date_begin.split('T')[1].slice(0, 5) : '09:00');
    const [endTime, setEndTime] = useState(conference.date_end ? conference.date_end.split('T')[1].slice(0, 5) : '18:00');

     const handleTimeRangeChange = (start, end) => {
        setStartTime(start);
        setEndTime(end);
    };
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleDateRangeChange = (range) => {
        const formattedDateStart = getFormattedDate(range.startDate);
        const formattedDateEnd = getFormattedDate(range.endDate);
        setChosenDateStart(formattedDateStart);
        setChosenDateEnd(formattedDateEnd);
    };
    const updateConferenceData = () => {
        const formData = new FormData()
        const combinedStart = `${chosenDateStart}T${startTime}`;
        const combinedEnd = `${chosenDateEnd}T${endTime}`;
        formData.append('id', conference.id)
        formData.append('title', title)
        formData.append('date_begin', combinedStart)
        formData.append('date_end', combinedEnd)
        formData.append('info', info)
        updateConference(formData).then(data =>
            Reload(),
            onHide()
        )
    }

    const Reload = async ()=> {
        await fetchConferences().then(data =>
            conferences.setConferences(data.rows)
    );}
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактирование конференции
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название конференции"
                    />
                    <div style={{ marginTop: "20px" }}></div>

                    <Form.Control
                        as="textarea"
                        value={info}
                        onChange={e => setInfo(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание конференции"
                        style={{ minHeight: "200px", whiteSpace: "pre-wrap"}}
                    />
                    <div style={{ marginTop: "20px" }}></div>

                    <CalendarRange onDateRangeChange={handleDateRangeChange} />
                    <div>Дата начала: {chosenDateStart}</div>
                    <div>Дата окончания: {chosenDateEnd}</div>
                    <div style={{ marginTop: "20px" }}></div>

                    <TimeRange onTimeRangeChange={handleTimeRangeChange} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={updateConferenceData}>Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditConference;
