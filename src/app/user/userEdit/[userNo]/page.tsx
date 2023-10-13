"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import UserCreatePage from "@/pages/User/User/UserCreate";

const UserEdit = () => {
  return (
    <PageContainer title="News List" description="This is News List">
      <Layout>
        <UserCreatePage />;
      </Layout>
    </PageContainer>
  );
};

export default UserEdit;
