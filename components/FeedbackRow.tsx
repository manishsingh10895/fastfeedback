import { Code, Switch } from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { useAuth } from '../lib/auth';
import { updateFeedback } from '../lib/db';
import DeleteFeedbackButton from './DeleteFeedbackButton';
import { Table, Td, Th, Tr } from './Table';

type Props = {
    feedback: any
}


export default function FeedbackRow(props: Props) {

    const auth = useAuth();

    const [checked, setChecked] = useState(false);

    const { feedback: s } = props;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setChecked(s.status === 'active');
    }, []);

    async function toggleFeedback(e: ChangeEvent<HTMLInputElement>,) {
        setLoading(true);
        try {
            setChecked(!checked);
            updateFeedback(s.id, { status: !checked ? 'active' : 'pending' });
            mutate(['/api/feedback', auth.user.token], async (data) => {
                const currFeedback = data.feedbacks.find((feedback) => feedback.id === s.id);
                currFeedback.status = !checked ? 'active' : 'pending';

                return {
                    feedbacks: data.feedbacks
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Tr key={s.id}>
            <Td fontWeight="medium">
                {s.author}
            </Td>
            <Td>
                {s.text}
            </Td>
            <Td>
                <Code>
                    {s.route}
                </Code>
            </Td>
            <Td>
                <Switch
                    onChange={toggleFeedback}
                    colorScheme="green"
                    isChecked={checked} />
            </Td>
            <Td>
                <DeleteFeedbackButton feedbackId={s.id} />
            </Td>
        </Tr>
    )
}