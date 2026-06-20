import { apiGet, apiPost, apiPatch, apiDelete } from "@/api-client";
import type { ApiResult } from "@/lib/types";
import { ProfileSchema, AvatarUploadResponseSchema } from "../_schemas/profile.schema";
import type { Profile, UpdateProfileData, AvatarUploadResponse } from "../_types/profile.types";

const PARSE_ERROR: ApiResult<never> = {
  ok: false,
  error: { message: "Response validation failed", errors: {}, status: 422 },
};

function logErr(ep: string, e: unknown): void {
  if (process.env.NODE_ENV !== "production")
    console.error(`[ProfileService] ${ep} schema violation:`, e);
}

export async function fetchProfile(): Promise<ApiResult<Profile>> {
  const res = await apiGet<unknown>("/client/profile");
  if (!res.ok) return { ok: false, error: res.error };
  const p = ProfileSchema.safeParse(res.data);
  if (!p.success) { logErr("GET /client/profile", p.error.format()); return PARSE_ERROR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function updateProfile(data: UpdateProfileData): Promise<ApiResult<Profile>> {
  const res = await apiPatch<unknown>("/client/profile", data);
  if (!res.ok) return { ok: false, error: res.error };
  const p = ProfileSchema.safeParse(res.data);
  if (!p.success) { logErr("PATCH /client/profile", p.error.format()); return PARSE_ERROR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function uploadAvatar(file: File): Promise<ApiResult<AvatarUploadResponse>> {
  const form = new FormData();
  form.append("file", file);
  const res = await apiPost<unknown>("/client/profile/avatar", form);
  if (!res.ok) return { ok: false, error: res.error };
  const p = AvatarUploadResponseSchema.safeParse(res.data);
  if (!p.success) { logErr("POST avatar", p.error); return PARSE_ERROR; }
  return { ok: true, data: p.data, message: "Avatar updated", status: res.status };
}

export async function deleteAvatar(): Promise<ApiResult<AvatarUploadResponse>> {
  const res = await apiDelete<unknown>("/client/profile/avatar");
  if (!res.ok) return { ok: false, error: res.error };
  const p = AvatarUploadResponseSchema.safeParse(res.data);
  if (!p.success) { logErr("DELETE avatar", p.error); return PARSE_ERROR; }
  return { ok: true, data: p.data, message: res.message, status: res.status };
}

export async function resendVerificationEmail(): Promise<ApiResult<{ success: boolean }>> {
  return apiPost<{ success: boolean }>("/client/profile/verify-email", {});
}

export async function changePassword(
  d: { current_password: string; new_password: string },
): Promise<ApiResult<{ success: boolean }>> {
  return apiPost<{ success: boolean }>("/client/profile/change-password", d);
}
