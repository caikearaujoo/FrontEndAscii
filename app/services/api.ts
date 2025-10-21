import axios from "axios";

// Este log é útil para ver o que ele lê no *carregamento* do arquivo
console.log("API key (lida no load inicial):", process.env.NEXT_PUBLIC_API_KEY);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // REMOVA O HEADER 'x-api-key' DAQUI
});

// O "pulo do gato" é aqui
api.interceptors.request.use(
  (config) => {
    // Lê a API key NO MOMENTO EXATO DA REQUISIÇÃO
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    } else {
      // Se isso aparecer, o .env.local não está sendo lido pelo Next.js
      console.error("API KEY DO FRONTEND ESTÁ UNDEFINED!");
    }

    // Log para depurar o que está sendo enviado
    console.log("[API Request Headers]", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API Error]", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
