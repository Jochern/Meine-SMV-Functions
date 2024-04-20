import { Client, Databases, Users } from 'node-appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);
const databases = new Databases(client);

const users = new Users(client);

const teams = new Teams(client);

export default { client, databases, users, teams };
