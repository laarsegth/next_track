import { connect } from './connect.js';

const db = await connect();
const timestamp = (await db.query('select now() as timestamp')).rows[0]['timestamp'];
console.log(`Recreating database on ${timestamp}...`);

await db.query('drop table if exists artists');
await db.query('drop table if exists albums');
await db.query('drop table if exists tracks');
// TODO: drop more tables, if they exist

await db.query(`
    create table artists (
        artist_id   integer,
        stage_name  text,
        nationality char(2)
    )
`);
await db.query(`
    create table albums (
        album_id         integer,
        artist_id        integer,
        release_date     date,
        title            text
    )
`);

await db.query(`
    create table tracks (
        track_id      integer,
        album_id      integer,
        media_type_id integer,
        genre_id      integer,
        milliseconds  integer,
        bytes         bigint,
        unit_price    numeric(10, 2),
        title         text
    )
`);
// TODO: create more tables

// TODO: import data from csv files into tables

await db.end();
console.log('Database successfully recreated.');