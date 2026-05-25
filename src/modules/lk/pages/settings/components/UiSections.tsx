export default function UiSection() {
	return (
		<div className="mx-auto w-full max-w-[1200px]">
			<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-6 sm:p-7 card-emboss">
				<div className="text-lg sm:text-xl font-medium mb-1">Интерфейс</div>
				<div className="text-white/60 text-sm mb-6">
					Выберите язык, форматы, стартовую страницу и удобство отображения.
					Валюту и темы карт не трогаем.
				</div>

				<div className="grid lg:grid-cols-2 gap-6">
					<div className="bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="text-sm text-white/60 mb-2">Локализация</div>
						<div className="grid sm:grid-cols-2 gap-4">
							<div>
								<label className="text-sm text-white/60">Язык</label>
								<select
									id="uiLang"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white [&>option]:text-gray-900 [&>option]:bg-white"
								>
									<option value="ru">Русский</option>
									<option value="en">English</option>
								</select>
							</div>
							<div>
								<label className="text-sm text-white/60">Часовой пояс</label>
								<select
									id="uiTZ"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white [&>option]:text-gray-900 [&>option]:bg-white"
								>
									<option>Asia/Bishkek</option>
									<option>Asia/Almaty</option>
									<option>Europe/Moscow</option>
									<option>Europe/Berlin</option>
									<option>UTC</option>
								</select>
							</div>
							<div>
								<label className="text-sm text-white/60">Формат даты</label>
								<select
									id="uiDateFmt"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white [&>option]:text-gray-900 [&>option]:bg-white"
								>
									<option>DD.MM.YYYY</option>
									<option>YYYY-MM-DD</option>
									<option>MM/DD/YYYY</option>
								</select>
							</div>
							<div>
								<label className="text-sm text-white/60">Время</label>
								<select
									id="uiTimeFmt"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white [&>option]:text-gray-900 [&>option]:bg-white"
								>
									<option value="24h">24 часа</option>
									<option value="12h">12 часов (AM/PM)</option>
								</select>
							</div>
							<div className="sm:col-span-2">
								<label className="text-sm text-white/60">Формат чисел</label>
								<select
									id="uiNumFmt"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white [&>option]:text-gray-900 [&>option]:bg-white"
								>
									<option value="space-comma">
										1 234,56 (пробел &amp; запятая)
									</option>
									<option value="comma-dot">
										1,234.56 (запятая &amp; точка)
									</option>
								</select>
							</div>
						</div>
					</div>

					<div className="bg-white/5 border border-white/10 rounded-xl p-5">
						<div className="text-sm text-white/60 mb-2">Поведение</div>
						<div className="grid sm:grid-cols-2 gap-4">
							<div>
								<label className="text-sm text-white/60">
									Стартовая страница
								</label>
								<select
									id="uiStart"
									className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white [&>option]:text-gray-900 [&>option]:bg-white"
								>
									<option value="overview">Дэшборд</option>
									<option value="wallets">Кошельки</option>
									<option value="cards">Карты</option>
									<option value="exchange">Обмен</option>
									<option value="transfers">Переводы</option>
									<option value="history">История</option>
									<option value="balances">Балансы</option>
									<option value="settings">Настройки</option>
								</select>
							</div>
							<div></div>
							<div className="sm:col-span-2">
								<label className="flex items-center gap-3 mt-2 text-sm">
									<input id="uiSidebar" type="checkbox" /> Закрепить левое меню
								</label>
								<label className="flex items-center gap-3 mt-2 text-sm">
									<input id="uiTips" type="checkbox" /> Показывать подсказки
								</label>
								<label className="flex items-center gap-3 mt-2 text-sm">
									<input id="uiMotion" type="checkbox" /> Меньше анимаций
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					<button id="btnSavePrefs" className="px-5 py-3 rounded-xl cta-button">
						Сохранить
					</button>
					<span id="uiMsg" className="text-sm text-white/60 self-center"></span>
				</div>
			</div>
		</div>
	);
}
