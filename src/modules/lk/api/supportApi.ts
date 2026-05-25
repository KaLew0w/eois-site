import MockAdapter from "axios-mock-adapter";
import { api } from "@/modules/lk/api/api";

const mock = new MockAdapter(api, { delayResponse: 200 });

// тестовые данные
const mockData = {
	faq: [
		{
			id: 1,
			question: "Как пополнить карту?",
			answer: "Перейдите в «Обмен валют» или «Переводы»...",
		},
		{
			id: 2,
			question: "Как включить 2FA?",
			answer: "Настройки → Безопасность → Двухфакторная аутентификация.",
		},
		{
			id: 3,
			question: "Как восстановить доступ?",
			answer: "Используйте резервные коды 2FA либо обратитесь в поддержку.",
		},
		{
			id: 4,
			question: "Где скачать выписку?",
			answer:
				"История транзакций → Экспорт CSV. Можно фильтровать по типу, валюте и диапазону дат.",
		},
	],
	feedbacks: [
		{ id: 1, user: "Ирина", comment: "Отличный сервис!" },
		{ id: 2, user: "Олег", comment: "Добавьте тёмную тему в мобильном." },
	],
	guides: [
		{
			id: 1,
			title: "Гайд: первые шаги",
			content: "Создание аккаунта, базовые настройки и безопасность.",
			tags: ["старт", "аккаунт"],
		},
		{
			id: 2,
			title: "Как перевести средства",
			content: "Внутренние переводы, внешние адреса, лимиты и комиссии..",
			tags: ["старт", "аккаунт"],
		},
		{
			id: 3,
			title: "Криптокошельки: депозиты и вывод",
			content: "Адреса и сети, комиссии, защита средств.",
			tags: ["крипто", "кошельки"],
		},
	],
};

// — регистрируем mock-эндпоинты для axios
mock.onGet("/api/support/faq").reply(200, mockData.faq);
mock.onGet("/api/support/feedbacks").reply(200, mockData.feedbacks);
mock.onGet("/api/support/guides").reply(200, mockData.guides);

// Добавляем отладку для перехваченных запросов
mock.onGet("/api/support/guides").reply((config) => {
	console.log("🎯 Mock intercepted request to:", config.url);
	console.log("📦 Returning data:", mockData.guides);
	return [200, mockData.guides];
});

console.log("✅ Mock API: support активирован");
console.log("Mock endpoints registered:", {
	faq: "/api/support/faq",
	feedbacks: "/api/support/feedbacks",
	guides: "/api/support/guides",
});
console.log("Mock data available:", {
	faq: mockData.faq.length,
	feedbacks: mockData.feedbacks.length,
	guides: mockData.guides.length,
});
