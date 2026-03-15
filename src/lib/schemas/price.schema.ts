import { DeadlineResponseSchema } from "./content.schema";

export type PricingCategoryResponseSchema = {
    id: string;
    name: string;
    order: number;
}

export type CalculatePriceRequestSchema = {
    service_id: string;
    academic_level_id: string;
    deadline: string;
    word_count: number;
    page_count: number;
    report_type?: string;
}

export type CalculatePriceResponseSchema = {
    price_per_page: number;
    page_count: number;
    pages_price: number;
    total_price: number;
    deadline_hours: number;
    selected_deadline: DeadlineResponseSchema;
}