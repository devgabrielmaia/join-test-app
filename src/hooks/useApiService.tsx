import { useContext } from 'react'
import {ServiceApiContext, ServiceMethodsType} from "../context/ServiceApiContext";

export function useApiService(): ServiceMethodsType {
  const service = useContext(ServiceApiContext);
  if (!service) {
    throw new Error('useServiceApi must be used within a ServiceApiProvider')
  }
  return service;
}
