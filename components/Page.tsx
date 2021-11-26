import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';

const Page = ({ name, children }) => {

    const router = useRouter();

    const sTitle = `Fast Feedback - ${name}`;
    const url = `https://fastfeedback-alpha-amber.vercel.com/${router.pathname}`;

    return (
        <>
            <NextSeo
                title={sTitle}
                canonical={url}
                openGraph={{
                    url,
                    title: sTitle,
                }}
            />
            {children}
        </>
    );
};

export default Page;