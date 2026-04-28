import PostCard from "@/components/molecules/PostCard";
import { mockBlogPosts } from "@/lib/utils/mockData";
import { PageContainer } from "@/components/atoms/PageContainer";

type Props = {};

const page = (props: Props) => {
  return (
    <PageContainer>
      <div className="">
        <div className="flex flex-col gap-6 w-full">
          {mockBlogPosts.map((post, index) => {
            return <PostCard post={post} key={index} />;
          })}
        </div>
      </div>
    </PageContainer>
  );
};

export default page;
