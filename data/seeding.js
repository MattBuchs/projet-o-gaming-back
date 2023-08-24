import { faker } from '@faker-js/faker';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
    host: 'localhost',
    database: 'o-gaming',
});
// await client.connect();
client.connect((error) => {
    if (error) {
        console.log('Error in seeding with the database connection', error);
    } else {
        console.log('pg in seeding.js: successfully connected to the database');
    }
});

const NumberOfFakeEntries = 10;

// TAG seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomName = faker.word.noun();
    // insert data into database
    try {
        await client.query(
            'INSERT INTO tag(title) VALUES($1);',
            [randomName],
        );
    } catch (err) {
        console.error(err);
    }
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

for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // insert data into database
    try {
        await client.query(
            'INSERT INTO platform(name) VALUES($1);',
            [consoles[i]],
        );
    } catch (err) {
        console.error(err);
    }
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
// mot de passe pour le wifi 64PTKTKE 

// CATEGORY seeding --------------------------------
const categories = ['FPS', 'Survial', 'RPG', 'Turn-based']
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomName = faker.word.noun();
    const randomColor = faker.color.rgb();
    // insert data into database
    try {
        await client.query(
            'INSERT INTO "category" (name, color) VALUES($1, $2);',
            [randomName, randomColor],
        );
    } catch (err) {
        console.error(err);
    }
}

// USER seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomName = faker.internet.userName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const randomAvatar = faker.internet.url();
    let roleID;
    // fist three users are devs
    if (i < 3) {
        roleID = 1;
    } else roleID = 2; // else they are players
    // insert data into database
    try {
        await client.query(
            'INSERT INTO "user" (username, email, password, avatar, role_id) VALUES($1, $2, $3, $4, $5);',
            [randomName, randomEmail, randomPassword, randomAvatar, roleID],
        );
    } catch (err) {
        console.error(err);
    }
}

// GAME seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    let randomName = faker.internet.domainWord();
    // capitlize the first letter
    randomName = randomName[0].toUpperCase() + randomName.substring(1);
    const randomDescripion = faker.lorem.paragraph({ min: 3, max: 6 });
    const randomPictureUrl = faker.internet.url();
    const randomExternalLink = faker.internet.url();
    const randomReleaseDate = faker.date.past();
    let devID;
    if (i <= 3) devID = 1; // first 5 devID will be 1
    else devID = 2; // last 5 devID will be 2

    // insert data into database
    try {
        await client.query(
            'INSERT INTO game(name, description, picture, external_link, release_date, user_id) VALUES($1, $2, $3, $4, $5, $6);',
            [randomName, randomDescripion, randomPictureUrl, randomExternalLink, randomReleaseDate, devID],
        );
    } catch (err) {
        console.error(err);
    }
}
const statuses = [
    'read', 'accepted', 'duplicate', 'working on it', 'refused', 'fixed',
];

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
    try {
        await client.query(query, values);
    } catch (err) {
        console.error(err);
    }
}

// ISSUE seeding --------------------------------
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomTitle = faker.lorem.lines(1);
    const randomDescription = faker.lorem.paragraph({ min: 2, max: 10 });
    // this will prevent going out of bounds of the status array
    const statusNumber = i % statuses.length;
    const randomStatus = statuses[statusNumber];

    let isMinorImportanceBool;
    const assignedToEmail = faker.internet.email();
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
    const values = [randomTitle, randomDescription, randomStatus, isMinorImportanceBool, assignedToEmail, isPublic, randomOnlineStat, randomFrequency, randomReplication, randomPublishDate, randomUserID, randomGameID, randomPlatformID];
    try {
        await client.query(query, values);
    } catch (err) {
        console.error(err);
    }
}

// COMMENT seeding
for (let i = 0; i < NumberOfFakeEntries; i += 1) {
    // faker data
    const randomDescription = faker.lorem.lines({ min: 1, max: 5 });
    const devID = (i % 3) + 1; // this will only use the first three users who are devs
    const randomIssueID = i + 1;
    // insert data into database
    try {
        await client.query(
            'INSERT INTO "comment" (description, user_id, issue_id) VALUES($1, $2, $3);',
            [randomDescription, devID, randomIssueID],
        );
    } catch (err) {
        console.error(err);
    }
}

await client.end();
