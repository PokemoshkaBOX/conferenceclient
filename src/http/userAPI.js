import {$authHost, $host} from "./index";
export const registration = async (email, password, name, surname, patronymic) =>{
    const {data} = await $host.post('api/user/registration', {email, password, name, surname, patronymic})
    localStorage.setItem('token', data.refreshToken)
    return data
}

export const login = async (email, password) =>{
    const {data} = await $host.post('api/user/login', {email, password})
    console.log(data)
    localStorage.setItem('token', data.refreshToken)
    return data
}

export const check = async () =>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.refreshToken)
    return data
}

export const logOut = async () =>{
    await $authHost.post('api/user/logout')
}

export const checkAuth = async () =>{
    const {data} = await $authHost.get('api/user/refresh')
    return data
}

export const userInfo = async(id)=>{
    const {data} = await $authHost.get('api/user/userinfo', {params: {id}})
    return data
}

export const getAllUsers = async(email)=>{
    const {data} = await $authHost.get('api/user/getallusers', {params: {email}})
    return data
}

export const editUser = async(id, email, role)=>{
    const {data} = await $authHost.get('api/user/edituser', {params: {id, email, role}})
    return data
}

export const fetchUsersInConference = async(id)=>{
    const {data} = await $authHost.get('api/user/conferenceuser', {params: {id}})
    return data
}

export const fetchRole = async (id, userId) => {
    const {data} = await $authHost.get('api/user/aaarole', {params: {id, userId}})
    return data
}

export const fetchOneArticle = async (userId, conferenceId) => {
    const {data} = await $authHost.get('api/user/onearticle', {params:{userId, conferenceId}})
    return data
}

export const sendArticleForReview = async (userId, conferenceId) => {
    const {data} = await $authHost.post('api/user/sendarticle', userId, conferenceId)
    return data
}

export const uploadCorrectedArticle = async (formData) => {
    const {data} = await $authHost.post('api/user/addarticle', formData)
    return data
}
export const uploadTeacherArticle = async (formData) => {
    const {data} = await $authHost.post('api/user/teacherarticle', formData)
    return data
}

export const getOneUserInfo = async (id) => {
    const {data} = await $authHost.get('api/user/getoneuserinfo', {params:{id}})
    return data
}

export const getOneUserInfoFromConference = async (id) => {
    const {data} = await $authHost.get('api/user/getoneuserinfofromconference', {params: {id}})
    return data
}