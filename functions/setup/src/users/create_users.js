import { ID } from "node-appwrite";
import { users, teams } from "../appwrite/appwrite_client.js"

const createUser = async ({ email, password, name, schoolShorthand, role, log }) => {
    let currentUser
    try {
        currentUser = await users.list();
    } catch (error) {
        log("current users couldnt be queried");
        log(currentUser)
    }
    //if (currentUser !== undefined) throw Error(`User with Email '${email}' or Name '${name}' already exists.`)

    let userId = ID.custom()
    log(userId)
    try {
        await users.create(userId, email, password, name || '');
    } catch (error) {
        log(error.toString())
        throw Error('Could not create User. User already exists.', { cause: error })
    }

    await teams.create(schoolShorthand, schoolShorthand);
    log('asd')
    switch (role) {
        case 'm':
            //await users.updateLabels(userId, ['admin', 'manager']);
            await createMembership(schoolShorthand, userId, ['member', 'guest']);
            log(email)
            break;
        case 'a':
            // await users.updateLabels(userId, ['admin']);
            await createMembership(schoolShorthand, userId, ['member', 'guest']);
            break;
        case 's':
            await createMembership(schoolShorthand, userId, ['guest']);
            break;

        default:
            throw Error(`Role doesnt exist. Expected 'm' 'a' 's', got '${role}'`);
            break;
    }


};


async function createMembership(schoolShorthand, userId, roles) {
    try {
        await teams.createMembership(schoolShorthand, roles, "localhost", undefined, userId);
    } catch (error) {
        print(error);
        if (error.toString() = "Error: Invalid `email` param: Value must be a valid email address") {
            return
        };
        throw error;
    }
}

export default createUser;
