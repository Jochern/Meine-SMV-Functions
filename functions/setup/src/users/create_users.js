import { ID } from "node-appwrite";
import { users, teams, databases } from "../appwrite/appwrite_client.js"
import { APPWRITE_CONSTANTS } from "../appwrite/appwrite_constants.js";

const createUser = async ({ email, password, name, schoolShorthand, role, log }) => {

// let currentUser
// try {
//     currentUser = await users.list([firstName, lastName, email]);
// } catch (error) {
//     log("current users couldnt be queried");
// }
// if (currentUser !== undefined) throw Error(`User with Email '${email}' or Name '${name}' already exists.`)

    let school = databases.getDocument(
        APPWRITE_CONSTANTS.DATABASE_ID,
        APPWRITE_CONSTANTS.SCHOOLS_COLLECTION_ID,
        schoolShorthand
    )
    if (school == undefined) {
        throw Error(`School${role} doesnt exist.`)
    }

    let userId = ID.unique()
    let user = email ? await users.create(userId, email, undefined, password, name)
        : await users.create(userId, `${name.toLowerCase().replace(/\s/g, '')}@${schoolShorthand}.i`, undefined, password, name);

    switch (role) {
        case 'm':
            //await users.updateLabels(userId, ['admin', 'manager']);
            await createMembership(schoolShorthand, userId, ['member', 'guest'], log);
            break;
        case 'a':
            // await users.updateLabels(userId, ['admin']);
            await createMembership(schoolShorthand, userId, ['member', 'guest'], log);
            break;
        case 's':
            await createMembership(schoolShorthand, userId, ['guest'], log);
            break;

        default:
            users.delete(userId);
            throw Error(`Role doesnt exist. Expected 'm' 'a' 's', got '${role}'`);
            break;
    }

    return user;
};


async function createMembership(schoolShorthand, userId, roles, log) {
    try {
        await teams.createMembership(schoolShorthand, roles, "localhost", undefined, userId);
    } catch (error) {
        log(error);
        if (error.toString() == "Error: Invalid `email` param: Value must be a valid email address") {
            return
        };
        users.delete(userId);
        throw error;
    }
}

export default createUser;
