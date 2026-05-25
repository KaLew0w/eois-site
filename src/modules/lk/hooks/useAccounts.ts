import { useQuery } from "@tanstack/react-query";
import { api } from "@/modules/lk/api/api";

export function useFiatAccounts(options?: object) {
	return useQuery({
		queryKey: ["fiat"],
		queryFn: async () => {
			console.log("Making request to:", "/api/wallets/fiat");
			const { data } = await api.get("/api/wallets/fiat");
			console.log("Received data:", data);
			return data;
		},
		...options,
	});
}

export function useCryptoAccounts(options?: object) {
	return useQuery({
		queryKey: ["crypto"],
		queryFn: async () => {
			console.log("Making request to:", "/api/wallets/crypto");
			const { data } = await api.get("/api/wallets/crypto");
			console.log("Received data:", data);
			return data;
		},
		...options,
	});
}
