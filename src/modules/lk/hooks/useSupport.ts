import { useQuery } from "@tanstack/react-query";
import { api } from "@/modules/lk/api/api";

export function useFAQ() {
	return useQuery({
		queryKey: ["faq"],
		queryFn: async () => {
			console.log("Making request to:", "/api/support/faq");
			const { data } = await api.get("/api/support/faq");
			console.log("Received data:", data);
			return data;
		},
	});
}

export function useGuides() {
	return useQuery({
		queryKey: ["guides"],
		queryFn: async () => {
			console.log("Making request to:", "/api/support/guides");
			const { data } = await api.get("/api/support/guides");
			console.log("Received data:", data);
			return data;
		},
	});
}
