// This file contains all the fetch requests sent to the backend api

import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  // getting the response from api using fetch by sending formData
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  //   getting the json format of the response body
  const responseBody = await response.json();

  //   throw an error iby creating an Error from the response
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
