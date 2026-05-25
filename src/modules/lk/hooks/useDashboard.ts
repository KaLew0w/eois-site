import { useQuery } from "@tanstack/react-query";
import { fetchCards } from "@/modules/lk/services/cardsService";
import { fetchTransactions } from "@/modules/lk/services/transactionsService";
import type { CardType } from "@/shared/types/cardsType";
import type { TransactionType } from "@/shared/types/transactionType";

export function useDashboard() {
	const cardsQuery = useQuery<CardType[]>({
		queryKey: ["api/cards"],
		queryFn: fetchCards,
		// staleTime: 100 * 60 * 1,
	});

	const txQuery = useQuery<TransactionType[]>({
		queryKey: ["api/transactions"],
		queryFn: fetchTransactions,
		// staleTime: 100 * 20 * 1,
	});

	return { cardsQuery, txQuery };
}
