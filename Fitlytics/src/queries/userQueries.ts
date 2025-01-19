import { useDataApis } from "@/services/context"
import { useQuery } from "@tanstack/react-query"

export const useGetUserQuery = () => {
  const { userApi } = useDataApis();

  const fetchUserData = async () => {
    return await userApi.apiUserGet();
  }

  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 1,
    notifyOnChangeProps: ["data", "isLoading", "isFetching"],
  })
}