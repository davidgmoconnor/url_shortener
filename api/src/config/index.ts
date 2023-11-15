import "dotenv/config";
import joi from "joi";

export type Config = {
  port: number;
  mongo: {
    url: string;
  };
};

const schema = joi.object<Config>({
  port: joi.number().required(),
  mongo: joi.object({
    url: joi.string().required(),
  }),
});

export const getConfig = (): Config => {
  const config = {
    port: process.env.PORT,
    mongo: {
      url: process.env.MONGODB_URL,
    },
  };
  const { value, error } = schema.validate(config);
  if (error) {
    throw new Error(error.toString());
  }
  return value;
};
