"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import MenuManagerPage from "@/pages/Menu/MenuManager";

const MenuManager = () => {
  return (
    <PageContainer title="News List" description="This is News List">
      <Layout>
        <MenuManagerPage />
      </Layout>
    </PageContainer>
  );
};

export default MenuManager;
