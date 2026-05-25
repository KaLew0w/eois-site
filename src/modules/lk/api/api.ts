import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.BASE_URL || "/", // ✅ использовать env
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

// для токенов (если есть авторизация)
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// глобальная обработка ошибок
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Можно, например, сделать автоматический logout при 401
		if (error.response?.status === 401) {
			console.warn("Unauthorized — возможно, истёк токен");
			// redirectToLogin();
		}
		return Promise.reject(error);
	},
);
