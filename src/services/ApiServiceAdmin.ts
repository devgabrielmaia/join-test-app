import axios from "axios";
import {ProductData} from "./types/product-data.type";
import {CategoryData} from "./types/category-data.type";
import authConfig from "../configs/auth";
import {apiConfig} from "../configs/api";

export class ApiServiceAdmin {

  static async fetchProducts(): Promise<ProductData[] | boolean> {
    const url = apiConfig.baseURL + apiConfig.product;
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
    try {
      const { data: response = [] } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.map((product: any) => ({
        id: product.id,
        name: product.productName,
        price: product.price,
        date: product.date,
        categoryId: product.categoryId,
        categoryName: product.category.name
      }));
    } catch (error) {
      return false;
    }
  }

  static async deleteProduct(id: number): Promise<boolean> {
    const url = apiConfig.baseURL + apiConfig.product;
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
    try {
      await axios.delete(`${url}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async fetchCategories(): Promise<any[] | boolean> {
    const url = apiConfig.baseURL + apiConfig.category;
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
    try {
      const { data: response = [] } = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.map((category: any) => ({...category}));
    } catch (error) {
      return false;
    }
  }

  static async updateProduct(product: ProductData): Promise<boolean> {
    const url = apiConfig.baseURL + apiConfig.product;
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
    try {
      await axios.put(
        `${url}/${product.id}`,
        {
          productName: product.name,
          price: product.price,
          categoryId: product.categoryId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  static async createProduct(product: ProductData): Promise<boolean> {
    const url = apiConfig.baseURL + apiConfig.product;
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
    try {
      await axios.post(
        `${url}`,
        {
          productName: product.name,
          price: product.price,
          categoryId: product.categoryId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }


  static async updateCategory(category: CategoryData): Promise<boolean> {
    const url = apiConfig.baseURL + apiConfig.category;
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
    try {
      await axios.put(
        `${url}/${category.id}`,
        {
          nameCategory: category.name,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  static async createCategory(category: CategoryData): Promise<boolean> {
    const url = apiConfig.baseURL + apiConfig.category;
    const token = window.localStorage.getItem(authConfig.storageTokenKeyName);
    try {
      await axios.post(
        `${url}`,
        {
          categoryName: category.name,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
