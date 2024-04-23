import { ID } from "node-appwrite";
import { databases } from "../appwrite/appwrite_client.js";
import { APPWRITE_CONSTANTS } from "../appwrite/appwrite_constants.js";
import createUser from "../users/create_users.js";

const createSchool = async (schoolShorthand, schoolName, log) => {
    let schoolEntry = {
        name: schoolName
    };

    log(schoolEntry)
    return await databases.createDocument(
        APPWRITE_CONSTANTS.DATABASE_ID,
        APPWRITE_CONSTANTS.SCHOOLS_COLLECTION_ID,
        schoolShorthand,
        schoolEntry
    );
};


const setupSchool = async ({ schoolShorthand, schoolName, admin, log }) => {
    let school = await createSchool(schoolShorthand, schoolName, log);
    await teams.create[schoolShorthand, schoolName]
    let user
    try {
        user = await createUser({ password: admin.password, email: admin.email, name: admin.name, schoolShorthand: schoolShorthand, role: 'm', log: log })
    } catch (error) {
        await databases.deleteDocument(
            APPWRITE_CONSTANTS.DATABASE_ID,
            APPWRITE_CONSTANTS.SCHOOLS_COLLECTION_ID,
            schoolShorthand
        );
        log("sadasaserror")
        throw (error)
    }
    return { school: school, user: user }
};

export default setupSchool;