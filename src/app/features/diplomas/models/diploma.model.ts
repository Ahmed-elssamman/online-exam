import { ExamListModel } from "app/features/exams/exams-list/exams-list.model"

export interface DiplomaModel {
    id?: string
    title?: string
    description?: string
    image?: string
    immutable?: boolean
    createdAt?: string
    updatedAt?: string
    exams?: ExamListModel[]

}

export interface DiplomaItemPayload {
    diploma: DiplomaModel
}