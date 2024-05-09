import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {CONFERENCE_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react";

const AppRouter =  observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component})=>
                <Route key = {path} path={path}  Component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component})=>
                <Route key = {path} path={path}  Component={Component} exact/>
            )}
        </Routes>
    );
});

export default AppRouter;