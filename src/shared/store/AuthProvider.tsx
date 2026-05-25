import React, { useCallback, useEffect, useState } from "react";
import type { Props } from "@/shared/types/propsType";
import type { User } from "@/shared/types/userDataType";
import keycloakInstance from "@/shared/config/keycloak/keycloak";
import type { AuthContextType } from "@/shared/types/authContextType";

const KC_USER_STORAGE_KEY = "kc_user";

export const AuthContext = React.createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: Props) {
	// Keycloak состояния
	const [initialized, setInitialized] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [isLoading, setLoading] = useState(true);

	// Пользовательские состояния
	const [user, setUser] = useState<User | null>(() => {
		if (typeof window === "undefined") return null;

		try {
			const stored = window.localStorage.getItem(KC_USER_STORAGE_KEY);
			if (!stored) return null;

			const parsed = JSON.parse(stored) as User;
			console.log("🔵 [AuthProvider] Loaded user from localStorage:", {
				hasToken: !!parsed.token,
				hasRefreshToken: !!parsed.refreshToken,
				hasIdToken: !!parsed.idToken,
				timeSkew: parsed.timeSkew,
			});
			return parsed;
		} catch (error) {
			console.warn("⚠️ [AuthProvider] Failed to parse kc_user from localStorage:", error);
			return null;
		}
	});

	// Инициализация Keycloak
	useEffect(() => {
		let mounted = true;
		console.log("Starting Keycloak initialization...");

		const initKeycloak = async () => {
			try {
				// Пытаемся восстановить сессию из localStorage, передавая токены в init,
				// как описано в документации Keycloak (options: token, refreshToken, idToken, timeSkew)
				const initOptions: any = {
					onLoad: "check-sso",
					pkceMethod: "S256",
					checkLoginIframe: false,
					silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",

				};

				if (user?.token) {
					initOptions.token = user.token;
				}
				if (user?.refreshToken) {
					initOptions.refreshToken = user.refreshToken;
				}
				if (user?.idToken) {
					initOptions.idToken = user.idToken;
				}
				if (typeof user?.timeSkew === "number") {
					initOptions.timeSkew = user.timeSkew;
				}

				console.log("🔵 [AuthProvider] Keycloak init options with persisted tokens:", {
					hasUserInState: !!user,
					hasToken: !!user?.token,
					hasRefreshToken: !!user?.refreshToken,
					hasIdToken: !!user?.idToken,
					timeSkew: user?.timeSkew,
				});

				const auth = await keycloakInstance.init(initOptions);

				// if (!mounted) return;

				setAuthenticated(auth);
				setInitialized(true);
				setLoading(false);

				// Очищаем параметры query, чтобы React Router правильно рендерил страницу
				if (window.location.search) {
					const cleanUrl = window.location.origin + window.location.pathname;
					window.history.replaceState({}, document.title, cleanUrl);
				}

				console.log("Keycloak initialized successfully, authenticated:", auth);
			} catch (error) {
				console.log("Keycloak initialization failed:", error);
				setAuthenticated(false);
				if (typeof window !== "undefined") {
					window.localStorage.removeItem(KC_USER_STORAGE_KEY);
				}
			} finally {
				if (mounted) setLoading(false);
			}
		};
		initKeycloak();

		return () => {
			mounted = false;
		};
	}, []);

	// Обработка данных пользователя
	useEffect(() => {
		if (!initialized || !authenticated) {
			setUser(null);
			if (typeof window !== "undefined") {
				window.localStorage.removeItem(KC_USER_STORAGE_KEY);
			}
			return;
		}

		if (authenticated && keycloakInstance.tokenParsed) {
			const parsedData = keycloakInstance.tokenParsed;
			console.log("Parsed token:", parsedData);

			const userData: User = {
				name: parsedData.name || "-",
				email: parsedData.email || "-",
				backupEmail: parsedData.backup_email,
				phoneNumber: parsedData.phone_number,
				telegram: parsedData.telegram,
				firstName: parsedData.given_name || "-",
				secondName: parsedData.family_name || "-",
				id: parsedData.sub || "-",
				roles: parsedData.roles || [],
				token: keycloakInstance.token || "",
				refreshToken: keycloakInstance.refreshToken || undefined,
				idToken: keycloakInstance.idToken || undefined,
				timeSkew: keycloakInstance.timeSkew ?? undefined,
			};

			setUser(userData);

			if (typeof window !== "undefined") {
				try {
					window.localStorage.setItem(KC_USER_STORAGE_KEY, JSON.stringify(userData));
				} catch (error) {
					console.warn("⚠️ [AuthProvider] Failed to persist kc_user in localStorage:", error);
				}
			}

			console.log("User: ", parsedData?.name);
		} else {
			console.log("User isnt auth");
			setUser(null);
			if (typeof window !== "undefined") {
				window.localStorage.removeItem(KC_USER_STORAGE_KEY);
			}
		}

		setLoading(false);
	}, [initialized, authenticated, keycloakInstance.tokenParsed]);

	const login = useCallback(async (): Promise<boolean> => {
		try {
			console.log("Attempting to login with Keycloak...");
			await keycloakInstance.login({
				redirectUri: window.location.origin + "/lk",
			});
			return true;
		} catch (err) {
			console.error("Keycloak login error:", err);
			return false;
		}
	}, []);

	const logout = useCallback(() => {
		try {
			console.log("Logging out...");
			setUser(null);
			setLoading(true);
			if (typeof window !== "undefined") {
				window.localStorage.removeItem(KC_USER_STORAGE_KEY);
			}
			keycloakInstance.logout({
				redirectUri: window.location.origin + "/",
			});
		} catch (err) {
			console.error("Keycloak logout error:", err);
		}
	}, []);

	const value: AuthContextType = {
		keycloak: keycloakInstance,
		initialized,
		authenticated,
		isLoading,
		user,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
