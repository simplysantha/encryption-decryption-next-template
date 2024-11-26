import axios from "axios";
import { encryptData, decryptData } from "./encryption";
import { API_URL } from "./constants";

// Configure Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor for encryption
apiClient.interceptors.request.use((config) => {
  if (config.data) {
    config.data = { payload: encryptData(config.data) };
  }
  return config;
});

// Response interceptor for decryption
apiClient.interceptors.response.use((response) => {
  if (response.data.encryptedData) {
    response.data = decryptData(response.data.encryptedData);
  }
  return response;
});

// API Functions with controllerName query parameter
export const fetchAllItems = () =>
  apiClient.get("/", {
    params: {
      controllerName: "getAllItems"
    }
  });

export const fetchItemById = (id) =>
  apiClient.get("/", {
    params: {
      controllerName: "getItemById",
      id
    }
  });

export const createItem = (data) =>
  apiClient.post("/", data, {
    params: {
      controllerName: "createItem"
    }
  });

export const updateItem = (id, data) =>
  apiClient.put("/", data, {
    params: {
      controllerName: "updateItem",
      id
    }
  });

export const deleteItem = (id) =>
  apiClient.delete("/", {
    params: {
      controllerName: "deleteItem",
      id
    }
  });
