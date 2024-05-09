import {makeAutoObservable} from "mobx";
import {login, registration, logOut, checkAuth, userInfo} from "../http/userAPI"
import {LOGIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
export default class UserStore{

    constructor() {
        this._isAuth = false
        this._user = {}
        this._userinfo = {}
        this._users = []
        this._selectedUser = {}
        this._isActivated = false
        makeAutoObservable(this)
    }
    setIsActivated(isActivated){
        this._isActivated = isActivated
    }
    setSelectedUsers(users){
        this._selectedUser = users
    }
    setUsers(users){
        this._users = users
    }
    setUserInfo(userInfo){
        this._userinfo = userInfo
    }
    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    get selectedUser(){
        return this._selectedUser
    }

    get isActivated(){
        return this._isActivated
    }
    get Users() {
        return this._users
    }
    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }

    get userInfo(){
        return this._userinfo
    }

    async userInfos(id){
       try{
           const response = await userInfo(id);
           this.setUserInfo(response)
       }catch (e){
           console.log(e.response?.message)
       }
    }
    async Logout() {
        try {
            const response = await logOut();
            localStorage.removeItem('token')
            this.setIsAuth(false)
            this.setUser({});
        } catch (e) {
            console.log(e.response?.message)
        }
    }

    async Login(email, password) {
        try {
            const response = await login(email, password);
            if(response.user.isActivated === 'false'){
                this.setUser(response.user);
            }
            else {
                localStorage.setItem('token', response.accessToken)
                this.setIsAuth(true)
                this.setUser(response.user);
            }
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async Registration(email, password, name, surname, patronymic) {
        try {
            const response = await registration(email, password, name, surname, patronymic);
            localStorage.setItem('token', response.accessToken)
            console.log(response.user)
            this.setUser(response.user)
        } catch (e) {
            console.log(e.response?.message)
        }
    }

    async checkAuth(){
        try{
            const response = await checkAuth()
            localStorage.setItem('token', response.accessToken)
            this.setIsAuth(true)
            this.setUser(response.user)
        }
        catch (e){
            console.log(e.response?.message)
        }

    }
}