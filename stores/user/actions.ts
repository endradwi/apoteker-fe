import type { _ActionsTree } from "pinia"
import type { HomeCourseProgress, HomeCourseRecommendation } from "~/types/home"
import { numberFormat } from "~/helper/number"

export default function actions(): _ActionsTree {
  return {
    async retrieveCourseProgress(): Promise<void> {
      this.$patch({
        isLoadCourseProgress: true
      })
      const { data } = await useHttp('module-service/module/user-progress', {
        method: "GET"
      });

      const respData = data;
      let dataParse: HomeCourseProgress[] | null = [];

      respData?.forEach((r: any) => dataParse?.push({
        Id: r.id as number,
        Title: r.title,
        Progress: Math.round((r.percentage as number) * 100),
        LastOpen: r.last_access,
        Thumbnail: r.thumbnail,
      }));
      this.$patch({
        coursesProgress: dataParse,
        isLoadCourseProgress: false
      });
    },
    async retrieveCourseRecommend(): Promise<void> {
      this.$patch({
        isLoadCoursesRecommendation: true
      })
      const { data } = await useHttp('module-service/module/recommendation', {
        method: "GET"
      })
      const respData = data;
      let dataParse: HomeCourseRecommendation[] | null = [];

      respData?.forEach((r: any) => dataParse?.push({
        CourseCode: r.course_code,
        University: r.university,
        AcademicLogo: r.academic_logo, CourseType: r.course_type, Duration: r.duration ?? 0, Instructor: r.instructor, Sks: r.sks_count ?? 0,
        Id: r.id as number,
        Title: r.title,
        TotalSold: r.total_sold,
        LastModified: r.last_modified,
        Thumbnail: r.thumbnail,
        Level: r.level || 'Beginner',
        TotalChapter: r.total_chapter,
        Pricing: r.price as number,
        TotalView: numberFormat(r.total_view) ?? 0
      }));
      this.$patch({
        coursesRecommendation: dataParse,
        isLoadCoursesRecommendation: false
      });
    },
  }
}