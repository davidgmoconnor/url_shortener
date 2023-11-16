import { createContext, useContext } from "react";
import { Client } from ".";

export const ClientContext = createContext<Client | null>(null);

export const useClient = () => {
  return useContext(ClientContext);
};
