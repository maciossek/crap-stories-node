import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";
import { mergeTypeDefs } from "@graphql-tools/schema-merging";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import app from "./express";
import StoryRepository from "../story/story.repository";
import isAuthenticatedDirective from "../directive/isAuthenticated.directive";
import userContext from "../apolloMiddleware/userContext";

const typesArray = loadFilesSync(path.join(__dirname, "../"), { recursive: true, extensions: [".graphql"] });
const resolversArray = loadFilesSync(path.join(__dirname, "../**/*.resolver.*"));

export const dataSources = () => ({
  storyRepository: new StoryRepository(),
});

let schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  resolvers: mergeResolvers(resolversArray),
});

schema = isAuthenticatedDirective(schema, "isAuthenticated");

const createContext = async ({ req }) => {
  return {
    user: await userContext(req),
  };
};

export default async function startApolloServer() {
  const server = new ApolloServer({ schema, dataSources, context: createContext });

  await server.start();
  server.applyMiddleware({ app });

  return server;
}
