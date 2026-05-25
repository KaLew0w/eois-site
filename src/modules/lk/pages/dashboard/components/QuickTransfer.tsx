import React from "react";

export default function QuickTransfer() {
	return (
		<div className="min-w-0 bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-5 card-emboss h-full">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">Быстрый перевод</h2>
				<span className="text-xs text-white/50">P2P</span>
			</div>

			<form id="transferForm" className="mt-4 space-y-3">
				<div>
					<label className="text-sm text-white/60">Кому</label>
					<input
						id="trTo"
						className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
						placeholder="ID / карта / e-mail"
					/>
				</div>
				<div className="grid grid-cols-3 gap-3">
					<div className="col-span-2">
						<label className="text-sm text-white/60">Сумма</label>
						<input
							id="trAmt"
							type="number"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							placeholder="0.00"
						/>
					</div>
					<div>
						<label className="text-sm text-white/60">Валюта</label>
						<select
							id="trCur"
							className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3 text-white [&>option]:text-gray-900 [&>option]:bg-white"
						>
							<option selected>USD</option>
							<option>KGS</option>
							<option>RUB</option>
						</select>
					</div>
				</div>
				<div>
					<label className="text-sm text-white/60">Комментарий</label>
					<input
						id="trMemo"
						className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
						placeholder="Сообщение получателю"
					/>
				</div>
				<a
					href="#"
					id="btnTransfer"
					className="cta-button w-full block text-center py-2.5 rounded-xl"
				>
					Отправить
				</a>
				<p id="transferMsg" className="text-xs text-white/60 hidden">
					Отправка…
				</p>
			</form>
		</div>
	);
}
