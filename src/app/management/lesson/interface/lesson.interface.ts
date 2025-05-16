import { SafeResourceUrl } from "@angular/platform-browser";

export interface Lesson{
    id: number,
    courseId: number,
    courseName: string,
    title: string,
    description: string,
    videoUrl: string,
    duration: number,
    position: number
}