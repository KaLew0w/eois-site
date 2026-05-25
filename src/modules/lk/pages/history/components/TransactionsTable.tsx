import type { HistoryDataType } from "@/shared/types/historyDataType";

export default function TransactionsTable({
	items,
}: {
	items: HistoryDataType[];
}) {
	return (
		<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-3 card-emboss overflow-x-auto">
			<table className="min-w-full text-sm">
				<thead className="text-white/60">
					<tr className="text-left">
						<th className="py-2 pr-4">Дата</th>
						<th className="py-2 pr-4">Описание</th>
						<th className="py-2 pr-4">Категория</th>
						<th className="py-2 pr-4">Сумма</th>
						<th className="py-2 pr-4">Статус</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-white/5">
					{items.map((tx) => (
						<tr key={tx.id}>
							<td className="py-2 pr-4 whitespace-nowrap">
								{new Date(tx.dt).toLocaleString("ru-RU", {
									dateStyle: "short",
									timeStyle: "medium",
								})}
							</td>
							<td className="py-2 pr-4">{tx.descr}</td>
							<td className="py-2 pr-4">{tx.category}</td>
							<td
								className={`py-2 pr-4 ${
									tx.amount >= 0 ? "text-emerald-400" : ""
								}`}
							>
								{tx.amount >= 0 ? "+ " : "− "}
								{Math.abs(tx.amount).toLocaleString("ru-RU")}{" "}
								{tx.currency || ""}
							</td>
							<td className="py-2 pr-4">
								<span
									className={`px-2 py-1 text-xs rounded ${
										tx.status === "done"
											? "bg-emerald-500/20 text-emerald-400"
											: tx.status === "pending"
											? "bg-yellow-500/20 text-yellow-400"
											: "bg-white/10 text-white/60"
									}`}
								>
									{tx.status || "—"}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div id="historyPager">
				<div className="flex items-center justify-between mt-4">
					<div className="text-sm text-white/60">Показано 1–12 из 12</div>
					<div className="flex gap-2">
						<button
							id="pgPrev"
							className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 cursor-pointer"
						>
							Назад
						</button>
						<button
							id="pgNext"
							className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 cursor-pointer"
						>
							Вперёд
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
