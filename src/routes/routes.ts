import * as express from "express";

export default function setRoutes(app:any){

    const router = express();



    app.use("/api",router);

    //Routes

}