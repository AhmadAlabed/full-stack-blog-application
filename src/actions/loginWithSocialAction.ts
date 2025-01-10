"use server";
import { signIn } from "@/auth";
export async function loginWithSocialAction(action: string) {
  await signIn(action, { redirectTo: "/" });
}
