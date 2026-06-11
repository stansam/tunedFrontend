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
    pending_assignment: 6,
    under_review: 3,
    awaiting_payment: 2,
  },
  writer_load: [
    { id: "w-1", name: "Alex M.", avatar: null, orders_count: 7, status: "Busy" },
    { id: "w-2", name: "Grace N.", avatar: null, orders_count: 4, status: "OK" },
    { id: "w-3", name: "David K.", avatar: null, orders_count: 2, status: "Free" },
  ],
};

export const FALLBACK_ORDERS: AdminOrdersListResponse = {
  orders: [
    {
      id: "o-1089",
      order_number: "TE-1089",
      client_id: "c-1",
      client_name: "James Odhiambo",
      status: "pending",
      paid: true,
      total_price: "124.00",
      service_id: "s-1",
      service_name: "Data Analysis",
      due_date: new Date(Date.now() + 6 * 3600 * 1000).toISOString(), // 6 hours from now
      writer_id: null,
      writer_name: null,
      escalated: false,
    },
    {
      id: "o-1088",
      order_number: "TE-1088",
      client_id: "c-2",
      client_name: "Sarah Kimani",
      status: "active",
      paid: true,
      total_price: "87.50",
      service_id: "s-2",
      service_name: "Essay Writing",
      due_date: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
      writer_id: "w-1",
      writer_name: "Alex M.",
      escalated: false,
    },
    {
      id: "o-1087",
      order_number: "TE-1087",
      client_id: "c-3",
      client_name: "Michael Brown",
      status: "revision",
      paid: true,
      total_price: "45.00",
      service_id: "s-3",
      service_name: "Editing",
      due_date: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
      writer_id: "w-2",
      writer_name: "Grace N.",
      escalated: false,
    },
  ],
  total: 3,
  page: 1,
  per_page: 10,
  sort: "created_at",
  order: "desc",
};
