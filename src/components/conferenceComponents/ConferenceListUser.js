import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {Row} from "react-bootstrap";
import {Context} from "../../index";
import ConferenceItemUser from "./ConferenceItemUser";
import {fetchRole, fetchUsersInConference} from "../../http/userAPI";
import {useParams} from "react-router-dom";
import {fetchOneConference} from "../../http/ConferenceAPI";

const ConferenceListUser = observer(() => {
    const {conferences, user} = useContext(Context)
    const [roles, setRoles] = useState([]);

    if(conferences.UserConferences) {
        useEffect(() => {
            const fetchRoles = async () => {
                try {
                    const rolesData = await Promise.all(
                        conferences.UserConferences.map(conference =>
                            fetchRole(conference.id, user.user.id)
                        )
                    );

                    // Создаем объект для хранения ролей с ключами-идентификаторами конференций
                    const rolesObject = {};
                    rolesData.forEach((role, index) => {
                        rolesObject[conferences.UserConferences[index].id] = role;
                    });

                    // Устанавливаем роли из объекта в state
                    setRoles(rolesObject);
                } catch (error) {
                    console.error('Ошибка при загрузке ролей:', error);
                }
            };

            fetchRoles();
        }, [conferences.UserConferences, user.user.id]);

    return (
        <Row className="d-flex" md={12} style={{
            borderRadius: 10,
            margin: 10,
        }}>
            {conferences.UserConferences.map((conference, index) =>
                 <ConferenceItemUser key={conference.id} conference={conference} role={roles[conference.id]} conferenceId={conference.id}/>
            )}
        </Row>
    );
    }
});

export default ConferenceListUser;