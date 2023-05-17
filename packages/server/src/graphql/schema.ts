import fs from "fs";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";
import resolvers from "./resolvers";

const typeDefs = gql`
  #graphql
  ${fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
`;

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
