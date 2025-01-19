import { useDataApis } from "@/services/context"
import { useQuery } from "@tanstack/react-query"

export const useGetProgramQuery = (programId: string) => {
  const { programApi } = useDataApis();

  const fetchProgramData = async () => {
    const requestParams = {
      programId: programId,
    }

    return await programApi.apiProgramGet(requestParams);
  }

  return useQuery({
    queryKey: ["program", programId],
    queryFn: fetchProgramData,
    staleTime: 1000 * 60 * 1,
    notifyOnChangeProps: ["data", "isLoading", "isFetching"],
  })
}