import type {
  AdminOrdersStatsResponse,
  AdminOrdersListResponse,
} from "../_types/orders.types";

export const FALLBACK_STATS: AdminOrdersStatsResponse = {
  stats: {
    all: 24,
    pending: 6,
    in_progress: 9,
    revision: 3,
    completed: 5,
    overdue: 1,
  },
  bottlenecks: {
    pending_activation: 6,
    under_review: 3,
    awaiting_payment: 2,
  },
  service_load: [
    { id: "00000000-0000-0000-0000-000000000101", name: "Data Analysis", orders_count: 7, status: "Busy" },
    { id: "00000000-0000-0000-0000-000000000102", name: "Essay Writing", orders_count: 4, status: "OK" },
    { id: "00000000-0000-0000-0000-000000000103", name: "Editing & Proofreading", orders_count: 2, status: "Free" },
  ],
};

export const FALLBACK_ORDERS: AdminOrdersListResponse = {
  orders: [
    {
      id: "00000000-0000-0000-0000-000000001089",
      order_number: "TE-1089",
      client_id: "00000000-0000-0000-0000-000000000001",
      client_name: "James Odhiambo",
      status: "pending",
      paid: true,
      total_price: "124.00",
      service_id: "00000000-0000-0000-0000-000000000101",
      service_name: "Data Analysis",
      due_date: new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
      escalated: false,
    },
    {
      id: "00000000-0000-0000-0000-000000001088",
      order_number: "TE-1088",
      client_id: "00000000-0000-0000-0000-000000000002",
      client_name: "Sarah Kimani",
      status: "active",
      paid: true,
      total_price: "87.50",
      service_id: "00000000-0000-0000-0000-000000000102",
      service_name: "Essay Writing",
      due_date: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      escalated: false,
    },
    {
      id: "00000000-0000-0000-0000-000000001087",
      order_number: "TE-1087",
      client_id: "00000000-0000-0000-0000-000000000003",
      client_name: "Michael Brown",
      status: "revision",
      paid: true,
      total_price: "45.00",
      service_id: "00000000-0000-0000-0000-000000000103",
      service_name: "Editing & Proofreading",
      due_date: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      escalated: false,
    },
  ],
  total: 3,
  page: 1,
  per_page: 10,
  sort: "created_at",
  order: "desc",
};
