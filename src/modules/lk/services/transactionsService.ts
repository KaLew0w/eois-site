import type { TransactionType } from "@/shared/types/transactionType";
import { api } from "@/modules/lk/api/api";

export const fetchTransactions = async (): Promise<TransactionType[]> => {
	const { data } = await api.get("/api/transactions"); // /transactions endpoint
	return data;
};
