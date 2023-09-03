import pg from 'pg';

const { Client } = pg;

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Nécessaire pour une utilisation gratuite de Heroku Postgres
    },
});
// await client.connect();
client.connect((error) => {
    if (error) {
        console.log('Error connecting to database', error);
    } else {
        console.log('pg successfully connected to the database');
    }
});

export default client;
