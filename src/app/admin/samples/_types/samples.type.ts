import { z } from "zod";
import * as schemas from "../_schemas/samples.schema";

export type AdminSampleTag = z.infer<typeof schemas.AdminSampleTagSchema>;
export type AdminSampleService = z.infer<typeof schemas.AdminSampleServiceSchema>;
export type AdminSampleResponse = z.infer<typeof schemas.AdminSampleResponseSchema>;
export type AdminSampleMutation = z.infer<typeof schemas.AdminSampleMutationSchema>;
export type AdminSampleListResponse = z.infer<typeof schemas.AdminSampleListResponseSchema>;
