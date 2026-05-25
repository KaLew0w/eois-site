import { useAuth } from "@/modules/lk/hooks/useAuth";

export default function ProfileSection() {
	const auth = useAuth();
	const user = auth?.user;
	return (
		<div className="mx-auto w-full max-w-[1200px] ">
			<div className="bg-[#1A1A1A]/90 border border-white/10 rounded-2xl p-6 sm:p-7 card-emboss">
				<div className="text-lg sm:text-xl font-medium mb-4">Профиль</div>

				<div className="grid lg:grid-cols-[260px,1fr] gap-6">
					<div className="bg-white/5 border border-white/10 rounded-xl p-4">
						<div className="text-sm text-white/60 mb-2">Аватар</div>
						<div className="flex items-center gap-4">
							<div className="h-24 w-24 rounded-full overflow-hidden bg-white/10 border border-white/10"></div>
							<div className="flex-1">
								<input
									id="prAvatar"
									type="file"
									accept="image/*"
									className="block w-full text-sm"
								/>
								<div className="text-xs text-white/50 mt-1">
									PNG/JPG до ~2 МБ
								</div>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="text-sm text-white/60">ФИО</label>
							<input
								id="prName"
								value={user?.name}
								className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
							/>
							<div className="text-xs text-white/50 mt-1">
								Как в документах / для контрактов
							</div>
						</div>
						<div>
							<label className="text-sm text-white/60">Отображаемое имя</label>
							<input
								id="prDisplay"
								value={user?.firstName}
								className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
							/>
						</div>

						<div>
							<label className="text-sm text-white/60">Основной e-mail</label>
							<input
								id="prEmail"
								value={user?.email}
								className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
							/>
						</div>
						<div>
							<label className="text-sm text-white/60">Резервный e-mail</label>
							<input
								id="prEmailAlt"
								value={user?.backupEmail}
								className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
							/>
						</div>

						<div>
							<label className="text-sm text-white/60">Телефон</label>
							<input
								id="prPhone"
								value={user?.phoneNumber}
								className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
							/>
						</div>
						<div>
							<label className="text-sm text-white/60">Telegram</label>
							<input
								id="prTg"
								value={user?.telegram}
								className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4"
								placeholder="@username"
							/>
						</div>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap gap-3">
					<button
						id="btnSaveProfile"
						className="px-5 py-3 rounded-xl cta-button"
					>
						Сохранить
					</button>
					<span id="prMsg" className="text-sm text-white/60 self-center"></span>
				</div>
			</div>
		</div>
	);
}
