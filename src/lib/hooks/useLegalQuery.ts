"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkPolicyStatus, acceptPolicies } from "@/lib/services/legal.service";

export interface AcceptPoliciesParams {
  readonly terms: string;
  readonly privacy: string;
}

export function usePolicyStatusQuery(isAuthenticated: boolean, authStatus: string) {
  return useQuery<boolean, Error>({
    queryKey: ["legal", "status"],
    queryFn: checkPolicyStatus,
    enabled: isAuthenticated && authStatus === "authenticated",
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useAcceptPoliciesMutation() {
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, AcceptPoliciesParams>({
    mutationFn: async ({ terms, privacy }: AcceptPoliciesParams) => {
      return acceptPolicies(terms, privacy);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["legal", "status"] });
    },
  });
}
