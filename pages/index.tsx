import { Button, Heading, Text, Code, Flex, Box, Icon, IconButton } from '@chakra-ui/react';
import Head from 'next/head'
import Link from 'next/link'
import Cookie from 'js-cookie';
import React from 'react';
import { useAuth } from '@/lib/auth';
import styles from '@/styles/Home.module.css';
import { FaArrowRight, FaGithub, FaGoogle } from 'react-icons/fa';
import ActionButton from '../components/ActionButton';
import { getAllFeedBack } from '../lib/db-admin';
import Feedback from '../components/Feedback';
import Logo from '../components/Logo';
import LoginButtons from '@/components/LoginButtons';

const SITE_ID = "6qjdlW5cMPepYqUez1zQ";

export async function getStaticProps() {
  const { feedbacks, error } = await getAllFeedBack(SITE_ID);
  return {
    revalidate: 1,
    props: {
      feedbacks: feedbacks ? feedbacks : [],
    }, // will be passed to the page component as props
  }
}


export default function Home({ feedbacks }) {
  const auth = useAuth();

  return (
    <div className={"container"}>
      <Head>
        <title>Fast Feedback</title>
        <script dangerouslySetInnerHTML={{
          __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/sites"
          }
        ` }} />
      </Head>

      <main className={styles.main}>
        <Logo />
        <Heading fontWeight={700}>Fast Feedback</Heading>
        {
          auth.user ?
            <>
              <Flex direction="column" p={"1rem 0"}>
                <Button mb={10}>
                  <Link href="/sites">
                    View Dashboard
                  </Link>
                </Button>
                <Button onClick={() => {
                  auth.signout();
                }}>
                  Sign Out
                </Button>
              </Flex>
            </>
            :
            <>
              <LoginButtons />

              <Box padding="0 1rem" w={"100%"} maxWidth="700px" marginLeft="auto" marginRight="auto" mt={10}>
                <Flex justifyContent="space-between">
                  {/* <Link > */}
                  <Button background="transparent" aria-label="leave a comment" rightIcon={<FaArrowRight />}>
                    Leave a comment
                  </Button>
                  {/* </Link> */}

                  <Text fontSize="x-small" color="gray.400">
                    Powered by Fast Feedback
                  </Text>
                </Flex>

                <Box padding="1rem 2rem">
                  {
                    feedbacks ? feedbacks.map(f => {
                      return (
                        <Feedback {...f} key={f.id} />
                      )
                    }) : null
                  }
                </Box>
              </Box>
            </>
        }
      </main>
    </div >
  )
}
