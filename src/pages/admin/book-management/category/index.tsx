import type { NextPage } from "next";
import Head from "next/head";

import BookCategoryTable from "@/components/Tables/BookCategoryTable";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin - Book Store</title>
      </Head>
      <BookCategoryTable />
    </>
  );
};

export default IndexPage;
