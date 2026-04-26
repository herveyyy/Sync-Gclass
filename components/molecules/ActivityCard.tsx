import { HiSpeakerWave, HiClipboardDocumentList } from "react-icons/hi2";

interface ActivityCardProps {
  activity: any;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const isAnnouncement = activity.type === "announcement";
  const date = new Date(activity.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  let dueDateStr = null;
  if (activity.dueDate) {
    dueDateStr = new Date(activity.dueDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="border-brutal rounded-xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform flex flex-col sm:flex-row gap-4 sm:gap-6">
      <div
        className={`w-12 h-12 shrink-0 rounded-xl border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
          isAnnouncement ? "bg-[#f8e600]" : "bg-[#0266ff]"
        }`}
      >
        {isAnnouncement ? (
          <HiSpeakerWave className="text-xl text-[#1d1c10]" />
        ) : (
          <HiClipboardDocumentList className="text-xl text-white" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h4 className="text-xl font-extrabold text-[#1d1c10] leading-tight">
            {activity.title}
          </h4>
          <span className="text-sm font-bold text-[#4a4731] shrink-0">
            {date}
          </span>
        </div>

        {activity.description && (
          <p className="text-base font-medium text-[#4a4731] whitespace-pre-wrap line-clamp-3 mb-4">
            {activity.description}
          </p>
        )}

        <div className="flex justify-between items-end mt-4">
          <div>
            {dueDateStr && (
              <span className="inline-flex items-center px-3 py-1 bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-lg text-sm font-bold text-[#93000a]">
                Due: {dueDateStr}
              </span>
            )}
          </div>
          {activity.alternateLink && (
            <a
              href={activity.alternateLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-bold text-[#0266ff] hover:underline"
            >
              View in Google Classroom &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
