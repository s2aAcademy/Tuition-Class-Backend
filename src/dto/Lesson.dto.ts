export enum SubjectEnum {
  PHYSICS = "physics",
  CHEMISTRY = "chemistry",
}
export class CreateLessonInput {
  lessonName: string;
  lessonDescription: string;
  subject: SubjectEnum;
}
