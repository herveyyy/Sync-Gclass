"use server";

import { createGoogleClassroomController } from "../actions";

export const getCourseList = async () => {
  const googleClassroomController = await createGoogleClassroomController();
  const courseList = await googleClassroomController.getCourseList();
  return courseList;
};

export const syncCourseActivities = async (courseId: string) => {
  const googleClassroomController = await createGoogleClassroomController();
  return await googleClassroomController.syncSingleCourse(courseId);
};

export const getClassroomDetails = async (googleClassroomId: string) => {
  const googleClassroomController = await createGoogleClassroomController();
  return await googleClassroomController.getClassroomDetails(googleClassroomId);
};
