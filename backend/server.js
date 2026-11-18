import express from 'express';
import { pool } from '../db/connect.js';

const db = pool();

const port = 3009;
const server = express();
















function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}
function onServerReady() {
    console.log('Webserver running on port', port);
}