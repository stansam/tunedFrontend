import type { AdminSampleResponse, AdminSampleService, AdminSampleMutation } from "../_types/samples.type";

export interface FilterAreaProps {
  readonly search: string;
  readonly onSearchChange: (val: string) => void;
  readonly categoryId: string;
  readonly onCategoryChange: (val: string) => void;
  readonly services: readonly AdminSampleService[];
}

export interface SampleCardProps {
  readonly sample: AdminSampleResponse;
  readonly expanded: boolean;
  readonly onToggleExpand: () => void;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
  readonly onFeatureToggle: () => void;
}

export interface SamplesListProps {
  readonly samples: readonly AdminSampleResponse[];
  readonly loading: boolean;
  readonly expandedCardId: string | null;
  readonly onToggleExpandCard: (id: string) => void;
  readonly onEdit: (sample: AdminSampleResponse) => void;
  readonly onDelete: (sample: AdminSampleResponse) => void;
  readonly onFeatureToggle: (id: string, featured: boolean) => void;
  readonly page: number;
  readonly total: number;
  readonly onPageChange: (page: number) => void;
}

export interface DeleteSampleDialogProps {
  readonly isOpen: boolean;
  readonly sample: AdminSampleResponse | null;
  readonly onClose: () => void;
  readonly onDelete: () => void;
  readonly isDeleting: boolean;
}

export interface CreateSampleModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSave: (data: AdminSampleMutation) => void;
  readonly isSaving: boolean;
  readonly services: readonly AdminSampleService[];
}

export interface EditSampleModalProps {
  readonly isOpen: boolean;
  readonly sample: AdminSampleResponse | null;
  readonly onClose: () => void;
  readonly onSave: (data: AdminSampleMutation) => void;
  readonly isSaving: boolean;
  readonly services: readonly AdminSampleService[];
}

export interface Step1Props {
  readonly data: AdminSampleMutation;
  readonly onChange: (updates: Partial<AdminSampleMutation>) => void;
  readonly services: readonly AdminSampleService[];
  readonly onNext: () => void;
}

export interface Step2Props {
  readonly data: AdminSampleMutation;
  readonly onChange: (updates: Partial<AdminSampleMutation>) => void;
  readonly onBack: () => void;
  readonly onNext: () => void;
}

export interface Step3Props {
  readonly data: AdminSampleMutation;
  readonly services: readonly AdminSampleService[];
  readonly onBack: () => void;
  readonly onSubmit: () => void;
  readonly isSaving: boolean;
}