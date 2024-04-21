import { ID } from "node-appwrite";
import { databases } from "../appwrite/appwrite_client.js";
import { APPWRITE_CONSTANTS } from "../appwrite/appwrite_constants.js";

const createSchool = async (schoolShorthand, schoolName, log) => {
    let schoolEntry = {
        shorthand: schoolShorthand,
        name: schoolName
    };

    log(schoolEntry)

    return await databases.createDocument(
        APPWRITE_CONSTANTS.DATABASE_ID,
        APPWRITE_CONSTANTS.SCHOOLS_COLLECTION_ID,
        ID.unique(),
        schoolEntry
    );
};


const setupSchool = async ({ schoolShorthand, schoolName, admin, log }) => {
    let school = await createSchool(schoolShorthand, schoolName, log);
    return school
};

export default setupSchool;