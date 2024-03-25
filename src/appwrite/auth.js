import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

function createAuthService() {
    const client = new Client();
    const account = new Account(client);

    client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

    async function createAccount({email, password, name}) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return login({email, password});
            } else {
               return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async function login({email, password}) {
        try {
            return await account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async function getCurrentUser() {
        try {
            return await account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async function logout() {
        try {
            await account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    return {
        createAccount,
        login,
        getCurrentUser,
        logout
    };
}

const authService = createAuthService();

export default authService;
