import { api } from "@/modules/lk/api/api";
import type { CardType } from "@/shared/types/cardsType";

export interface CardLimits {
	day: number;
	week: number;
	month: number;
}

export interface CardSecurity {
	online: boolean;
	atm: boolean;
	foreign: boolean;
	contactless: boolean;
	require3DS: boolean;
}

export interface CardDetails extends CardType {
	limits?: CardLimits;
	security?: CardSecurity;
	walletTokens?: {
		google: boolean;
		apple: boolean;
	};
}

export const fetchCards = async (): Promise<CardDetails[]> => {
	const { data } = await api.get("/api/cards");
	return data;
};

export const fetchCardById = async (id: string): Promise<CardDetails> => {
	const { data } = await api.get(`/api/cards/${id}`);
	return data;
};

export const freezeCard = async (id: string): Promise<CardDetails> => {
	const { data } = await api.post(`/api/cards/${id}/freeze`);
	return data;
};

export const unfreezeCard = async (id: string): Promise<CardDetails> => {
	const { data } = await api.post(`/api/cards/${id}/unfreeze`);
	return data;
};

export const renameCard = async (
	id: string,
	name: string,
): Promise<CardDetails> => {
	const { data } = await api.patch(`/api/cards/${id}`, { name });
	return data;
};

export const updateCardLimits = async (
	id: string,
	limits: CardLimits,
): Promise<CardDetails> => {
	const { data } = await api.patch(`/api/cards/${id}/limits`, limits);
	return data;
};

export const updateCardSecurity = async (
	id: string,
	security: CardSecurity,
): Promise<CardDetails> => {
	const { data } = await api.patch(`/api/cards/${id}/security`, security);
	return data;
};

export const updateCardGradient = async (
	id: string,
	gradient: string,
): Promise<CardDetails> => {
	const { data } = await api.patch(`/api/cards/${id}`, { gradient });
	return data;
};

export const deleteCard = async (id: string): Promise<void> => {
	await api.delete(`/api/cards/${id}`);
};

export const revealCardDetails = async (
	id: string,
): Promise<{ pan: string; exp: string; cvv: string }> => {
	const { data } = await api.post(`/api/cards/${id}/reveal`);
	return data;
};
