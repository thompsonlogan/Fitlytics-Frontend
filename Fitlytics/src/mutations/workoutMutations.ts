import { useDataApis } from "@/services/context";
import { ApiWorkoutPutRequest } from "@/services/generated/apis";
import { WorkoutExerciseDto } from "@/services/generated/models";
import { useMutation } from "@tanstack/react-query";


export const useEditWorkoutExerciseMutation = () => {
  const { workoutApi } = useDataApis();

  return useMutation({
    mutationFn: async (workoutExerciseDto: WorkoutExerciseDto) => {
      const requestParameters: ApiWorkoutPutRequest = {
        workoutExerciseDto: workoutExerciseDto
      }

      return await workoutApi.apiWorkoutPut(requestParameters)
    },
    onError: (error: unknown) => {
      console.log(error)
    },
    onSuccess: () => {
      console.log("success")
    }
  })
}