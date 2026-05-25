import type { HistoryDataType } from "@/shared/types/historyDataType";

/** 🔽 Простая функция для экспорта CSV */
export function exportToCSV(data: HistoryDataType[]) {
	const headers = [
		"Дата",
		"Описание",
		"Категория",
		"Сумма",
		"Валюта",
		"Статус",
	];
	const rows = data.map((t) => [
		new Date(t.dt).toLocaleString(),
		t.descr,
		t.category,
		t.amount,
		t.currency,
		t.status,
	]);

	const csvContent =
		"data:text/csv;charset=utf-8," +
		[headers, ...rows].map((e) => e.join(";")).join("\n");

	const encodedUri = encodeURI(csvContent);
	const link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "transfer_history.csv");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
