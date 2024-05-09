import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {Context} from "../../index";
import CalendarRange from "../conferenceComponents/CalendarRange";
import TimeRange from "../conferenceComponents/TimeRange";
import {createConference, deleteConference, fetchConferences} from "../../http/ConferenceAPI";
const CreateConference = ({show, onHide}) => {
    const {conferences} = useContext(Context)
    const [chosenDateStart, setChosenDateStart] = useState('2024-03-12');
    const [chosenDateEnd, setChosenDateEnd] = useState('2024-03-20');
    const [title, setTitle] = useState('')
    const [info, setInfo] = useState("")
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('18:00');
    const [infoArea, setInfoArea] = useState("")
    const [infoPlan, setInfoPlan] = useState("")
    const [infoProg, setInfoProg] = useState("")
    const [infoSections, setInfoSections] = useState("")
    const [infoPurposes, setInfoPurposes] = useState("")
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

    const addConference = () => {
        const formData = new FormData()
        const combinedStart = `${chosenDateStart}T${startTime}`;
        const combinedEnd = `${chosenDateEnd}T${endTime}`;
        formData.append('title', title)
        formData.append('date_begin', combinedStart)
        formData.append('date_end', combinedEnd)
        formData.append('info', info)
        formData.append('infoarea', infoArea)
        formData.append('infoplan', infoPlan)
        formData.append('infoprog', infoProg)
        formData.append('infosections', infoSections)
        formData.append('infopurposes', infoPurposes)
        createConference(formData).then(data =>
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
            onHide = {onHide}
            size="lg"
            centered
        >
             <Modal.Header closeButton>
                 <Modal.Title id="contained-modal-title-vcenter">
                     Создание конференции
                 </Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <Form>
                     <Form.Control
                         value={title}
                         onChange={e => setTitle(e.target.value)}
                         className="mt-3"
                         placeholder ="Введите название конференции"
                     />
                     <div style={{marginTop: "20px"}}></div>

                     <Form.Control
                         as="textarea"
                         value={info}
                         onChange={e => setInfo(e.target.value)}
                         className="mt-3"
                         placeholder ="Введите описание конференции"
                         style={{minHeight: "200px"}}
                     />
                     <Form.Control
                         value={infoArea}
                         onChange={e => setInfoArea(e.target.value)}
                         className="mt-3"
                         placeholder ="Место проведения"
                     />
                     <Form.Control
                         as="textarea"
                         value={infoPlan}
                         onChange={e => setInfoPlan(e.target.value)}
                         className="mt-3"
                         placeholder ="План мероприятия"
                         style={{minHeight: "200px"}}
                     />
                     <Form.Control
                         as="textarea"
                         value={infoProg}
                         onChange={e => setInfoProg(e.target.value)}
                         className="mt-3"
                         placeholder ="Программа конференции"
                         style={{minHeight: "200px"}}
                     />
                     <Form.Control
                         as="textarea"
                         value={infoPurposes}
                         onChange={e => setInfoPurposes(e.target.value)}
                         className="mt-3"
                         placeholder ="Цели конференции"
                         style={{minHeight: "200px"}}
                     />
                     <Form.Control
                         as="textarea"
                         value={infoSections}
                         onChange={e => setInfoSections(e.target.value)}
                         className="mt-3"
                         placeholder ="Секнции и научные направления конференции"
                         style={{minHeight: "200px"}}
                     />
                     <div style={{marginTop: "20px"}}></div>

                     <CalendarRange onDateRangeChange={handleDateRangeChange}/>
                     <div>Дата начала: {chosenDateStart}</div>
                     <div>Дата окончания: {chosenDateEnd}</div>
                     <div style={{marginTop: "20px"}}></div>

                     <TimeRange onTimeRangeChange={handleTimeRangeChange}/>
                 </Form>
             </Modal.Body>
             <Modal.Footer>
                 <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                 <Button variant="outline-success" onClick={addConference}>Добавить</Button>
             </Modal.Footer>
        </Modal>
    );
};

export default CreateConference;