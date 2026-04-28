import { GoogleClassroomService } from "../../services/google-classroom.service";
import { IGoogleClassroomController } from "./google-classroom.interface";

export class GoogleClassroomController implements IGoogleClassroomController {
  constructor(
    private readonly _googleClassroomService: GoogleClassroomService,
  ) {}

  async getCourseList(): Promise<unknown> {
    try {
      const result = await this._googleClassroomService.syncCourses();
      return result;
    } catch (e) {
      console.error("Error in getCourseList: ", e);
      throw e;
    }
  }

  async syncSingleCourse(courseId: string): Promise<boolean> {
    try {
      const result =
        await this._googleClassroomService.syncSingleCourse(courseId);
      return result;
    } catch (e) {
      console.error("Error in syncSingleCourse: ", e);
      throw e;
    }
  }

  async getClassroomDetails(googleClassroomId: string): Promise<any> {
    try {
      return await this._googleClassroomService.getClassroomDetails(
        googleClassroomId,
      );
    } catch (e) {
      console.error("Error in getClassroomDetails:", e);
      throw e;
    }
  }
}
