export default function SecuritySection() {
	return (
		<div className="mx-auto w-full max-w-[1200px]">
			<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-6 sm:p-7 card-emboss">
				<div className="text-lg sm:text-xl font-medium mb-4">Безопасность</div>

				<div className="grid lg:grid-cols-2 gap-6">
					<div className="bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="flex items-start justify-between gap-3">
							<div>
								<div className="text-base font-medium">
									Двухфакторная аутентификация (2FA)
								</div>
								<div className="text-white/60 text-sm mt-1">
									Второй фактор при входе (приложение-генератор кода).
								</div>
							</div>
							<div className="shrink-0">
								<span className="px-2 py-1 text-xs rounded bg-white/10">
									Выключено
								</span>
							</div>
						</div>

						<div className="mt-4">
							<button
								id="btnEnable2FA"
								className="px-4 py-2 rounded-xl cta-button"
							>
								Включить 2FA
							</button>
						</div>
					</div>

					<div className="bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="text-base font-medium mb-2">Изменение пароля</div>
						<div className="grid gap-4">
							<div>
								<label className="text-sm text-white/60">Текущий пароль</label>
								<input
									id="pwdOld"
									type="password"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
								/>
							</div>
							<div>
								<label className="text-sm text-white/60">Новый пароль</label>
								<input
									id="pwdNew"
									type="password"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
								/>
								<div id="pwdMeter" className="text-xs text-white/60 mt-1">
									Сила: —
								</div>
							</div>
							<div>
								<label className="text-sm text-white/60">
									Повторите новый пароль
								</label>
								<input
									id="pwdNew2"
									type="password"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
								/>
							</div>
						</div>
						<div className="mt-4 flex flex-wrap gap-3">
							<button
								id="btnChangePwd"
								className="px-4 py-2 rounded-xl cta-button"
							>
								Сохранить
							</button>
							<span
								id="pwdMsg"
								className="text-sm text-white/60 self-center"
							></span>
						</div>
					</div>

					<div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
							<div className="text-base font-medium">Активные сессии</div>
							<button
								id="btnRevokeOther"
								className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
							>
								Завершить все, кроме текущей
							</button>
						</div>
						<div className="overflow-x-auto hide-scroll mt-3">
							<table className="min-w-full text-sm">
								<thead className="text-white/60">
									<tr className="text-left">
										<th className="py-2 pr-4">Устройство</th>
										<th className="py-2 pr-4">IP</th>
										<th className="py-2 pr-4">Город</th>
										<th className="py-2 pr-4">Активность</th>
										<th className="py-2 pr-4">Действие</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-white/5">
									<tr>
										<td className="py-2 pr-4">Chrome • Windows</td>
										<td className="py-2 pr-4">192.168.1.10</td>
										<td className="py-2 pr-4">Bishkek</td>
										<td className="py-2 pr-4 whitespace-nowrap">
											2025-08-24 18:20
										</td>
										<td className="py-2 pr-4">
											<span className="px-2 py-1 text-xs rounded bg-emerald-500/20 text-emerald-300">
												Текущая
											</span>
										</td>
									</tr>
									<tr>
										<td className="py-2 pr-4">iPhone 14 • iOS</td>
										<td className="py-2 pr-4">10.10.10.5</td>
										<td className="py-2 pr-4">Almaty</td>
										<td className="py-2 pr-4 whitespace-nowrap">
											2025-08-21 01:12
										</td>
										<td className="py-2 pr-4">
											<button
												data-revoke="sess-2"
												className="px-2 py-1 rounded bg-white/10 border border-white/10 text-xs"
											>
												Завершить
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="text-base font-medium">
							История входов и активности
						</div>
						<div className="overflow-x-auto hide-scroll mt-3">
							<table className="min-w-full text-sm">
								<thead className="text-white/60">
									<tr className="text-left">
										<th className="py-2 pr-4">Дата</th>
										<th className="py-2 pr-4">IP</th>
										<th className="py-2 pr-4">Город</th>
										<th className="py-2 pr-4">Устройство</th>
										<th className="py-2 pr-4">Статус</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-white/5">
									<tr>
										<td className="py-2 pr-4 whitespace-nowrap">
											2025-08-24 18:20
										</td>
										<td className="py-2 pr-4">192.168.1.10</td>
										<td className="py-2 pr-4">Bishkek</td>
										<td className="py-2 pr-4">Chrome • Windows</td>
										<td className="py-2 pr-4">ok</td>
									</tr>
									<tr>
										<td className="py-2 pr-4 whitespace-nowrap">
											2025-08-21 01:12
										</td>
										<td className="py-2 pr-4">10.10.10.5</td>
										<td className="py-2 pr-4">Almaty</td>
										<td className="py-2 pr-4">iPhone 14 • iOS</td>
										<td className="py-2 pr-4">ok</td>
									</tr>
									<tr>
										<td className="py-2 pr-4 whitespace-nowrap">
											2025-08-18 15:02
										</td>
										<td className="py-2 pr-4">172.16.0.2</td>
										<td className="py-2 pr-4">Moscow</td>
										<td className="py-2 pr-4">Safari • macOS</td>
										<td className="py-2 pr-4">2FA failed</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="flex flex-wrap gap-2 justify-end mt-3">
							<button
								id="lgPrev"
								className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
							>
								Назад
							</button>
							<button
								id="lgNext"
								className="px-3 py-2 rounded-xl bg-white/10 border border-white/10"
							>
								Вперёд
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
