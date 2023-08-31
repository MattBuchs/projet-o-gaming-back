import { faker } from '@faker-js/faker';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
    host: 'localhost',
    database: 'o-gaming',
});

client.connect((error) => {
    if (error) {
        console.log('Error in seeding with the database connection', error);
    } else {
        console.log('pg in seeding.js: successfully connected to the database');
    }
    console.log('STARTING TABLE SEEDING');
});

async function accessDatabase(query, values) {
    try {
        await client.query(query, values);
    } catch (err) {
        console.error(err);
    }
}

const NumberOfFakeEntries = 10;
const NumberOfTagsAndCategories = 3;

/* TABLE SEEDING */

// TAG seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomName = faker.word.noun();
    // insert data into database
    const query = 'INSERT INTO tag(title) VALUES($1);';
    const values = [randomName];
    await accessDatabase(query, values);
}

// PLATFORM seeding --------------------------------
const consoles = [
    'PlayStation 2',
    'Nintendo DS',
    'Nintendo Switch',
    'Game Boy',
    'PlayStation 4',
    'PlayStation ',
    'PlayStation 3',
    'Xbox 360',
    'Game Boy',
    'PlayStation Portable',
    'Xbox One',
    'PlayStation 5',
    'Nintendo 64',
    'Sega Genesis',
    'Atari 2600',
];

for (let i = 0; i < consoles.length; i += 1) {
    // insert data into database
    const query = 'INSERT INTO platform(name) VALUES($1);';
    const values = [consoles[i]];
    await accessDatabase(query, values);
}

// ROLE seeding --------------------------------
// insert data into database
try {
    await client.query(
        "INSERT INTO role(name) VALUES('developer');",
    );
    await client.query(
        "INSERT INTO role(name) VALUES('player');",
    );
} catch (err) {
    console.error(err);
}

// CATEGORY seeding --------------------------------
const categories = [
    'Action',
    'Adventure',
    'Casual',
    'Racing',
    'Independent',
    'Massive Multiplayer',
    'RPG',
    'Simulation',
    'Sport',
    'Strategy',
];
const numberOfCategories = categories.length;
for (let i = 0; i < numberOfCategories; i += 1) {
    // faker data
    const randomColor = faker.color.rgb();
    // insert data into database
    const query = 'INSERT INTO "category" (name, color) VALUES($1, $2);';
    const values = [categories[i], randomColor];
    await accessDatabase(query, values);
}

// USER seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomName = faker.internet.userName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const randomAvatar = faker.internet.url();
    let roleID;
    if (i < 3) { // fist three users are devs
        roleID = 1;
    } else roleID = 2; // else they are players
    // insert data into database
    const query = 'INSERT INTO "user" (username, email, password, avatar, role_id) VALUES($1, $2, $3, $4, $5);';
    const values = [randomName, randomEmail, randomPassword, randomAvatar, roleID];
    await accessDatabase(query, values);
}

// GAME seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    let randomName = faker.internet.domainWord();
    randomName = randomName[0].toUpperCase() + randomName.substring(1); // capitlize first letter
    const randomDescripion = faker.lorem.paragraph({ min: 3, max: 6 });
    const randomPictureUrl = faker.internet.url();
    const randomExternalLink = faker.internet.url();
    const randomReleaseDate = faker.date.past();
    let devID;
    if (i <= 3) devID = 1; // first 5 devID will be 1
    else devID = 2; // last 5 devID will be 2
    // insert data into database
    const query = 'INSERT INTO game(name, description, picture, external_link, release_date, user_id) VALUES($1, $2, $3, $4, $5, $6);';
    const values = [
        randomName,
        randomDescripion,
        randomPictureUrl,
        randomExternalLink,
        randomReleaseDate,
        devID,
    ];
    await accessDatabase(query, values);
}

// SUGGESTION seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomTitle = faker.lorem.lines(1);
    const randomDescription = faker.lorem.paragraph({ min: 2, max: 15 });
    const randomPublishDate = faker.date.past({ years: 10 }); // date within the last ten years
    const randomGameID = i + 1;
    let randomUserID;
    if (i <= 3) { // a number between 4-10 these corruspond to players
        randomUserID = i + 3;
    } else {
        randomUserID = i;
    }
    // insert data into database
    const query = 'INSERT INTO "suggestion" (title, description, published_at, user_id, game_id) VALUES($1, $2, $3, $4, $5);';
    const values = [randomTitle, randomDescription, randomPublishDate, randomUserID, randomGameID];
    await accessDatabase(query, values);
}

// ISSUE seeding --------------------------------
const statuses = ['read', 'accepted', 'duplicate', 'working on it', 'refused', 'fixed'];

for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomTitle = faker.lorem.lines(1);
    const randomDescription = faker.lorem.paragraph({ min: 2, max: 10 });
    // this will prevent going out of bounds of the status array
    const statusNumber = i % statuses.length;
    const randomStatus = statuses[statusNumber];
    const assignedToEmail = faker.internet.email();
    let isMinorImportanceBool;
    let randomOnlineStat;
    let randomFrequency;
    let isPublic;
    if (i % 2 === 0) { // evens are true
        isMinorImportanceBool = true;
        randomOnlineStat = true;
        isPublic = true;
        randomFrequency = 'Sometimes';
    } else { // evens are false
        isMinorImportanceBool = false;
        randomOnlineStat = false;
        isPublic = false;
        randomFrequency = 'Always';
    }
    const randomReplication = faker.lorem.paragraph({ min: 1, max: 2 });
    const randomPublishDate = faker.date.past({ years: 10 }); // date within the last ten years
    let randomUserID;
    if (i <= 3) { // a number between 4-10 these corruspond to players
        randomUserID = i + 3;
    } else {
        randomUserID = i;
    }
    const randomGameID = i + 1;
    const randomPlatformID = i + 1;
    // insert data into database
    const query = 'INSERT INTO "issue" (title, description, status, is_minor, assign_to, is_public, is_online, frequency, replication, published_at, user_id, game_id, platform_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);';
    const values = [
        randomTitle,
        randomDescription,
        randomStatus,
        isMinorImportanceBool,
        assignedToEmail,
        isPublic,
        randomOnlineStat,
        randomFrequency,
        randomReplication,
        randomPublishDate,
        randomUserID,
        randomGameID,
        randomPlatformID,
    ];
    await accessDatabase(query, values);
}

// COMMENT seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomDescription = faker.lorem.lines({ min: 1, max: 5 });
    const devID = (i % 3) + 1; // this will only use the first three users who are devs
    const randomIssueID = i + 1;
    // insert data into database
    const query = 'INSERT INTO "comment" (description, user_id, issue_id) VALUES($1, $2, $3);';
    const values = [randomDescription, devID, randomIssueID];
    await accessDatabase(query, values);
}

/* LINK TABLE SEEDING */
console.log('STARTING LINK TABLE SEEDING');

// CATEGORY_HAS_GAME seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    const randomGameID = i + 1;
    for (let j = 0; j < NumberOfTagsAndCategories; j += 1) {
        /* data */
        // number between 0 and numberOfCategories-1 eg: 0 1 2, 1 2 3, 2 3 4, ...
        const numberBetween = (j + i) % numberOfCategories;
        // +1 to make it the number between 1 and numberOfCategories eg: 1 2 3, 2 3 4, 3 4 5 ...
        const randomCategoryID = (numberBetween) + 1;

        /* insert data into database */
        const query = 'INSERT INTO "category_has_game" (category_id, game_id) VALUES ($1, $2)';
        const values = [randomCategoryID, randomGameID];
        await accessDatabase(query, values);
    }
}

// GAME_HAS_TAG seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    const randomGameID = i + 1;
    for (let j = 0; j < NumberOfTagsAndCategories; j += 1) {
        /* data */
        // number between 0 and NumberOfFakeEntries-1 eg: 0 1 2, 1 2 3, 2 3 4, ...
        const numberBetween = (j + i) % NumberOfFakeEntries;
        // +1 to make it the number between 1 and NumberOfFakeEntries eg: 1 2 3, 2 3 4, 3 4 5 ...
        const randomTagID = (numberBetween) + 1;

        /* insert data into database */
        const query = 'INSERT INTO "game_has_tag" (game_id, tag_id) VALUES ($1, $2)';
        const values = [randomGameID, randomTagID];
        await accessDatabase(query, values);
    }
}

// ISSUE_HAS_TAG seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    const randomIssueID = i + 1;
    for (let j = 0; j < NumberOfTagsAndCategories; j += 1) {
        /* data */
        // number between 0 and NumberOfFakeEntries-1 eg: 0 1 2, 1 2 3, 2 3 4, ...
        const numberBetween = (j + i) % NumberOfFakeEntries;
        // +1 to make it the number between 1 and NumberOfFakeEntries eg: 1 2 3, 2 3 4, 3 4 5 ...
        const randomTagID = (numberBetween) + 1;

        /* insert data into database */
        const query = 'INSERT INTO "issue_has_tag" (issue_id, tag_id) VALUES ($1, $2)';
        const values = [randomIssueID, randomTagID];
        await accessDatabase(query, values);
    }
}

await client.end();
