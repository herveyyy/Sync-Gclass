"use client";

import { useState } from "react";
import { ClassRoomCourse } from "@/lib/entities/classroom.types";
import { syncCourseActivities } from "@/app/classroom/actions";
import { HiArrowPath } from "react-icons/hi2";

interface CourseCardProps {
  course: ClassRoomCourse;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isArchived = course.courseState === "ARCHIVED";

  const handleSync = async () => {
    try {
      if (!course.id) return;
      setIsSyncing(true);
      setError(null);
      setSynced(false);
      
      await syncCourseActivities(course.googleClassroomId);
      
      setSynced(true);
      setTimeout(() => setSynced(false), 3000);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to sync");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div
      className={`border-brutal rounded-xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between h-full bg-white transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] ${
        isArchived ? "opacity-75 grayscale-50" : ""
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-4 gap-4">
          <h3
            className="text-2xl font-extrabold text-foreground leading-tight line-clamp-2"
            title={course.name}
          >
            {course.name}
          </h3>
          <span
            className={`inline-flex shrink-0 items-center rounded-xl px-3 py-1.5 text-sm font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              isArchived
                ? "bg-surface-dim text-on-surface-variant"
                : "bg-tertiary text-foreground"
            }`}
          >
            {course.courseState}
          </span>
        </div>
        <p className="text-lg text-on-surface-variant mb-2 font-bold">
          {course.section || "No Section"}
        </p>
        {(course.room || course.subject) && (
          <div className="text-base font-medium text-on-surface-variant mt-4 space-y-1 bg-surface-container-low p-3 rounded-lg border-2 border-black">
            {course.room && (
              <p>
                Room: <span className="font-bold">{course.room}</span>
              </p>
            )}
            {course.subject && (
              <p>
                Subject: <span className="font-bold">{course.subject}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 flex flex-col gap-3">
        {error && (
          <p className="text-sm font-bold text-error bg-error-container p-2 rounded-lg border-2 border-error">
            {error}
          </p>
        )}

        <div className="flex justify-between items-center gap-3 flex-wrap">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className={`px-4 py-3 font-bold rounded-xl border-brutal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 ${
              synced 
                ? "bg-tertiary text-foreground" 
                : "bg-primary text-foreground hover:bg-primary-dim"
            } disabled:opacity-50`}
          >
            <HiArrowPath className={`text-lg ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : synced ? "Synced!" : "Sync"}
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`/classroom/${course.googleClassroomId}`}
              className="px-6 py-3 bg-secondary text-white font-bold rounded-xl border-brutal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-secondary-dim active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              Open
            </a>
            {course.alternateLink && (
              <a
                href={course.alternateLink}
                target="_blank"
                rel="noreferrer"
                title="Open in Google Classroom"
                className="w-12 h-12 flex items-center justify-center bg-white text-black font-bold rounded-xl border-brutal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                G
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
