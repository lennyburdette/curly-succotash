import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway } from "@apollo/gateway";
import { readFile } from "node:fs/promises";

const gateway = new ApolloGateway({
  supergraphSdl: await readFile("./supergraph.graphql", "utf-8"),
});

const server = new ApolloServer({
  gateway,
  includeStacktraceInErrorResponses: false,
  formatError: (formatted, original) => {
    // THIS SHOULDN'T BE NECESSARY
    if (formatted.extensions?.stacktrace) {
      delete formatted.extensions.stacktrace;
    }
    return formatted;
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 4100 } });
console.log(url);
