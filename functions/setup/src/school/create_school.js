import { databases } from "../appwrite/appwrite_client.js";
import appwrite_constants from "../appwrite/appwrite_constants.js";

const createSchool = async ({ shorthand }) => {
    let schoolEntry = {
        shorthand: shorthand,
    };

    return await databases.createCollection(
        appwrite_constants.DATABASE_ID,
        appwrite_constants.SCHOOLS_COLLECTION_ID,
        schoolEntry
    );
};


const setupSchool = async ({ shorthand, admin }) => {
    let school = await createSchool(shorthand);
    return school
};

export default setupSchool;