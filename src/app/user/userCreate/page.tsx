"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import UserCreatePage from "@/pages/User/User/UserCreate";

const UserCreate = () => {
  return (
    <PageContainer title="User Profile" description="This is User Profile">
      <Layout>
        <UserCreatePage />
      </Layout>
    </PageContainer>
  );
};

export default UserCreate;
