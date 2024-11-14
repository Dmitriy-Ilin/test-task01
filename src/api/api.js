import axios from "axios";

const API_URL = "https://sycret.ru/service/api/api";
const API_KEY = "011ba11bdcad4fa396660c2ec447ef14";

const apiRequest = async (methodName, params = {}, method) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        ApiKey: API_KEY,
        MethodName: methodName,
        ...params,
      },
    };

    let response;
    if (method === "GET") {
      response = await axios.get(API_URL, config);
    } else if (method === "POST") {
      response = await axios.post(API_URL, {
        ApiKey: API_KEY,
        MethodName: methodName,
        ...params,
      });
    } else {
      throw new Error(method);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при получении запроса",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getGoodList = () => apiRequest("OSGetGoodList", {}, "GET");
export const saveSale = (data) => apiRequest("OSSale", data, "GET");
