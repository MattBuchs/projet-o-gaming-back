import pg from 'pg';

const { Client } = pg;

const client = new Client();

client.connect();

export default client;