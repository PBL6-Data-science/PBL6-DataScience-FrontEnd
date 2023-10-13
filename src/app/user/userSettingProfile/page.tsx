"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import SettingProfilePage from "@/pages/User/Setting/SettingProfilePage";

const Profile = () => {
  return (
    <PageContainer title="User Profile" description="This is User Profile">
      <Layout>
        <SettingProfilePage />
      </Layout>
    </PageContainer>
  );
};

export default Profile;
