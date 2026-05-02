import { getClassroomDetails } from "../actions";
import { ActivityCard } from "@/components/molecules/ActivityCard";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";
import { BrutalCard } from "@/components/atoms/BrutalCard";

interface ClassroomDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ClassroomDetailsPage({
  params,
}: ClassroomDetailsPageProps) {
  const { id } = await params;
  const result = await getClassroomDetails(id);

  if (!result || !result.classroom) {
    return (
      <PageContainer className="text-center">
        <Heading className="mb-4">Classroom not found</Heading>
        <p className="text-xl font-bold mb-8">
          Try syncing your courses from the dashboard first.
        </p>
        <Link
          href="/classroom"
          className="inline-flex items-center gap-2 px-6 py-3 bg-tertiary border-brutal shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl font-bold text-on-surface"
        >
          <HiArrowLeft /> Back to Dashboard
        </Link>
      </PageContainer>
    );
  }

  const { classroom, activities } = result;

  return (
    <PageContainer>
      <Link
        href="/classroom"
        className="inline-flex items-center gap-2 text-lg font-bold text-on-surface-variant hover:text-black mb-8"
      >
        <HiArrowLeft /> Back to Dashboard
      </Link>

      <BrutalCard bgColor="bg-[#f9f4df]" shadowSize="lg" className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">
          <Heading className="text-3xl md:text-5xl">{classroom.name}</Heading>
          {classroom.alternateLink && (
            <a
              href={classroom.alternateLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-white border-2 border-black rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform shrink-0 text-center w-full md:w-auto"
            >
              Open Google Classroom
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {classroom.section && (
            <span className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold">
              Section: {classroom.section}
            </span>
          )}
          {classroom.subject && (
            <span className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold">
              Subject: {classroom.subject}
            </span>
          )}
          {classroom.room && (
            <span className="px-4 py-2 bg-white border-2 border-black rounded-lg font-bold">
              Room: {classroom.room}
            </span>
          )}
        </div>
      </BrutalCard>

      <div className="space-y-6">
        <Heading level={2} className="mb-6 text-3xl">
          Class Activities
        </Heading>
        {activities.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-2xl border-4 border-dashed border-black">
            <Heading level={3} className="mb-2">
              No activities yet!
            </Heading>
            <p className="text-lg font-medium text-on-surface-variant">
              Sync your courses on the dashboard to see announcements and
              coursework.
            </p>
          </div>
        ) : (
          activities.map((activity: any) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </PageContainer>
  );
}
