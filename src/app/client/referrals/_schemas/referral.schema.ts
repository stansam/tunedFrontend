import { z } from "zod";

export const ShareReferralSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  message: z.string().optional(),
});

export type ShareReferralInput = z.infer<typeof ShareReferralSchema>;

export const PointsUpdatedSchema = z.object({
  points_earned: z.number(),
  new_total: z.number(),
});
