import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import MainPage from "./pages/MainPage";
import ConferenceInfo from "./pages/ConferenceInfo";
import Lc from "./pages/LC";
import ConfReg from "./components/conferenceComponents/ConfReg";

import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    CONFERENCE_ROUTE,
    CONFERENCEITEM_ROUTE,
    LC_ROUTE, CONFREG_ROUT, CONFIRMITION_ROUTE, CONFERENCEITEMADMIN_ROUTE
} from "./utils/consts";
import Confirmition from "./pages/Confirmition";
import ConferenceInfoAdmin from "./pages/ConferenceInfoAdmin";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: CONFERENCE_ROUTE,
        Component: MainPage
    },
    {
        path: CONFERENCEITEM_ROUTE + '/:id',
        Component: ConferenceInfo
    },
    {
        path: LC_ROUTE,
        Component: Lc
    },
    {
        path: CONFREG_ROUT,
        Component: ConfReg
    },
    {
        path: CONFERENCEITEMADMIN_ROUTE + '/:id',
        Component: ConferenceInfoAdmin
    }
]

export  const publicRoutes =[

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: CONFIRMITION_ROUTE,
        Component: Confirmition
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]