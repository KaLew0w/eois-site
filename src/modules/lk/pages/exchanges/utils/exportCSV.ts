import type { ExchangeRow } from "@/modules/lk/api/exchange";

const CSV_HEADERS = [
	"id",
	"dt",
	"side",
	"fromWallet",
	"toWallet",
	"fromStr",
	"toStr",
	"rate",
	"fee",
	"status",
] as const;

function quote(s: string | number | undefined | null): string {
	return `"${String(s ?? "").replace(/"/g, '""')}"`;
}

export function exportExchangesCSV(rows: ExchangeRow[], filenamePrefix = "exchanges"): void {
	const csv =
		CSV_HEADERS.join(",") +
		"\n" +
		rows.map((r) => CSV_HEADERS.map((k) => quote(r[k])).join(",")).join("\n");
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `${filenamePrefix}-${new Date().toISOString().slice(0, 10)}.csv`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}
