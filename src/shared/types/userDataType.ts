export interface User {
	name: string;
	email?: string;
	backupEmail?: string;
	firstName?: string;
	secondName?: string;
	phoneNumber?: string;
	telegram?: string;
	token: string;
	id: string;
	roles?: [];
	/**
	 * Технические поля для восстановления сессии Keycloak
	 * при перезагрузке страницы.
	 */
	refreshToken?: string;
	idToken?: string;
	timeSkew?: number;
}
