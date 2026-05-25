// src/api/exchange.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface FiatWallet {
	id: string;
	name: string;
	currency: string;
	balance: number;
	active: boolean;
}

export interface CryptoWallet {
	id: string;
	asset: string;
	network: string;
	address: string;
	balance: number;
	active: boolean;
}

export interface ExchangeRow {
	id: string;
	dt: string;
	side: "C2F" | "F2C" | "C2C";
	fromWallet: string;
	toWallet: string;
	fromStr: string;
	toStr: string;
	rate: number;
	fee: string;
	net?: number;
	netCrypto?: number;
	status: "done" | "new";
}

// --- Моковые данные ---
let fiatWallets: FiatWallet[] = [
	{
		id: "rub-main",
		currency: "RUB",
		name: "RUB • Основной",
		balance: 620000,
		active: true,
	},
	{
		id: "kgs-1",
		currency: "KGS",
		name: "KGS • Счёт 1",
		balance: 5000,
		active: true,
	},
	{
		id: "usd-1",
		currency: "USD",
		name: "USD • Savings",
		balance: 2350,
		active: true,
	},
];

let cryptoWallets: CryptoWallet[] = [
	{
		id: "btc-1",
		asset: "BTC",
		network: "BTC",
		address: "bc1q...",
		balance: 0.21,
		active: true,
	},
	{
		id: "usdt-trc20-1",
		asset: "USDT",
		network: "TRC20",
		address: "Txxx...",
		balance: 3100,
		active: true,
	},
	{
		id: "eth-1",
		asset: "ETH",
		network: "ERC20",
		address: "0x...",
		balance: 1.8,
		active: true,
	},
];

let exchanges: ExchangeRow[] = [];

// --- Helpers ---
function findById<T extends { id: string }>(arr: T[], id: string) {
	return arr.find((x) => x.id === id);
}

function mockRate(from: string, to: string) {
	const USD: Record<string, number> = { RUB: 95, KGS: 86 };
	const CR: Record<string, number> = { BTC: 60000, ETH: 2800, USDT: 1 };

	if (CR[from] && CR[to]) return CR[from] / CR[to];
	if (CR[from] && USD[to]) return CR[from] * USD[to];
	if (CR[from] && to === "USD") return CR[from];
	if (USD[from] && CR[to]) return (1 / CR[to]) * USD[from];
	if (from === "USD" && CR[to]) return 1 / CR[to];
	if (USD[from] && USD[to]) return USD[to] / USD[from];
	if (from === "USD" && USD[to]) return USD[to];
	if (USD[from] && to === "USD") return 1 / USD[from];
	return 1;
}

// --- API ---
export const useWallets = () => {
	return { fiatWallets, cryptoWallets };
};

export const useQuote = () => {
	return (params: {
		side: "C2F" | "F2C" | "C2C";
		from: string;
		to: string;
		amount: number;
	}) => {
		const rate = mockRate(params.from, params.to);
		const gross = params.amount * rate;
		const fee = +(gross * 0.005).toFixed(8);
		const net = +(gross - fee).toFixed(8);
		return { rate, fee, gross, net };
	};
};

export const useCreateExchange = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (
			payload: Partial<ExchangeRow> & {
				side: "C2F" | "F2C" | "C2C";
				amount: number;
				netCrypto?: number;
			},
		) => {
			const now = new Date();
			const id = "ex" + (exchanges.length + 1);
			const dt = now.toLocaleString("ru-RU", { hour12: false }).replace(",", "");
			const row: ExchangeRow = {
				id,
				dt,
				side: payload.side,
				fromWallet: payload.fromWallet!,
				toWallet: payload.toWallet!,
				fromStr: payload.fromStr!,
				toStr: payload.toStr!,
				rate: payload.rate!,
				fee: payload.fee!,
				net: payload.net,
				netCrypto: payload.netCrypto,
				status: "done",
			};
			exchanges.unshift(row);

			// обновление балансов
			if (payload.side === "C2F") {
				const cw = findById(
					[...cryptoWallets, ...fiatWallets],
					payload.fromWallet!,
				);
				const fw = findById(
					[...cryptoWallets, ...fiatWallets],
					payload.toWallet!,
				);
				if (cw && (cw as CryptoWallet).asset)
					(cw as CryptoWallet).balance -= payload.amount;
				if (fw && (fw as FiatWallet).currency)
					(fw as FiatWallet).balance += payload.net!;
			}
			if (payload.side === "F2C") {
				const fw = findById(
					[...cryptoWallets, ...fiatWallets],
					payload.fromWallet!,
				);
				const cw = findById(
					[...cryptoWallets, ...fiatWallets],
					payload.toWallet!,
				);
				if (fw && (fw as FiatWallet).currency)
					(fw as FiatWallet).balance -= payload.amount;
				if (cw && (cw as CryptoWallet).asset)
					(cw as CryptoWallet).balance += payload.netCrypto!;
			}
			if (payload.side === "C2C") {
				const fromW = findById(cryptoWallets, payload.fromWallet!);
				const toW = findById(cryptoWallets, payload.toWallet!);
				if (fromW) fromW.balance -= payload.amount;
				if (toW) toW.balance += payload.netCrypto!;
			}

			queryClient.invalidateQueries({ queryKey: ["exchanges"] });
			return row;
		},
	});
};

export const useExchanges = (wallet?: string) =>
	useQuery({
		queryKey: ["exchanges", wallet],
		queryFn: () => {
			if (!wallet || wallet === "any") return exchanges;
			return exchanges.filter(
				(r) => r.fromWallet === wallet || r.toWallet === wallet,
			);
		},
	});
