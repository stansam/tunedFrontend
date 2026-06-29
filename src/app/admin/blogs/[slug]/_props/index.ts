import type { AdminBlogCategoryResponse } from "../../_types/blogs.types";

export interface Step1Props {
  readonly data: { title: string; author: string; category_id: string; excerpt: string };
  readonly onChange: (updates: Partial<Step1Props["data"]>) => void;
  readonly categories: readonly AdminBlogCategoryResponse[];
  readonly onNext: () => void;
}

export interface MarkdownEditorProps {
  readonly value: string;
  readonly onChange: (val: string) => void;
  readonly placeholder?: string;
}

export interface Step2Props {
  readonly content: string;
  readonly onChange: (val: string) => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}

export interface Step3Props {
  readonly data: { featured_image_id: string | null; meta_description: string; tags: readonly string[] };
  readonly onChange: (updates: Partial<{ featured_image_id: string | null; meta_description: string; tags: string[] }>) => void;
  readonly onPrev: () => void;
  readonly onNext: () => void;
}

export interface Step4Props {
  readonly data: {
    title: string;
    author: string;
    category_id: string;
    excerpt: string;
    content: string;
    featured_image_id: string | null;
    meta_description: string;
    tags: readonly string[];
  };
  readonly categories: readonly AdminBlogCategoryResponse[];
  readonly onPrev: () => void;
  readonly onSubmit: (publish: boolean) => void;
  readonly isSubmitting: boolean;
}