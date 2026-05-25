export default function NotificationSection() {
	return (
		<div className="mx-auto w-full max-w-[1200px]">
			<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-6 sm:p-7 card-emboss">
				<div className="text-lg sm:text-xl font-medium mb-1">Уведомления</div>
				<div className="text-white/60 text-sm mb-6">
					Выберите каналы и события. Порог крупной операции укажите в вашей
					валюте отображения.
				</div>

				<div className="grid lg:grid-cols-2 gap-6">
					<div className="bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="text-sm text-white/60 mb-2">Каналы</div>
						<label className="flex items-center gap-3 text-sm mb-2">
							<input id="nfEmail" type="checkbox" /> E-mail
						</label>
						<label className="flex items-center gap-3 text-sm mb-2">
							<input id="nfPush" type="checkbox" /> Push
						</label>
						<label className="flex items-center gap-3 text-sm">
							<input id="nfSMS" type="checkbox" /> SMS
						</label>
						<div className="h-2"></div>
						<label className="flex items-center gap-3 text-sm">
							<input id="nfMarketing" type="checkbox" /> Получать новости/акции
						</label>
					</div>

					<div className="bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="text-sm text-white/60 mb-2">События</div>
						<label className="flex items-center gap-3 text-sm mb-2">
							<input id="nfLogin" type="checkbox" /> Вход в систему
						</label>
						<label className="flex items-center gap-3 text-sm mb-2">
							<input id="nfSusp" type="checkbox" /> Подозрительный вход
						</label>
						<label className="flex items-center gap-3 text-sm mb-2">
							<input id="nfOutgoing" type="checkbox" /> Исходящие
							переводы/платежи
						</label>
						<label className="flex items-center gap-3 text-sm">
							<input id="nfLarge" type="checkbox" /> Крупные операции свыше
						</label>
						<div className="mt-2">
							<input
								id="nfLargeAmt"
								type="number"
								min="0"
								value="100000"
								className="w-56 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							/>
						</div>
					</div>

					<div className="bg-white/5 border border-white/10 rounded-xl p-5 lg:col-span-2">
						<div className="text-sm text-white/60 mb-2">Ежедневная сводка</div>
						<label className="flex items-center gap-3 text-sm">
							<input id="nfDigest" type="checkbox" /> Присылать краткую выписку
						</label>
						<div className="mt-2">
							<label className="text-sm text-white/60">Время отправки</label>
							<input
								id="nfDigestTime"
								type="time"
								value="09:00"
								className="mt-2 w-40 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3"
							/>
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					<button id="btnSaveNotif" className="px-5 py-3 rounded-xl cta-button">
						Сохранить
					</button>
					<span
						id="notifMsg"
						className="text-sm text-white/60 self-center"
					></span>
				</div>
			</div>
		</div>
	);
}
