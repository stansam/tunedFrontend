export interface AdminDeliveryFileDTO {
  id: string;
  delivery_id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_type: string;
  file_format: string;
  description: string | null;
  file_size: number;
  is_plagiarism_report: boolean;
  file_icon: string;
  created_at: string;
}

export interface AdminDeliveryDTO {
  id: string;
  order_id: string;
  delivery_status: string;
  status_color: string;
  client_notified: boolean;
  client_notified_at: string | null;
  has_plagiarism_report: boolean;
  delivery_files_count: number;
  files: AdminDeliveryFileDTO[];
  created_at: string;
}
