import * as dotenv from "dotenv";
dotenv.config({ path: '../.env' });

import bodyParser from "body-parser";
import express from "express";
import { check } from 'express-validator';
import { sendEmail } from "./routes/email";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/email", [
    check('email.*').isLength({ min: 1 }).withMessage('Value required'),
    check('email.to').isEmail().withMessage('Enter a valid email address '),
    check('email.from').isEmail().withMessage('Enter a valid email address'),
], sendEmail);


// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));