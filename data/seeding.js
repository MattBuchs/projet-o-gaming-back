import '../app/helpers/env.load.js';
import { faker } from '@faker-js/faker';
import client from '../app/helpers/db.js';
import logger from '../app/helpers/logger.js';

async function accessDatabase(query, values) {
    try {
        await client.query(query, values);
    } catch (err) {
        logger.error(err);
    }
}

const NumberOfFakeEntries = 10;
const NumberOfTagsAndCategories = 3;

async function seedTags() {
    const tagPromises = Array.from({ length: NumberOfFakeEntries }, async () => {
        const randomName = faker.word.noun();
        const query = 'INSERT INTO tag(title) VALUES($1);';
        const values = [randomName];
        await accessDatabase(query, values);
    });

    await Promise.all(tagPromises);
}

async function seedPlatforms() {
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

    const platformPromises = consoles.map(async (console) => {
        const query = 'INSERT INTO platform(name) VALUES($1);';
        const values = [console];
        await accessDatabase(query, values);
    });

    await Promise.all(platformPromises);
}

async function seedRoles() {
    const roleQueries = [
        "INSERT INTO role(name) VALUES('developer');",
        "INSERT INTO role(name) VALUES('player');",
    ];

    const rolePromises = roleQueries.map(async (query) => {
        await accessDatabase(query, []);
    });

    await Promise.all(rolePromises);
}

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

async function seedCategories() {
    const categoryPromises = categories.map(async (category) => {
        const randomColor = faker.color.rgb();
        const query = 'INSERT INTO "category" (name, color) VALUES($1, $2);';
        const values = [category, randomColor];
        await accessDatabase(query, values);
    });

    await Promise.all(categoryPromises);
}

async function seedUsers() {
    const userPromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomName = faker.internet.userName();
        const randomEmail = faker.internet.email();
        const randomPassword = faker.internet.password();
        const randomAvatar = faker.internet.url();
        const roleID = i < 3 ? 1 : 2;
        const query = 'INSERT INTO "user" (username, email, password, avatar, role_id) VALUES($1, $2, $3, $4, $5);';
        const values = [randomName, randomEmail, randomPassword, randomAvatar, roleID];
        await accessDatabase(query, values);
    });

    await Promise.all(userPromises);
}

async function seedGames() {
    const gamePromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomName = faker.internet.domainWord();
        const randomDescripion = faker.lorem.paragraph({ min: 3, max: 6 });
        const randomPictureUrl = faker.internet.url();
        const randomExternalLink = faker.internet.url();
        const randomReleaseDate = faker.date.past();
        const devID = i <= 3 ? 1 : 2;
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
    });

    await Promise.all(gamePromises);
}

async function seedSuggestions() {
    const suggestionPromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomTitle = faker.lorem.lines(1);
        const randomDescription = faker.lorem.paragraph({ min: 2, max: 15 });
        const randomPublishDate = faker.date.past({ years: 10 });
        const randomGameID = i + 1;
        const randomUserID = i <= 3 ? i + 3 : i;
        const query = 'INSERT INTO "suggestion" (title, description, published_at, user_id, game_id) VALUES($1, $2, $3, $4, $5);';
        const values = [
            randomTitle,
            randomDescription,
            randomPublishDate,
            randomUserID,
            randomGameID];

        await accessDatabase(query, values);
    });

    await Promise.all(suggestionPromises);
}

async function seedIssues() {
    const statuses = ['read', 'accepted', 'duplicate', 'working on it', 'refused', 'fixed'];

    const issuePromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomTitle = faker.lorem.lines(1);
        const randomDescription = faker.lorem.paragraph({ min: 2, max: 10 });
        const statusNumber = i % statuses.length;
        const randomStatus = statuses[statusNumber];
        const assignedToEmail = faker.internet.email();
        const isMinorImportanceBool = i % 2 === 0;
        const randomOnlineStat = i % 2 === 0;
        const isPublic = i % 2 === 0;
        const randomFrequency = i % 2 === 0 ? 'Sometimes' : 'Always';
        const randomReplication = faker.lorem.paragraph({ min: 1, max: 2 });
        const randomPublishDate = faker.date.past({ years: 10 });
        const randomUserID = i <= 3 ? i + 3 : i;
        const randomGameID = i + 1;
        const randomPlatformID = i + 1;
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
    });

    await Promise.all(issuePromises);
}

async function seedComments() {
    const commentPromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomDescription = faker.lorem.lines({ min: 1, max: 5 });
        const devID = (i % 3) + 1;
        const randomIssueID = i + 1;
        const query = 'INSERT INTO "comment" (description, user_id, issue_id) VALUES($1, $2, $3);';
        const values = [randomDescription, devID, randomIssueID];
        await accessDatabase(query, values);
    });

    await Promise.all(commentPromises);
}

async function seedCategoryHasGame() {
    const categoryGamePromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomGameID = i + 1;
        const categoryPromises = Array.from(
            { length: NumberOfTagsAndCategories },
            async (__, j) => {
                const numberBetween = (j + i) % categories.length;
                const randomCategoryID = numberBetween + 1;
                const query = 'INSERT INTO "category_has_game" (category_id, game_id) VALUES ($1, $2)';
                const values = [randomCategoryID, randomGameID];
                await accessDatabase(query, values);
            },
        );
        await Promise.all(categoryPromises);
    });

    await Promise.all(categoryGamePromises);
}

async function seedGameHasTag() {
    const gameTagPromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomGameID = i + 1;
        const tagPromises = Array.from({ length: NumberOfTagsAndCategories }, async (__, j) => {
            const numberBetween = (j + i) % NumberOfFakeEntries;
            const randomTagID = numberBetween + 1;
            const query = 'INSERT INTO "game_has_tag" (game_id, tag_id) VALUES ($1, $2)';
            const values = [randomGameID, randomTagID];
            await accessDatabase(query, values);
        });
        await Promise.all(tagPromises);
    });

    await Promise.all(gameTagPromises);
}

async function seedIssueHasTag() {
    const issueTagPromises = Array.from({ length: NumberOfFakeEntries }, async (_, i) => {
        const randomIssueID = i + 1;
        const tagPromises = Array.from({ length: NumberOfTagsAndCategories }, async (__, j) => {
            const numberBetween = (j + i) % NumberOfFakeEntries;
            const randomTagID = numberBetween + 1;
            const query = 'INSERT INTO "issue_has_tag" (issue_id, tag_id) VALUES ($1, $2)';
            const values = [randomIssueID, randomTagID];
            await accessDatabase(query, values);
        });
        await Promise.all(tagPromises);
    });

    await Promise.all(issueTagPromises);
}

async function seedDatabase() {
    await seedTags();
    await seedPlatforms();
    await seedRoles();
    await seedCategories();
    await seedUsers();
    await seedGames();
    await seedSuggestions();
    await seedIssues();
    await seedComments();
    await seedCategoryHasGame();
    await seedGameHasTag();
    await seedIssueHasTag();

    await client.end();
}

seedDatabase();
