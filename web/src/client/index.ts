import axios from "axios";

export const makeClient = (baseUrl: string) => {
  const makeRequest = async (query: string, variables: any) => {
    const url = `${baseUrl}/graphql`;
    console.log({ url });
    return axios.request({
      url,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query,
        variables,
      },
    });
  };

  return {
    makeRequest,
  };
};

export type Client = ReturnType<typeof makeClient>;
