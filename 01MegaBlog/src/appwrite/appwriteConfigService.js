import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwrite_URL)
      .setProject(conf.appwritePROJECT_ID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    title,
    content,
    featuredImage,
    status,
    userId,
  }) {
    try {
      const response = await this.databases.createDocument(
        conf.appwriteDATABASE_ID,
        conf.appwriteCOLLECTION_ID,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePost(
    DocumentID,
    { title, content, featuredImage, status }
  ) {
    try {
      const response = await this.databases.updateDocument(
        conf.appwriteDATABASE_ID,
        conf.appwriteCOLLECTION_ID,
        DocumentID,
        {
          title,
          content,
          featuredImage,
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
        conf.appwriteDATABASE_ID,
        conf.appwriteCOLLECTION_ID,
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
        conf.appwriteDATABASE_ID,
        conf.appwriteCOLLECTION_ID,
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
        conf.appwriteDATABASE_ID,
        conf.appwriteCOLLECTION_ID,
        queries
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async uploadFile(file) {
    try {
      const response = await this.storage.createFile(
        conf.appwriteBUCKET_ID,
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
        conf.appwriteBUCKET_ID,
        fileId
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getFilePreview(fileId) {
    const response = this.storage.getFilePreview(
      conf.appwriteBUCKET_ID,
      fileId
    );
    return response;
  }
}

const appwriteService = new Service();
export default appwriteService;
