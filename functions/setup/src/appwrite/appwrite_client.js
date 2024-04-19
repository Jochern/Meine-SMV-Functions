import { Client, Databases, Users } from 'node-appwrite';

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("<YOUR_PROJECT_ID>")
    .setKey("<YOUR_API_KEY>");

const databases = new Databases(client);

const users = new Users(client);

const teams = new Teams(client);

export default { client, databases, users, teams };
