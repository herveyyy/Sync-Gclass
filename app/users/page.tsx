import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";

export default async function UsersPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-8">
        <Heading>Users</Heading>
      </div>

      {/* <UsersTable users={users} /> */}
    </PageContainer>
  );
}
