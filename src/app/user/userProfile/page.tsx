"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import ProfilePage from "@/pages/User/Profile/ProfilePage";

const Profile = () => {
  return (
    <PageContainer title="User Profile" description="This is User Profile">
      <Layout>
        <ProfilePage />
      </Layout>
    </PageContainer>
  );
};

export default Profile;
