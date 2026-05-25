import { useAuth } from "@/modules/lk/hooks/useAuth";
import { NavLink, useLocation } from "react-router-dom";
import LogoWhite from "@/assets/images/logo_white.png";
import packageJson from "@/../package.json";
import { useState, useEffect } from "react";
import { menuItems } from '@/config/menu/menuItems'


export default function DesktopSider() {
	const { logout } = useAuth();
	const location = useLocation();
	const [active, setActive] = useState("/lk/dashboard");

	useEffect(() => {
		const current = menuItems.find((item) => {
			if (item.path === "/lk") {
				return location.pathname === "/lk"; // строгое совпадение
			}
			return location.pathname.startsWith(item.path);
		});
		if (current) {
			setActive(current.path);
		}
	}, [location.pathname]);

	return (
		<>
			{/* <div id="sidebarOverlay" className="fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1A1A] border-r border-[#00eefd]/10 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:transform-none flex flex-col justify-between py-6 px-4 -translate-x-full lg"> */}
				<aside
					className="hidden md:flex inset-y-0 left-0 z-50 w-64 bg-[#1A1A1A] border-r border-[#00eefd]/10
                 lg:translate-x-0 lg:static flex flex-col justify-between py-6 px-4"
				>
					<div className="mt-14 lg:mt-0">
						<a href="#/dashboard" className="block mb-10">
							<img src={LogoWhite} alt="The One" className="h-12 ml-1" />
						</a>

						<nav className="mt-4 flex flex-col gap-1">
							{menuItems.map(({ name, path, icon: Icon }) => {
								const isActive = active === path;

								return (
								<NavLink
										key={path}
										to={path}
									onClick={() => {
										setActive(path);
										const overlay = document.getElementById("sidebarOverlay");
										if (overlay) overlay.classList.add("hidden");
									}}
										className={`flex items-center gap-3 p-2 rounded-md transition-colors w-full ${isActive
											? "text-[#00eefd] bg-white/5"
											: "text-gray-300 hover:text-[#00eefd]"
											}`}
									>
										<Icon className="w-5 h-5" />
										<span>{name}</span>
									</NavLink>
								);
							})}
						</nav>
					</div>

					<div className="space-y-4 mt-auto">
						<button
							onClick={logout}
							id="btnLogoutSidebar"
							className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm cursor-pointer"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="w-4 h-4"
							>
								<path d="m16 17 5-5-5-5"></path>
								<path d="M21 12H9"></path>
								<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
							</svg>
							Выйти
						</button>

						<div className="text-xs text-white/40 px-2">
							<div>© The One</div>
							<div>Версия: {packageJson.version}</div>
						</div>
					</div>
				</aside>
			{/* </div> */}
		</>
	);
}
