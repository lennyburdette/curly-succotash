import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLError, parse } from "graphql";

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs: parse(`#graphql
      type Query {
        hello: String!
      }
    `),
    resolvers: {
      Query: {
        hello() {
          throw new GraphQLError("Hello, world!");
        },
      },
    },
  }),
  includeStacktraceInErrorResponses: true,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4101 } });
console.log(url);
