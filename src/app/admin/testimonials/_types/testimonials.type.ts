import { z } from "zod";
import * as schemas from "../_schemas/testimonials.schema";

export type AdminTestimonialUser = z.infer<typeof schemas.AdminTestimonialUserSchema>;
export type AdminTestimonialService = z.infer<typeof schemas.AdminTestimonialServiceSchema>;
export type AdminTestimonialResponse = z.infer<typeof schemas.AdminTestimonialResponseSchema>;
export type AdminTestimonialMutation = z.infer<typeof schemas.AdminTestimonialMutationSchema>;
export type AdminTestimonialListResponse = z.infer<typeof schemas.AdminTestimonialListResponseSchema>;
