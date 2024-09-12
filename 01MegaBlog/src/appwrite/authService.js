import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_URL)
      .setProject(conf.appwritePROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const response = await this.account.create(
        ID.unique(), // Generate a unique ID for the user
        email,
        password,
        name
      );
      console.log("User registered successfully:", response);
      return response;
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw new Error(error.message);
    }
  }

  async login({ email, password }) {
    try {
      const response = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      // Logged in
      return user;
    } catch (error) {
      console.log("No active session:", error.message);
      return false; // Return null if no user is logged in
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const authService = new AuthService();
export default authService;
