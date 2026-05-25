import { useEffect, useRef } from "react";
import type { Props } from "@/shared/types/propsType";
import Loader from "@/shared/components/dataDisplay/preloader/Loader";
import { useAuth } from "@/modules/lk/hooks/useAuth";

export default function ProtectedRoute({ children }: Props) {
  const { user, initialized, authenticated, isLoading, login } = useAuth();
  const loginAttempted = useRef(false);

  useEffect(() => {
    console.log("🛡️ [ProtectedRoute] useEffect triggered:", {
      authenticated,
      initialized,
      isLoading,
      loginAttempted: loginAttempted.current,
    });

    if (!authenticated && initialized && !isLoading && !loginAttempted.current) {
      console.log("🔴 [ProtectedRoute] User not authenticated, redirecting to login");
      loginAttempted.current = true;
      // Используем метод login из контекста, который настроен с правильным redirectUri
      login();
    }
  }, [authenticated, initialized, isLoading, login]);

  // Ждём инициализацию Keycloak И завершения проверки аутентификации.
  // Пока initialized === false или isLoading === true или пользователь не аутентифицирован,
  // показываем лоадер и НЕ реагируем напрямую на authenticated === false.
  if (!initialized || isLoading || !authenticated || !user) {
    console.log("🛡️ [ProtectedRoute] Showing loader - waiting for initialization/auth check");
    return <Loader />;
  }

  console.log("🛡️ [ProtectedRoute] Rendering children - user is authenticated");
  return children;
}
