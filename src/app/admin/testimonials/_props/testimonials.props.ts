import type { AdminTestimonialResponse, AdminTestimonialService, AdminTestimonialMutation } from "../_types/testimonials.type";

export interface TestimonialsHeaderProps {
  readonly totalCount: number;
  readonly pendingCount: number;
  readonly approvedCount: number;
}

export interface FilterAreaProps {
  readonly search: string;
  readonly onSearchChange: (val: string) => void;
  readonly status: string;
  readonly onStatusChange: (val: string) => void;
  readonly rating: string;
  readonly onRatingChange: (val: string) => void;
  readonly serviceId: string;
  readonly onServiceChange: (val: string) => void;
  readonly services: readonly AdminTestimonialService[];
}

export interface TestimonialCardProps {
  readonly testimonial: AdminTestimonialResponse;
  readonly expanded: boolean;
  readonly onToggleExpand: () => void;
  readonly onApprove: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
  readonly isApproving: boolean;
}

export interface TestimonialsListProps {
  readonly testimonials: readonly AdminTestimonialResponse[];
  readonly loading: boolean;
  readonly expandedCardId: string | null;
  readonly onToggleExpandCard: (id: string) => void;
  readonly onApprove: (id: string) => void;
  readonly onEdit: (t: AdminTestimonialResponse) => void;
  readonly onDelete: (t: AdminTestimonialResponse) => void;
  readonly page: number;
  readonly total: number;
  readonly onPageChange: (page: number) => void;
  readonly isApprovingId: string | null;
}

export interface EditTestimonialModalProps {
  readonly isOpen: boolean;
  readonly testimonial: AdminTestimonialResponse | null;
  readonly onClose: () => void;
  readonly onSave: (data: AdminTestimonialMutation) => void;
  readonly isSaving: boolean;
}

export interface DeleteTestimonialDialogProps {
  readonly isOpen: boolean;
  readonly testimonial: AdminTestimonialResponse | null;
  readonly onClose: () => void;
  readonly onDelete: () => void;
  readonly isDeleting: boolean;
}
