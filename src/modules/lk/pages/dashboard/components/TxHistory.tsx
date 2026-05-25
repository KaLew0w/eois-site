import React from "react";
import type { TransactionType } from "@/shared/types/transactionType";

interface Props {
	tx: TransactionType[];
}

export default function TxHistory({ tx }: Props) {
	return (
		<div className="col-span-full bg-gray-800/80 border border-gray-700 rounded-2xl p-5">
			<div className="flex items-center justify-between">
				<h3 className="text-white/90">Последние операции</h3>
				<div className="flex items-center gap-3">
					<a href="#/transactions" className="text-cyan-400 text-sm">
						Перейти в историю
					</a>
					<a href="#/cards" className="text-cyan-400 text-sm">
						Карточная история
					</a>
				</div>
			</div>

			<div className="overflow-x-auto mt-4">
				<table className="min-w-full text-sm">
					<thead className="text-gray-400 text-left">
						<tr>
							<th className="py-2 pr-4">Дата</th>
							<th className="py-2 pr-4">Описание</th>
							<th className="py-2 pr-4">Сумма</th>
							<th className="py-2 pr-4">Статус</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-700">
						{tx.length === 0 ? (
							<tr>
								<td className="py-3 text-gray-400">Пока нет операций</td>
							</tr>
						) : (
							tx.map((t) => (
								<tr key={t.id}>
									<td className="py-3 text-gray-300">{t.date}</td>
									<td className="py-3 text-gray-300">{t.descr}</td>
									<td
										className={`py-3 ${
											t.amount < 0 ? "text-red-400" : "text-green-400"
										}`}
									>
										{t.amount} {t.currency}
									</td>
									<td className="py-3 text-gray-300">{t.status}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
