import axios from "axios";

export const makeClient = (baseUrl: string) => {
  const makeRequest = async (query: string, variables: any) => {
    return axios.request({
      url: `${baseUrl}/graphql`,
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
