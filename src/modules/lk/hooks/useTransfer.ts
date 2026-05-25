import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/modules/lk/api/api";
import type { HistoryDataType } from "@/shared/types/historyDataType";

export const useTransferHistory = () =>
	useQuery<HistoryDataType[]>({
		queryKey: ["transferHistory"],
		queryFn: async () => {
			console.log("Making request to:", "/api/transfers/history");
			const { data } = await api.get("/api/transfers/history");
			console.log("Received data:", data);
			return data;
		},
	});

export const useCreateTransfer = () => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: async (payload: any) => {
			console.log("Creating transfer with payload:", payload);
			const { data } = await api.post("/api/transfers", payload);
			console.log("Transfer created:", data);
			return data;
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ["transferHistory"] });
		},
	});
};
