import type { LoginPayload, LoginResult } from "@/features/auth/auth.types";

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResult> => {
    await delay(500);

    if (payload.email !== "admin@example.com" || payload.password !== "password") {
      throw new Error("Invalid email or password");
    }

    return {
      token: "mock-token",
      user: {
        id: "usr_1",
        name: "Alex Morgan",
        email: "admin@example.com",
        role: "Admin"
      }
    };
  }
};
