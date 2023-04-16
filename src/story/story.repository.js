import httpStatus from "http-status";
import ApiError from "../exception/ApiError";
import PostgresDataSource from "../postgres.datasource";
import { v4 as uuid } from "uuid";

const storyColums = ["id", "uuid", "title", "imageUrl", "created_at", "updated_at"];

export default class StoryRepository extends PostgresDataSource {
  tableName = "story";

  async getStory(uuid) {
    const story = await this.knex(this.tableName).select(storyColums).where({ uuid }).first();

    if (!story) {
      throw new ApiError(`Story with '${uuid}' does not exist`, httpStatus.NOT_FOUND);
    }

    return story;
  }

  async createStory({ title, imageUrl, userId }) {
    return await this.knex(this.tableName).insert({ uuid: uuid(), title, imageUrl, userId }).returning(storyColums);
  }

  async getRandomStory() {
    return await this.knex(this.tableName).select(storyColums).orderBy(this.knex.raw("random()")).first();
  }
}
