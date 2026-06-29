import type { AdminServiceCategory, PricingCategory, AdminService } from "../_types/services.types";

export const FALLBACK_ADMIN_CATEGORIES: readonly AdminServiceCategory[] = [
  { id: "cat-1", name: "Academic Writing", description: "Standard academic essays", order: 1 },
  { id: "cat-2", name: "Technical Services", description: "Programming and lab reports", order: 2 },
  { id: "cat-3", name: "Editing & Proofreading", description: "Grammar check and structure edit", order: 3 },
];

export const FALLBACK_PRICING_CATEGORIES: readonly PricingCategory[] = [
  { id: "pc-1", name: "writing", description: "Writing rate tier", display_order: 1 },
  { id: "pc-2", name: "technical", description: "Technical rate tier", display_order: 2 },
  { id: "pc-3", name: "proofreading", description: "Proofreading rate tier", display_order: 3 },
];

export const FALLBACK_ADMIN_SERVICES: readonly AdminService[] = [
  {
    id: "svc-1",
    name: "Essay Writing",
    description: "High quality academic writing services",
    category_id: "cat-1",
    featured: true,
    pricing_category_id: "pc-1",
    slug: "essay-writing",
    is_active: true,
    tags: [{ id: "tag-1", name: "academic", description: null, slug: "academic", usage_count: 5 }],
    category: { id: "cat-1", name: "Academic Writing", description: "Standard academic essays", order: 1 },
    pricing_category: { id: "pc-1", name: "writing", description: "Writing rate tier", display_order: 1 },
  },
  {
    id: "svc-2",
    name: "Data Analysis",
    description: "Statistical and deep learning model analysis",
    category_id: "cat-2",
    featured: true,
    pricing_category_id: "pc-2",
    slug: "data-analysis",
    is_active: true,
    tags: [{ id: "tag-2", name: "statistics", description: null, slug: "statistics", usage_count: 3 }],
    category: { id: "cat-2", name: "Technical Services", description: "Programming and lab reports", order: 2 },
    pricing_category: { id: "pc-2", name: "technical", description: "Technical rate tier", display_order: 2 },
  },
];
