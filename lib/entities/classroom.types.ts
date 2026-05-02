export type ClassRoomCourse = {
  id: string;
  googleClassroomId: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  descriptionContent?: string;
  room?: string;
  ownerId?: string;
  creationTime?: string;
  updateTime?: string;
  enrollmentCode?: string;
  courseState?: string;
  guardiansEnabled?: boolean | string;
  alternateLink?: string;
  teacherGroupEmail?: string;
  courseGroupEmail?: string;
  calendarId?: string;
  subject?: string;
  gradebookSettings?: {
    calculationType?: string;
    displaySetting?: string;
  };
};
