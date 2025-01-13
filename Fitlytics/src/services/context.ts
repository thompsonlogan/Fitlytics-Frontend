
import { createContext, useContext } from "react";
import { DataApis } from "./data";

interface ServiceApis {
  data:  DataApis
}

export const ServiceApisContext = createContext<ServiceApis>(null!)

export function useDataApis() {
  return useContext(ServiceApisContext).data
}