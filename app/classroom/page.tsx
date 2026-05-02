"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/atoms/Button";
import { CountdownTimer } from "@/components/atoms/CountdownTimer";
import { getCourseList } from "./actions";
import { CourseList } from "@/components/organisms/CourseList";
import { ClassRoomCourse } from "@/lib/entities/classroom.types";
import { HiArrowPath } from "react-icons/hi2";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";
import { ErrorMessage } from "@/components/atoms/ErrorMessage";

const SYNC_INTERVAL_SECONDS = 300;

export default function ClassRoomPage() {
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<ClassRoomCourse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncKey, setSyncKey] = useState(0);

  const handleSync = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedCourses = await getCourseList();
      setCourses(fetchedCourses as ClassRoomCourse[]);
    } catch (e: any) {
      setError(e.message || "An error occurred while fetching courses.");
      console.error(e);
    } finally {
      setIsLoading(false);
      setSyncKey((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    handleSync();
  }, [handleSync]);

  const handleManualSync = () => {
    handleSync();
  };

  return (
    <PageContainer size="wide">
      <div className="flex flex-col md:flex-row md:items-center o justify-between mb-16 gap-8">
        <div>
          <Heading level={1} className="mb-2">
            Classroom
          </Heading>
          <p className="text-xl font-bold text-on-surface-variant">
            Manage your Google Classroom courses.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          {!isLoading && (
            <div className="px-5 py-3 bg-[#f9f4df] border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-base font-extrabold text-on-surface-variant flex items-center gap-2">
              <HiArrowPath className="text-lg" />
              Next sync in{" "}
              <CountdownTimer
                key={syncKey}
                seconds={SYNC_INTERVAL_SECONDS}
                onComplete={handleSync}
              />
            </div>
          )}
          <Button onClick={handleManualSync} variant="primary">
            {isLoading ? "Syncing..." : "Sync now"}
          </Button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}

      <div>
        <CourseList courses={courses} />
      </div>
    </PageContainer>
  );
}
