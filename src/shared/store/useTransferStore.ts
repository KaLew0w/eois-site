import { create } from "zustand";

interface TransferStore {
	activeTab: "own" | "p2p" | "external" | "history";
	confirmVisible: boolean;
	setActiveTab: (tab: TransferStore["activeTab"]) => void;
	openConfirm: () => void;
	closeConfirm: () => void;
}

export const useTransferStore = create<TransferStore>((set) => ({
	activeTab: "own",
	confirmVisible: false,
	setActiveTab: (tab) => set({ activeTab: tab }),
	openConfirm: () => set({ confirmVisible: true }),
	closeConfirm: () => set({ confirmVisible: false }),
}));
