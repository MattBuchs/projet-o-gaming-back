import { faker } from '@faker-js/faker';
// import pkg from 'pg';
const {Client} = require('pg');
import * as datamappers from '../app/models/index.datamapper.js';

// const { Client } = pkg;

console.log("step 1");
const client = new Client({
    host: 'localhost',
    database: 'o-gaming',
});

console.log("step 2");

await client.connect((error) => {
    console.log("step 2.5");
    if (error) {
        console.log('Error in faker with the database connection');
    } else {
        console.log('Faker: successfully connected to the database');
    }
});

// client.query(
//     "INSERT INTO tag(title) VALUES('$1');",
//     [tagName],
// );

// const NumberOfFakeEntries = 10;

// function createTag() {
//     const tag = {};
//     tag.title = faker.word.noun();
//     return tag;
// }

// datamappers.tagDatamapper.create(createTag());


// const tags = ['rpg'];

// function seedtag() {
//     for (let i = 0; i < NumberOfFakeEntries; i += 1) {
//         const tagName = faker.word.noun();
//         client.query(
//             "INSERT INTO tag (title) VALUES($1);",
//             [tagName],
//         );
//     }
// }
// async function seedTags() {
//     await client.query(
//         'INSERT INTO tag(title) VALUE ($1)', 
//         tags[i]
//     );
// }


console.log("step 3");
client.end();
