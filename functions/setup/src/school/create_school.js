import { databases } from "../appwrite/appwrite_client";
import appwrite_constants from "../appwrite/appwrite_constants";

const createSchool = async ({ shorthand }) => {
    let schoolEntry = {
        shorthand: shorthand,
    };

    await databases.createCollection(
        appwrite_constants.DATABASE_ID,
        appwrite_constants.SCHOOLS_COLLECTION_ID,
        schoolEntry
    );
};


const setupSchool = async ({ shorthand }) => {

};

export default setupSchool;