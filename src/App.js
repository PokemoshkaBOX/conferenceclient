import React, {useContext, useEffect} from 'react'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import {observer} from "mobx-react";

import Footer from "./components/Footer";
import {Context} from "./index";
import {fetchConferences} from "./http/ConferenceAPI";
import {userInfo} from "./http/userAPI";

const App = observer(() => {
    const{user} = useContext(Context)
    const {conferences} = useContext(Context)
    useEffect(()=>{
        if(localStorage.getItem('token')){
            user.checkAuth()
        }
    }, [user])
    useEffect(() => {
        fetchConferences(conferences.SelectedName).then(data =>
            conferences.setConferences(data.rows))
    },[conferences])
    return (
    <BrowserRouter>
        <Navbar />
        <AppRouter/>
        <Footer/>
    </BrowserRouter>
  );
});

export default App;
