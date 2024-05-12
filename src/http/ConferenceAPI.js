import {$authHost, $host} from "./index";

export const fetchConferences = async (title) => {
    const {data} = await $authHost.get('api/conferences/conferences', {
        params:{
            title
        }
    })
    return data
}

export const fetchOneConference = async (id) => {
    const {data} = await $authHost.get('api/conferences/' + id)
    return data
}

export const fetchOneParticipant = async (id, user) => {
    const {data} = await $authHost.get('api/conferences/oneparticipant/' + id, {params:{user}})
    return data
}

export const updateUserStatus = async (selectedParticipantId, selectedStatus) => {
    const {data} = await $authHost.post('api/conferences/updateuserstatus', {
        params: {selectedParticipantId, selectedStatus}})
    return data
}
export const fetchUserConferences = async (id) => {
    const {data} = await $authHost.get('api/conferences/userconferences', {params: {id}})
    return data
}

export const createConference = async (conference) => {
    const {data} = await $authHost.post('api/conferences/createconference', conference)
    return data
}

export const updateConference = async (conference) => {
    const {data} = await $authHost.post('api/conferences/updateconference', conference)
    return data
}

export const deleteConference = async (id) => {
    const {data} = await $authHost.post('api/conferences/deleteconference', {params: {id}})
    return data
}

export const createArticle = async (formData) => {
    const {data} = await $authHost.post('api/conferences/addarticle', formData)
    return data
}