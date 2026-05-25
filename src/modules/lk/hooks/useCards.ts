import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	fetchCards,
	fetchCardById,
	freezeCard,
	unfreezeCard,
	renameCard,
	updateCardLimits,
	updateCardSecurity,
	updateCardGradient,
	deleteCard,
	revealCardDetails,
	type CardDetails,
	type CardLimits,
	type CardSecurity,
} from "@/modules/lk/services/cardsService";

export function useCards() {
	return useQuery({
		queryKey: ["cards"],
		queryFn: fetchCards,
	});
}

export function useCard(id: string) {
	return useQuery({
		queryKey: ["cards", id],
		queryFn: () => fetchCardById(id),
		enabled: !!id,
	});
}

export function useFreezeCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: freezeCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
		},
	});
}

export function useUnfreezeCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: unfreezeCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
		},
	});
}

export function useRenameCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, name }: { id: string; name: string }) =>
			renameCard(id, name),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			queryClient.invalidateQueries({ queryKey: ["cards", variables.id] });
		},
	});
}

export function useUpdateCardLimits() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, limits }: { id: string; limits: CardLimits }) =>
			updateCardLimits(id, limits),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			queryClient.invalidateQueries({ queryKey: ["cards", variables.id] });
		},
	});
}

export function useUpdateCardSecurity() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, security }: { id: string; security: CardSecurity }) =>
			updateCardSecurity(id, security),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			queryClient.invalidateQueries({ queryKey: ["cards", variables.id] });
		},
	});
}

export function useUpdateCardGradient() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, gradient }: { id: string; gradient: string }) =>
			updateCardGradient(id, gradient),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			queryClient.invalidateQueries({ queryKey: ["cards", variables.id] });
		},
	});
}

export function useDeleteCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCard,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
		},
	});
}

export function useRevealCardDetails() {
	return useMutation({
		mutationFn: revealCardDetails,
	});
}
