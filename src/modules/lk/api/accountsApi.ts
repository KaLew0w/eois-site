import MockAdapter from "axios-mock-adapter";
import { api } from "@/modules/lk/api/api";

const mock = new MockAdapter(api, { delayResponse: 200 });

const responseData = {
	fiatAccounts: [
		{
			currency: "RUB",
			name: "Основной",
			balance: "₽ 620 000",
			iban: "RU35 0004 2618 9895 95",
			account: "40817 810 0 0426 189895",
			active: true,
		},
		{
			currency: "KGS",
			name: "Счёт 1",
			balance: "KGS 5 000",
			iban: "KG99 0001 0199 7179 79",
			account: "40817 417 0 0101 997179",
			active: true,
		},
		{
			currency: "USD",
			name: "Savings",
			balance: "$ 2 350,00",
			iban: "US46 0001 1157 5466 66",
			account: "40817 840 0 0111 575466",
			active: true,
		},
	],
	cryptoAccounts: [
		{
			id: 1,
			asset: "BTC",
			network: "BTC",
			balance: 0.21,
			currency: "BTC",
			depositAddress: null,
			status: "active",
		},
		{
			id: 2,
			asset: "USDT",
			network: "TRC20",
			balance: 3100,
			currency: "USDT",
			depositAddress: null,
			status: "active",
		},
		{
			id: 3,
			asset: "ETH",
			network: "ERC20",
			balance: 1.8,
			currency: "ETH",
			depositAddress: null,
			status: "active",
		},
	],
};

mock.onGet("/api/wallets/fiat").reply(200, responseData.fiatAccounts);
mock.onGet("/api/wallets/crypto").reply(200, responseData.cryptoAccounts);
