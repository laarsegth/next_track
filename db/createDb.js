import {connect} from './connect.js';
import upload from 'pg-upload';

const db = await connect();
const timestamp = (await db.query('select now() as timestamp')).rows[0]['timestamp'];
console.log(`Recreating database on ${timestamp}...`);

await db.query('drop table if exists tracks');
await db.query('drop table if exists albums');
await db.query('drop table if exists genres');
await db.query('drop table if exists users');
await db.query('drop table if exists artists');

await db.query(`
    create table artists (
        artist_id          integer primary key,
        stage_name         text,
        nationality        char(2)
    )
`);

await db.query(`
    create table albums (
        album_id           integer primary key,
        artist_id          integer references artists(artist_id),
        release_date       date,
        title              text,
        riaa_certificate   text

    )
`);

await db.query(`
    create table tracks (
        track_id          integer primary key,
        album_id          integer references albums(album_id),
        media_type_id     integer,
        genre_id          integer references genres(genre_id),
        milliseconds      integer,
        bytes             bigint,
        unit_price        numeric (10, 2),
        title             text
    )
`);

await db.query(`
    create table genres (
        genre_id          integer primary key,
        name              text,
        description       text
    )
`);

await db.query(`
    create table users (
        user_id           integer primary key,
        signed_up         timestamp,
        active            boolean,
        screen_name       text,
        email             text    
    )
`);


await upload(db, 'db/artists.csv',`
    copy artists (artist_id, stage_name, nationality)
    from stdin
    with csv encoding 'UTF-8'  
     `);

await upload(db, 'db/albums.csv',`
    copy albums (album_id, title, artist_id, release_date, riaa_certificate)
    from stdin
    with csv header encoding 'UTF-8'
`);


await upload (db, 'db/tracks.csv',`
    copy tracks (track_id, title, album_id, media_type_id, genre_id, milliseconds, bytes, unit_price)
    from stdin
    with csv header encoding 'win-1252'
`);

await upload (db, 'db/genres.csv',`
   copy genres (name, genre_id, description)
   from stdin
   with csv encoding 'UTF-8' 
`);

await upload (db, 'db/users.csv',`
    copy users (user_id, screen_name, email, active, signed_up)
    from stdin
    with csv encoding 'UTF-8'
`);



await db.end();
console.log('Database successfully recreated.');
