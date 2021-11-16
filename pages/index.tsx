import { Button, Heading, Text, Code, Flex } from '@chakra-ui/react';
import Head from 'next/head'
import Link from 'next/link'
import Cookie from 'js-cookie';
import React from 'react';
import { useAuth } from '@/lib/auth';
import styles from '@/styles/Home.module.css';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import ActionButton from '../components/ActionButton';

export default function Home() {
  const auth = useAuth();
  return (
    <div className={"container"}>
      <Head>
        <title>Fast Feedback</title>
        <script dangerouslySetInnerHTML={{
          __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        ` }} />
      </Head>

      <main className={styles.main}>
        <Heading fontWeight={700}>Fast Feedback</Heading>
        {
          auth.user ?
            <>
              <Flex direction="column" p={"1rem 0"}>
                <Button mb={10}>
                  <Link href="/dashboard">
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
            <Flex margin="1rem" flexWrap="wrap" justifyContent="center ">
              <ActionButton mr={5}
                leftIcon={<FaGithub />}

                onClick={() => {
                  auth.signinWithGithub();
                }}>
                Sign In With Github
              </ActionButton>
              <ActionButton
                backgroundColor="white"
                color="gray.500"
                leftIcon={<FaGoogle />} onClick={() => {
                  auth.signinWithGoogle();
                }}>
                Sign In With Google
              </ActionButton>
            </Flex>
        }
      </main>
    </div >
  )
}
