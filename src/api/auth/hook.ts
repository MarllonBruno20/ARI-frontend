import { useMutation } from "@tanstack/react-query";
import { AuthApi } from ".";
import type { LoginPayload } from "./types";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => AuthApi.login(payload),
  });
}
