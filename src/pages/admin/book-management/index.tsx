import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const Page: NextPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    push("/admin/book-management/book");
  }, []);

  return (
    <>
      <Head>
        <title>{`Home | Book Management`}</title>
      </Head>
      Book Management
    </>
  );
};

export default Page;
