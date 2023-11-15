import express from "express";
import { graphqlHTTP } from "express-graphql";
import { getConfig } from "./config";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

export const createServer = (listen = false) => {
  const config = getConfig();
  const app = express();

  app.use(express.json());

  app.use(
    "/",
    graphqlHTTP({
      schema,
      rootValue: resolvers,
    })
  );

  if (listen) {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}.`);
    });
  }

  return app;
};
