/*import {Request, Response} from "express";
import * as express from 'express';
// const bodyParser = require('body-parser');
import * as bodyParser from "../../node_modules/body-parser";
// const cookieParser = require('cookie-parser');
import * as jwt from 'jsonwebtoken';
// import * as fs from 'fs';
// import { Application } from "../../node_modules

const app = express();

// const bodyParser = new BodyParser;
app.use(bodyParser.json());
app.route('/api/login')
    .post(loginRoute);

    app.route('/api/test').get(testRoute);
// const RSA_PRIVATE_KEY = fs.readFileSync('./login/private.key');
export function testRoute(req: Request, res: Response){
    res.send("Hello!");
}
export function loginRoute(req: Request, res: Response) {

    const email = req.body.email,
    password = req.body.password;

    if (true) { // validation for email and password
    //  const userId = findUserIdForEmail(email);
    const userId = "11124040503";

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                algorithm: 'RS256',
                expiresIn: 120,
                subject: userId
        });
        res.send(jwtBearerToken);
        // send the JWT back to the user
        // TODO - multiple options available                              
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401); 
    }
}*/