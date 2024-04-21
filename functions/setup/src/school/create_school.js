import { databases } from "../appwrite/appwrite_client.js";
import { APPWRITE_CONSTANTS } from "../appwrite/appwrite_constants.js";

const createSchool = async ({ shorthand }) => {
    let schoolEntry = {
        shorthand: shorthand,
    };

    return await databases.createCollection(
        APPWRITE_CONSTANTS.DATABASE_ID,
        APPWRITE_CONSTANTS.SCHOOLS_COLLECTION_ID,
        schoolEntry
    );
};


const setupSchool = async ({ shorthand, admin }) => {
    let school = await createSchool(shorthand);
    return school
};

export default setupSchool;