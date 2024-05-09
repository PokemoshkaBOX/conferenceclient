import React, {useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {CONFERENCE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const Confirmition = observer(() => {
    const {user} = useContext(Context)
    const history = useNavigate()
    if(user.user.email) {
        console.log(user.user.isActivated)
        if (user.user.isActivated === 'false') {
            return (
                <div>
                    Подтвердите почту {user.user.email}
                </div>
            );
        } else {
            user.setIsAuth(true)
            history(CONFERENCE_ROUTE)
        }
    }
});

export default Confirmition;