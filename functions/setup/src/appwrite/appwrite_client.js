import { Client } from 'node-appwrite';

const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("<YOUR_PROJECT_ID>")
    .setKey("<YOUR_API_KEY>");

const databases = new sdk.Databases(client);

export default { client };
