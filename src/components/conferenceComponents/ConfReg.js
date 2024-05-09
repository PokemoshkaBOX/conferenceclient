import React, {useContext, useState} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {Context} from "../../index";
import {createArticle} from "../../http/ConferenceAPI";

const ConfReg = ({ show, onHide, stat, id}) => {
  const {user} = useContext(Context)
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [inst, setInst] = useState('');
  const [section, setSection] = useState('');
  const [teacher, setTeacher] = useState('');
  const handleSubmit = () => {
    addArticles()
    onHide();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Получение первого выбранного файла
    setFile(e.target.files[0])
    console.log('Выбранный файл:', file);
  };
  console.log(user.user.email)
  const addArticles = () => {
        const formData = new FormData()
        formData.append('id_conf', id)
        formData.append('user_id', user.user.id)
        formData.append('role', stat)
        formData.append('section', section)
        formData.append('teacher', teacher)
        formData.append('email', user.user.email)
        formData.append('title', title)
        formData.append('annotation', annotation)
        formData.append('inst', inst)
        formData.append('file', file)
        createArticle(formData).then(data => onHide())
    }

  return (
      <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
              <Modal.Title>Регистрация на конференцию в качестве {stat}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {stat === 'докладчик' &&
              <Form>
                  <Form.Group controlId="formTitle">
                      <Form.Label>Название статьи</Form.Label>
                      <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formAnnotation">
                      <Form.Label>Аннотация</Form.Label>
                      <Form.Control as="textarea" style={{minHeight: "200px"}} type="email" value={annotation}
                                    onChange={(e) => setAnnotation(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formSection">
                      <Form.Label>Секция</Form.Label>
                      <Form.Control as="textarea" onChange={(e) => setSection(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formTeacher">
                      <Form.Label>Преподаватель</Form.Label>
                      <Form.Control type="text" onChange={(e) => setTeacher(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formInstitut">
                      <Form.Label>Учреждение</Form.Label>
                      <Form.Control type="email" value={inst} onChange={(e) => setInst(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formArticle">
                      <Form.Label>Добавить статью</Form.Label>
                      <Form.Control type="file" onChange={(e) => handleFileChange(e)}/>
                  </Form.Group>
                  <div>Статус
                      <div style={{color: "green"}}>Новое</div>
                  </div>
              </Form>
              }
               {stat === 'участник' &&
                    <Form.Group controlId="formInstitut">
                      <Form.Label>Учреждение</Form.Label>
                      <Form.Control type="email" value={inst} onChange={(e) => setInst(e.target.value)}/>
                    </Form.Group>
               }
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>Отмена</Button>
              <Button variant="primary" onClick={handleSubmit}>Отправить</Button>
          </Modal.Footer>
      </Modal>
  )
};

export default ConfReg;
