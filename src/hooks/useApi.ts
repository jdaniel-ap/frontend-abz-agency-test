import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/api";
import type { UsersParams } from "@/types/api";

const CACHE_TIMES = {
  FIVE_MINUTES: 5 * 60 * 1000,
  TEN_MINUTES: 10 * 60 * 1000,
  THIRTY_MINUTES: 30 * 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
} as const;

export const useUsers = (params?: UsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => ApiService.getUsers(params),
    staleTime: CACHE_TIMES.FIVE_MINUTES,
    gcTime: CACHE_TIMES.TEN_MINUTES,
  });
};

export const usePositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: () => ApiService.getPositions(),
    staleTime: CACHE_TIMES.THIRTY_MINUTES,
    gcTime: CACHE_TIMES.ONE_HOUR,
  });
};
