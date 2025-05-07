import type { HomeCourseProgress, HomeCourseRecommendation } from "~/types/home"

export interface RootState {
  isLoadCourseProgress: boolean;
  coursesProgress: HomeCourseProgress[] | null;
  api: any;
  isLoadCoursesRecommendation: boolean;
  coursesRecommendation: HomeCourseRecommendation[] | null;
}

export const createState = (): Partial<RootState> => {
  return {
    coursesProgress: null,
    api: useNuxtApp().$api,
    isLoadCourseProgress: true,
    isLoadCoursesRecommendation: true,
    coursesRecommendation: null,
  } as Partial<RootState>
}