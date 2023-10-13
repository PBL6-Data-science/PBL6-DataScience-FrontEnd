"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import UserListPage from "@/pages/User/User/UserList";

const Profile = () => {
  return (
    <PageContainer title="User Profile" description="This is User Profile">
      <Layout>
        <UserListPage />
      </Layout>
    </PageContainer>
  );
};

export default Profile;
