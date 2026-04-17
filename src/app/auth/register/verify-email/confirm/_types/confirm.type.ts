export type ConfirmStatus = "verifying" | "success" | "already_verified" | "error";

export interface ConfirmState {
  readonly status: ConfirmStatus;
  readonly message: string | null;
}
