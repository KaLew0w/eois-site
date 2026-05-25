import React from "react";

export default function MetricsBlock() {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
			<div className="block bg-gray-800/80 border border-gray-700 rounded-2xl p-4">
				<div className="text-gray-300 text-sm">Общий баланс (в USDT)</div>
				<div className="mt-2 text-2xl font-semibold">12,540.75 USDT</div>
				<div className="mt-2 text-xs text-gray-400">
					Fiat: 12,000 • Crypto: 540.75
				</div>
			</div>

			<div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-4">
				<div className="text-gray-300 text-sm">Кэшбэк за месяц</div>
				<div className="mt-2 text-2xl font-semibold">—</div>
				<div className="mt-2 text-xs text-gray-400">Подключается с бэка</div>
			</div>

			<div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-4">
				<div className="text-gray-300 text-sm">Расходы в этом месяце</div>
				<div className="mt-2 text-2xl font-semibold">0 RUB</div>
				<div className="mt-2 text-xs text-gray-400">По данным истории</div>
			</div>

			<div className="bg-gray-800/80 border border-gray-700 rounded-2xl p-4">
				<div className="text-gray-300 text-sm">Курсы</div>
				<div className="mt-2 text-2xl font-semibold">С бэкенда</div>
				<div className="mt-2 text-xs text-gray-400">USDT/Fiat/Crypto</div>
			</div>
		</section>
	);
}
