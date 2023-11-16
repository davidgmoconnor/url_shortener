import express from "express";
import { graphqlHTTP } from "express-graphql";
import { getConfig } from "./config";
import { schema } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import cors from "cors";

export const createServer = (listen = false) => {
  const config = getConfig();
  const app = express();

  app.use(express.json());
  // used to allow cross origin when running locally.
  app.use(cors({ origin: "*" }));
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
