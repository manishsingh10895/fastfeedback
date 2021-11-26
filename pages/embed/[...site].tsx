import Feedback from '@/components/Feedback'
import FeedbackLink from '@/components/FeedbackLink';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedBack, getAllSites, getSite } from '@/lib/db-admin';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/dist/client/router';
import React, { useRef, useState } from 'react'

export async function getStaticProps(context) {
    const [siteId, route] = context.params.site;

    const { feedbacks, error } = await getAllFeedBack(siteId, route);
    
    const site = await getSite(siteId);
    return {
        revalidate: 1,
        props: {
            initialFeedback: feedbacks ? feedbacks : [],
            ...site
        }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {
    const { sites, error } = await getAllSites();

    const paths = sites ? sites.map(s => {
        return {
            params: {
                site: [s.id.toString()]
            },
        }
    }) : {}
    return {
        paths: paths,
        fallback: true,
    };
}

export default function Embed({ initialFeedback, site }) {
    const auth = useAuth();

    const router = useRouter();

    const toast = useToast();

    const inputEl = useRef(null);

    const [feedbacks, setFeedbacks] = useState(initialFeedback);

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            const form = e.target;

            if (!inputEl.current || inputEl.current.value == "") {
                return;
            }

            const newFeedback = {
                author: auth.user.displayName,
                authorId: auth.user.uid,
                siteId: router.query.siteId as string,
                text: inputEl.current.value,
                createdAt: new Date().toISOString(),
                status: 'pending',
                provider: auth.user.provider
            };

            toast({
                title: "Success",
                status: 'success',
                description: "FeedBack added",
            });

            let created = await createFeedback(newFeedback);
            newFeedback['id'] = created.id;

            setFeedbacks([newFeedback, ...feedbacks]);

            inputEl.current.value = "";
        } catch (error) {
            console.error(error);
        } finally {

        }
    }

    return (
        <Box flexDirection="column" display="flex"
            width="full"
        >
            <FeedbackLink paths={router?.query?.site as string[] || []} />
            {
                feedbacks && feedbacks.length ? feedbacks.map(f => {
                    return (
                        <Feedback settings={site?.settings} {...f} key={f.id} />
                    )
                }) : <Box>
                    There are no comments for this site
                </Box>
            }
        </Box>
    )
}
