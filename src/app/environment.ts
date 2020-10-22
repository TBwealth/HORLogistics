import {stringConstant} from "./_helpers/string-constant";

export const environment = {
    mainURL: stringConstant.DEVELOPMENTmain,
    baseURL: stringConstant.DEVELOPMENT,
    //stage: stringConstant.PRODUCTION,
    stage: stringConstant.LOCAL,
    //stage: stringConstant.DEVELOPMENT,
    
    firebase: {
        apiKey: "AIzaSyBJyA8vPhvcYOqTb8BpGAYHNDAEHxSqaGg",
        authDomain: "hor-logistics.firebaseapp.com",
        databaseURL: "https://hor-logistics.firebaseio.com",
        projectId: "hor-logistics",
        storageBucket: "hor-logistics.appspot.com",
        messagingSenderId: "364350750552",
        appId: "1:364350750552:android:7996476ec5595a47016f2d",
        measurementId: "G-R6GKW7KSN8"
      },
};
