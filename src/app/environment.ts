import {stringConstant} from "./_helpers/string-constant";

export const environment = {
    mainURL: stringConstant.DEVELOPMENTmain,
    baseURL: stringConstant.DEVELOPMENT,
    //stage: stringConstant.PRODUCTION,
   // stage: stringConstant.LOCAL,
    stage: stringConstant.DEVELOPMENT,
    trackerbaseUrl: 'https://srv1.gpstracker.com.ng/api/',
    trackerToken: '6E7CDE7A4111E62059CA63A11EA1F47C',
    paystackToken: 'pk_test_ff65613b505d1340f0ad41ae8f4f4dd1646b94c4',
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
