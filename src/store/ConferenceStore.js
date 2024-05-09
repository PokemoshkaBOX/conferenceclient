import {makeAutoObservable} from "mobx";
import {fetchUserConferences} from "../http/ConferenceAPI";

export default class ConferenceStore {
    constructor() {
        this._conferences = []
        this._articles = []
        this._userConferences = []
        this._selectedName = {}
        makeAutoObservable(this)
    }

    setUserConferences(userconferences){
        this._userConferences = userconferences
    }
    setConferences(conferences){
        this._conferences = conferences
    }

    setSelectedName(name){
        this._selectedName = name
    }
    setArticles(articles){
        this._articles = articles
    }
    get Conferences(){
        return this._conferences
    }

    get UserConferences(){
        return this._userConferences
    }

    get SelectedName(){
        return this._selectedName
    }

    get Articles(){
        return this._articles
    }

    fetchOneConference(conferences){
        this._conferences = conferences
    }

    async userConferences(id){
       try{
           const response = await fetchUserConferences(id);
           console.log("response",response)
           this.setUserConferences(response)
       }catch (e){
           console.log(e.response?.message)
       }
    }
}