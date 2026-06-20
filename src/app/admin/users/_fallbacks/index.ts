import type {
  AdminUserResponseDTO,
  AdminUserStatsResponseDTO,
  GeographicDistributionDTO,
} from "../_types";

export const FALLBACK_STATS: AdminUserStatsResponseDTO = {
  total_clients: 312,
  total_clients_growth_this_month: 47,
  returning_clients_percentage: 68,
  returning_clients_growth_vs_last_month: 3,
  dormant_clients_count: 28,
  high_value_clients_count: 14,
  client_retention_rate: 68.4,
};

export const FALLBACK_USERS: readonly AdminUserResponseDTO[] = [
  {
    id: "u1",
    name: "James Odhiambo",
    email: "jamesodhiambo@example.com",
    avatar_url: "/uploads/profile_pics/manDefault.png",
    orders_count: 18,
    total_spent: "1240.00",
    clv_status: "high",
    last_order_at: "Today",
    status: "active",
  },
  {
    id: "u2",
    name: "Sarah Kimani",
    email: "sarahkimani@example.com",
    avatar_url: "/uploads/profile_pics/ladyDefault.png",
    orders_count: 12,
    total_spent: "870.00",
    clv_status: "high",
    last_order_at: "Yesterday",
    status: "active",
  },
  {
    id: "u3",
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    avatar_url: "/uploads/profile_pics/manDefault.png",
    orders_count: 7,
    total_spent: "560.00",
    clv_status: "high",
    last_order_at: "2 days ago",
    status: "active",
  },
  {
    id: "u4",
    name: "Alice Wanjiru",
    email: "alicewanjiru@example.com",
    avatar_url: "/uploads/profile_pics/ladyDefault.png",
    orders_count: 4,
    total_spent: "310.00",
    clv_status: "normal",
    last_order_at: "5 days ago",
    status: "active",
  },
  {
    id: "u5",
    name: "Lucy Mwangi",
    email: "lucymwangi@example.com",
    avatar_url: "/uploads/profile_pics/ladyDefault.png",
    orders_count: 2,
    total_spent: "124.00",
    clv_status: "normal",
    last_order_at: "32 days ago",
    status: "dormant",
  },
];

export const FALLBACK_GEOGRAPHY: readonly GeographicDistributionDTO[] = [
  { country_code: "KE", country_name: "Kenya", percentage: 34 },
  { country_code: "GB", country_name: "United Kingdom", percentage: 22 },
  { country_code: "US", country_name: "United States", percentage: 14 },
  { country_code: "NG", country_name: "Nigeria", percentage: 10 },
  { country_code: "CA", country_name: "Canada", percentage: 8 },
  { country_code: "OT", country_name: "Other", percentage: 12 },
];
export const DEFAULT_PER_PAGE = 5;
