import { Lesson } from "../../lesson/interface/lesson.interface"

export interface Courses{
    id: number,
    imgURL: string,
    title: string,
    description: string,
    price: number,
    createdAt: Date,
    instructorId: number | string,
    categoryId: number | string
    lessons: Lesson[]
}