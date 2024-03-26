import conf from "../config/config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
export class DataBaseService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appWriteURL).setProject(conf.projectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      await this.databases.createDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
        { title, content, featuredImage, status, userID }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, featuredImage, status, userID }) {
    try {
      await this.databases.updateDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseID,
        conf.collectionID,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getDocument(slug) {
    try {
      return await this.databases(conf.databaseID, conf.collectionID, slug);
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.databaseID,
        conf.collectionID,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  //file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(conf.bucketID, ID.unique(), file);
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(conf.databaseID, fileID);
    } catch (error) {
      throw error;
    }
  }

  async filePreview(fileID) {
    try {
      return this.bucket.getFilePreview(conf.bucketID, fileID);
    } catch (error) {
      throw error;
    }
  }
}

const databaseService = new DataBaseService();
export default databaseService;
