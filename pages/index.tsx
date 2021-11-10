import Head from 'next/head'
import { useAuth } from '../lib/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {auth.user?.displayName}
        <button onClick={() => {
          auth.signinWithGithub();
        }}>
          Sign In
        </button>
      </main>
    </div>
  )
}
