import KeycloakInstance from "keycloak-js"
import type { User } from "./userDataType";

export interface AuthContextType {
    keycloak: KeycloakInstance | null;
    authenticated: boolean;
    initialized: boolean;
    isLoading: boolean;

    user: User | null;

    login: () => Promise<boolean>;
    logout: () => void;

}