import { ID } from "node-appwrite";
import { users, teams } from "../appwrite/appwrite_client"
import appwrite_constants from "../appwrite/appwrite_constants";

const createUser = async ({ email, password, name, schoolShorthand, role, }) => {
    const currentUser = await users.list([email, name]);
    if (currentUser !== undefined) throw Error(`User with Email '${email}' or Name '${name}' already exists.`)

    let userId = ID.custom()
    await users.create(userId, email, password, name || '');

    switch (role) {
        case 'm':
            await users.updateLabels(userId, ['admin', 'manager']);
            await teams.createMembership(schoolShorthand, ['member', 'guest'], email, userId,);
            break;
        case 'a':
            await users.updateLabels(userId, ['admin']);
            await teams.createMembership(schoolShorthand, ['member', 'guest'], email, userId,);
            break;
        case 's':
            await teams.createMembership(schoolShorthand, ['guest'], email, userId,);
            break;

        default:
            throw Error(`Role doesnt exist. Expected 'm' 'a' 's', got '${role}'`);
            break;
    }


};

export default createSchool;
