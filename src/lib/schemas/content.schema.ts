export type DeadlineResponseSchema = {
    id: string;
    name: string;
    hours: number;
    order: number;
}

export type AcademicLevelResponseSchema = {
    id: string;
    name: string;
    order: number;
}

export type SampleResponseSchema = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    service_id: string;
    word_count: number;
    featured: boolean;
    image: string;
}

export type TestimonialResponseSchema = {
    id: string;
    user_id: string;
    service_id: string;
    order_id: string;
    content: string;
    rating: number;
    is_approved: boolean;
}

export type FAQResponseSchema = {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}

export type ServiceResponseSchema = {
    id: string;
    name: string;
    description: string;
    category_id: string;
    featured: boolean;
    pricing_category_id: string;
    slug: string;
    is_active: boolean;
}