import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_URL)
      .setProject(config.appwritePROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      this.login(email, password);
      return response;
    } catch (error) {
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
}

const authService = new AuthService();

export default authService;
