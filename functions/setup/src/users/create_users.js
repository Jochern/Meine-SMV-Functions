import { ID } from "node-appwrite";
import { users, teams } from "../appwrite/appwrite_client.js"

const createUser = async ({ email, password, name, schoolShorthand, role, name, log }) => {
// let currentUser
// try {
//     currentUser = await users.list([firstName, lastName, email]);
// } catch (error) {
//     log("current users couldnt be queried");
// }
// if (currentUser !== undefined) throw Error(`User with Email '${email}' or Name '${name}' already exists.`)

    let userId = ID.unique()
    if (email) {
        await users.create(userId, email, undefined, password, name);
    } else {
        await users.create(userID, `${name.toLowerCase().replace(/\s/g, '')}@${schoolShorthand}.i`, undefined, password, name);
    }

    await teams.create(schoolShorthand, schoolShorthand);
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
