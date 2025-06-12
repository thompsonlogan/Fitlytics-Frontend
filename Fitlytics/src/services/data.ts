import { AuthApi, Configuration, ConfigurationParameters, ExerciseApi, ProgramApi, UserApi, WorkoutApi } from "./generated";

export interface DataApis {
  programApi: ProgramApi
  authApi: AuthApi
  userApi: UserApi,
  exerciseApi: ExerciseApi
  workoutApi: WorkoutApi
}

export function createDataApis(configParams?: ConfigurationParameters): DataApis {
  const config = new Configuration(configParams)
  return {
    programApi: new ProgramApi(config),
    authApi: new AuthApi(config),
    userApi: new  UserApi(config),
    exerciseApi: new ExerciseApi(config),
    workoutApi: new WorkoutApi(config)
  }
}