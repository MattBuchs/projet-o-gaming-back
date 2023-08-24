import pg from 'pg';

const { Client } = pg;

const client = new Client();
// await client.connect();
client.connect((error) => {
    if (error) {
        console.log('Error connecting to database', error);
    } else {
        console.log('pg: successfully connected to the database');
    }
});

export default client;
