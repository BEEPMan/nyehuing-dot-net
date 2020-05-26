import express from "express";
import bodyParser from "body-parser";
import dbInit from './db';
import template from "./lib/template";
import BossInfo from "./db/BossInfo";
import axios from "axios";

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('../nyehuing-dot-net/build'));

app.get('/api/calculator', async (req, res) => {
    const boss = await BossInfo.findAll({
        order: [
            ['price', 'DESC']
        ]
    });
    console.log(boss);
    res.send(boss);
});

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: '../nyehuing-dot-net/build/' });
})