import { Box } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";

import classes from "./index.module.css";

import { LoginForm } from "@/components/Forms/LoginForm";

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Book Store</title>
      </Head>
      <Box className={classes.wrapper}>
        <Box w={340}>
          <LoginForm />
        </Box>
      </Box>
    </>
  );
};

export default IndexPage;
