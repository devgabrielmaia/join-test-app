import {Context, createContext, ReactNode} from "react";
import {ApiServiceAdmin} from "../services/ApiServiceAdmin";
import {ProductData} from "../services/types/product-data.type";
import {boolean} from "yup";
import {CategoryData} from "../services/types/category-data.type";

export type ServiceMethodsType = {
  fetchProducts: () => Promise<ProductData[] | boolean>,
  deleteProduct: (id: number) => Promise<boolean>,
  fetchCategories(): Promise<any>
  createProduct: (product: any) => Promise<boolean>
  updateProduct: (product: any) => Promise<boolean>
  updateCategory(category: any): Promise<boolean>
  createCategory(category: any): Promise<boolean>
}

const ServiceMethods = {
  fetchProducts: () => ApiServiceAdmin.fetchProducts(),
  deleteProduct: (id: number) => ApiServiceAdmin.deleteProduct(id),
  fetchCategories: () => ApiServiceAdmin.fetchCategories(),
  updateProduct: (product: any) => ApiServiceAdmin.updateProduct(product),
  createProduct: (product: any) => ApiServiceAdmin.createProduct(product),
  updateCategory: (product: any) => ApiServiceAdmin.updateCategory(product),
  createCategory: (product: any) => ApiServiceAdmin.createCategory(product),
}

export const ServiceApiContext: Context<ServiceMethodsType | undefined> =
  createContext<ServiceMethodsType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export const ServiceApiProvider = ({children}: Props) => {
  return (
    <ServiceApiContext.Provider value={ServiceMethods}>
      {children}
    </ServiceApiContext.Provider>
  )
}
