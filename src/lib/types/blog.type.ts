
export interface BlogCategory {
    name: string;
    slug: string;
    description: string; 
}

export interface BlogPost {
    title: string;
    content: string;
    author: string;
    category_id: string;
    slug: string | null;
    excerpt: string;
    featured_image: string;
    meta_description: string;
    is_published: boolean;
    is_featured: boolean;
    published_at: string | null;
}

export interface BlogPostResponse {
    id: string;
    title: string;
    content: string;
    author: string;
    category_id: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    meta_description: string;
    is_published: boolean;
    is_featured: boolean;
    published_at: string;
}

export interface BlogComment {
    post_id: string;
    content: string;
    name: string;
    email: string;
    user_id: string;
    approved: boolean;
}

export interface BlogCommentResponse {
    id: string;
    post_id: string;
    content: string;
    name: string;
    email: string;
    user_id: string;
    approved: boolean;
}

export interface CommentReaction {
    comment_id: string;
    reaction_type: string;
    user_id: string;
    ip_address: string;
}

export interface CommentReactionResponse {
    id: string;
    comment_id: string;
    reaction_type: string;
    user_id: string;
    ip_address: string;
}