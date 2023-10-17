"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import NewsPostPage from "@/pages/News/PostNews";
import { useParams } from "next/navigation";

const NewsEdit = () => {

  return (
    <PageContainer title="News List" description="This is News List">
      <Layout>
        <NewsPostPage />;
      </Layout>
    </PageContainer>
  );
};

export default NewsEdit;
