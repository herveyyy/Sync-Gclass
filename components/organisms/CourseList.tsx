import { ClassRoomCourse } from "@/lib/entities/classroom.types";
import { CourseCard } from "../molecules/CourseCard";

interface CourseListProps {
  courses: ClassRoomCourse[];
}

export function CourseList({ courses }: CourseListProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-20 px-6 bg-[#f6f1dc] rounded-2xl border-[6px] border-dashed border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-extrabold text-[#1d1c10] mb-4">No courses found!</h2>
        <p className="text-xl font-bold text-[#4a4731]">Try syncing your classes to see them here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
