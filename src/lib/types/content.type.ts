import { Service } from "./service.type";
import { BlogPost } from "./blog.type";

export interface Deadline {
    id: string;
    name: string;
    hours: number;
    order: number;
}

export interface Level {
    id: string;
    name: string;
    order: number;
}

export interface Sample {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    service_id: string;
    word_count: number;
    featured: boolean;
    image: string;
}

export interface Testimonial {
    id: string;
    user_id: string;
    service_id?: string;
    order_id?: string;
    content: string;
    rating: number;
    is_approved: boolean;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}


export interface FeaturedContentResponse {
    services: Service[];
    samples: Sample[];
    blogs: BlogPost[];
}