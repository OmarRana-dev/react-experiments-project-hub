import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_URL)
      .setProject(config.appwritePROJECT_ID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, image, status, userId }) {
    try {
      const response = await this.databases.createDocument(
        config.appwriteDATABASE_ID,
        config.appwriteCOLLECTION_ID,
        ID.unique(),
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePost(DocumentID, { title, content, image, status }) {
    try {
      const response = await this.databases.updateDocument(
        config.appwriteDATABASE_ID,
        config.appwriteCOLLECTION_ID,
        DocumentID,
        {
          title,
          content,
          image,
          status,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePost(DocumentID) {
    try {
      const response = await this.databases.deleteDocument(
        config.appwriteDATABASE_ID,
        config.appwriteCOLLECTION_ID,
        DocumentID
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPost(DocumentID) {
    try {
      const response = await this.databases.getDocument(
        config.appwriteDATABASE_ID,
        config.appwriteCOLLECTION_ID,
        DocumentID
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const response = await this.databases.listDocuments(
        config.appwriteDATABASE_ID,
        config.appwriteCOLLECTION_ID,
        queries
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // file upload service
  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        config.appwriteBUCKET_ID,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteFile(fileId) {
    try {
      const response = await this.storage.deleteFile(
        config.appwriteBUCKET_ID,
        fileId
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getFilePreview(fileId) {
    const response = this.storage.getFilePreview(
      config.appwriteBUCKET_ID,
      fileId
    );
    return response;
  }
}

const service = new Service();
export default service;
