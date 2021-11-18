import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { toast, useToast } from '@chakra-ui/toast';
import { useRouter } from 'next/dist/client/router';
import React, { useRef, useState } from 'react'
import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedBack, getAllSites } from '@/lib/db-admin';

type Props = {
    siteId: string
}

export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const { feedback, error } = await getAllFeedBack(siteId);
    return {
        revalidate: 1,
        props: {
            initialFeedback: feedback ? feedback : [],
        }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {
    const { sites, error } = await getAllSites();

    const paths = sites ? sites.map(s => {
        return {
            params: {
                siteId: s.id.toString()
            },
        }
    }) : {}
    return {
        paths: paths,
        fallback: true,
    };
}

export default function SiteFeedback({ initialFeedback }) {

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

            console.log('[NEW FEEDBACK CREATED]');
            console.log(created);
            console.log(newFeedback);


            setFeedbacks([newFeedback, ...feedbacks]);
            console.log("Done");

            inputEl.current.value = "";
        } catch (error) {
            console.error(error);
        } finally {

        }
    }

    return (
        <Box flexDirection="column" display="flex" width="full" maxWidth="700px" margin="0 auto">
            <Box as="form" onSubmit={onSubmit}>
                <FormControl my={10} id="email">
                    <FormLabel htmlFor="comment">Comment</FormLabel>
                    <Input ref={inputEl} type="text" name="comment" id="comment" />
                    <Button disabled={router.isFallback} type="submit" fontWeight="medium" mt="10px">Add Comment</Button>
                </FormControl>
            </Box>
            {
                feedbacks ? feedbacks.map(f => {
                    return (
                        <Feedback {...f} key={f.id} />
                    )
                }) : null
            }
        </Box>
    )
}
