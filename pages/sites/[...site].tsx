import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { toast, useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useRef, useState } from 'react'
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedBack, getAllSites, getSite } from '@/lib/db-admin';
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from '@/components/SiteHeader';
import LoginButtons from '@/components/LoginButtons';
import { Textarea } from '@chakra-ui/react';

type Props = {
    siteId: string
}

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

export default function SiteFeedback({ initialFeedback, site }) {

    const auth = useAuth();

    const router = useRouter();

    const toast = useToast();

    const [siteId, route] = router.query.site ? router.query.site as string[] : [];

    const inputEl = useRef(null);

    const [feedbacks, setFeedbacks] = useState(initialFeedback);
    useEffect(() => {
        setFeedbacks(initialFeedback);
    }, [initialFeedback])

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
                siteId: siteId as string,
                text: inputEl.current.value,
                createdAt: new Date().toISOString(),
                status: 'pending',
                provider: auth.user.provider,
                route: route || '/'
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

    const LoginOrLeaveFeedback = () =>
        auth.user ? (
            <Button
                type="submit"
                isDisabled={router.isFallback}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                mt={4}
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                Leave Feedback
            </Button>
        ) : (
            <LoginButtons />
        );

    return (
        <DashboardShell>
            <SiteHeader site={site} route={route} siteId={siteId}></SiteHeader>
            <Box flexDirection="column" display="flex" width="full" maxWidth="700px" margin="0 auto">
                <Box as="form" onSubmit={onSubmit}>
                    <FormControl mb={8}>
                        <Textarea
                            ref={inputEl}
                            id="comment"
                            placeholder="Leave a comment"
                            h="100px"
                        />
                        {!auth.loading && <LoginOrLeaveFeedback />}
                    </FormControl>
                </Box>
                {
                    feedbacks ? feedbacks.map((f, i) => {
                        return (
                            <Feedback settings={site.settings} isLast={i == feedbacks.length - 1} {...f} key={f.id} />
                        )
                    }) : null
                }
            </Box>
        </DashboardShell>
    )
}
