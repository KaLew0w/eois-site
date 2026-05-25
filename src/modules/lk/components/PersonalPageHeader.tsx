import { useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown, Menu } from "lucide-react";
import UserLogo from "@/assets/images/account.png";
import { useContext } from "react";
import { AuthContext } from "@/shared/store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/lk/hooks/useAuth";
import { userMenuItems } from "@/config/menu/userMenuItems";

export default function PersonalPageHeader() {
	const auth = useContext(AuthContext);
	const { logout } = useAuth();
	const user = auth?.user;
	const [menuOpen, setMenuOpen] = useState(false);
	const [siderMenuOpen, setSiderMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	// Закрытие меню при клике вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setMenuOpen(false);
				setSiderMenuOpen(false);
			}
		};
		document.addEventListener("keydown", onEsc);
		return () => document.removeEventListener("keydown", onEsc);
	}, []);

	// Синхронизируем состояние сайдера с оверлеем MobileSider
	useEffect(() => {
		const overlay = document.getElementById("sidebarOverlay");
		if (!overlay) return;

		if (siderMenuOpen) {
			overlay.classList.remove("hidden");
		} else {
			overlay.classList.add("hidden");
		}

		const handleOverlayClick = (e: MouseEvent) => {
			if (e.target === overlay) {
				setSiderMenuOpen(false);
			}
		};

		overlay.addEventListener("click", handleOverlayClick);
		return () => overlay.removeEventListener("click", handleOverlayClick);
	}, [siderMenuOpen]);

	return (
		<>
			{/* // -- Mobile topbar -- */}
			<header className="flex md:hidden fixed left-0 right-0 top-0 z-50 h-14 bg-[#1A1A1A] border-b border-[#00eefd]/10 flex items-center justify-between px-4">
				<button onClick={() => setSiderMenuOpen(prev => !prev)} id="btnSidebar" className="h-9 w-9 rounded-xl hover:bg-white/10 flex items-center justify-center">
					<Menu />
				</button>
				<div className="ml-auto relative">
					<div id="userBtnMobile" className="relative flex flex-col h-full" ref={menuRef}>
						{/* Кнопка пользователя */}
						<button
							id="userBtn"
							className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/10 focus:outline-none cursor-pointer"
							onClick={() => setMenuOpen((prev) => !prev)}
						>
							<div className="text-right">
								<div id="userFullNameMobile" className="text-sm font-medium leading-4 truncate max-w-[52vw]">{user?.name || "Пользователь"}</div>
								<div id="userIdMobile" className="text-[11px] text-white/50 leading-4 truncate max-w-[52vw]">ID {user?.id.slice(0, 8)}</div>
							</div>
							<img
								id="userAvatar"
								src={UserLogo}
								alt="avatar"
								className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
							/>
							<div className="text-left hidden md:block">
								<div id="userFullName" className="text-sm font-medium">
									{user?.firstName || "Пользователь"}
								</div>
								{user?.id && (
									<div id="userIdLabel" className="text-xs text-white/50">
										ID {user?.id.slice(0, 8)}
									</div>
								)}
							</div>
							{/* <ChevronDown size={16} className="opacity-70" /> */}
						</button>

						{/* Выпадающее меню */}
						{menuOpen && (
							<div
								id="userMenu"
								className="absolute right-0 mt-12 w-56 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
							>
								{userMenuItems.map(({ label, path, icon: Icon }) => (
									<button
										key={label}
										onClick={() => {
											navigate(path);
											setMenuOpen(false);
										}}
										className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-sm text-left cursor-pointer"
									>
										<Icon size={16} />
										<span>{label}</span>
									</button>
								))}

								<div className="border-t border-white/10 my-1"></div>

								<button
									onClick={logout}
									className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-sm text-left cursor-pointer"
								>
									<LogOut size={16} />
									<span>Выйти</span>
								</button>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Desktop topbar */}
			<header className="hidden md:flex items-center justify-end h-14 mb-4 relative">
				<div className="relative flex flex-col h-full" ref={menuRef}>
					{/* Кнопка пользователя */}
					<button
						id="userBtn"
						className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/10 focus:outline-none cursor-pointer"
						onClick={() => setMenuOpen((prev) => !prev)}
					>
						<img
							id="userAvatar"
							src={UserLogo}
							alt="avatar"
							className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
						/>
						<div className="text-left hidden md:block">
							<div id="userFullName" className="text-sm font-medium">
								{user?.firstName || "Пользователь"}
							</div>
							{user?.id && (
								<div id="userIdLabel" className="text-xs text-white/50">
									ID {user?.id.slice(0, 8)}
								</div>
							)}
						</div>
						<ChevronDown size={16} className="opacity-70" />
					</button>

					{/* Выпадающее меню */}
					{menuOpen && (
						<div
							id="userMenu"
							className="absolute right-0 mt-2 w-56 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
						>
							{userMenuItems.map(({ label, path, icon: Icon }) => (
								<button
									key={label}
									onClick={() => {
										navigate(path);
										setMenuOpen(false);
										setSiderMenuOpen(false);
										const overlay = document.getElementById("sidebarOverlay");
										if (overlay) overlay.classList.add("hidden");
									}}
									className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-sm text-left cursor-pointer"
								>
									<Icon size={16} />
									<span>{label}</span>
								</button>
							))}

							<div className="border-t border-white/10 my-1"></div>

							<button
								onClick={logout}
								className="w-full flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-sm text-left cursor-pointer"
							>
								<LogOut size={16} />
								<span>Выйти</span>
							</button>
						</div>
					)}
				</div>
			</header>
		</>
	);
}
