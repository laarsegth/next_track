import express from 'express';
import { pool } from '../db/connect.js';

const db = pool();

const port = 3009;
const server = express();

server.use(express.static('frontend'));
server.use('/images', express.static('images'));
server.use(onEachRequest);
server.listen(port, onServerReady);


server.get('/api/nexttrack/:genre_id', onGetNextTrack);
server.get('/api/udforsk', onGetNextTrackUdforsk);


    async function onGetNextTrack(request, response) {
        const genre_id = request.params.genre_id;
        const result = await db.query(`
            select 
                t.track_id,
                t.title as track,
                ar.stage_name as artist,
                a.title as album
            from tracks t
            join albums a
                on t.album_id = a.album_id
            join artists ar
                on a.artist_id = ar.artist_id
            where t.genre_id = $1
            order by random()
            limit 1`,
        [genre_id])
        
        response.json(result.rows[0]);
    }
 
        async function onGetNextTrackUdforsk(request, response) {
        const result = await db.query(`
            select 
                t.track_id,
                t.title as track,
                ar.stage_name as artist,
                a.title as album,
                g.name as genre
            from tracks t
            join albums a
                on t.album_id = a.album_id
            join artists ar
                on a.artist_id = ar.artist_id
            join genres g
                on t.genre_id = g.genre_id
            order by random()
            limit 1`)
        
        response.json(result.rows[0]);
    }












function onEachRequest(request, response, next) {
    console.log(new Date(), request.method, request.url);
    next();
}
function onServerReady() {
    console.log('Webserver running on port', port);
}