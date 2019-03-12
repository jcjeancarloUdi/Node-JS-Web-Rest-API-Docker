export default class ConfigClass{
    constructor(){

    }

    static getUrlApi(){
        this.urlApi = "http://localhost:3000";
        return this.urlApi;
    }

    static getPort(){
        return 3000;
    }

    static getConnStr(){
        //"Server=db1.internal.prod.myteste.com;Database=db1;User Id=sa;Password=myteste2019;";
        return "Server=10.100.0.24;Database=db1;User Id=usr_app;Password=usr_app;";
    }    
}