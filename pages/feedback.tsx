import { Button, Heading, Text, Code } from '@chakra-ui/react';
import Head from 'next/head'
import React from 'react';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';
import { useAuth } from '@/lib/auth';
import FeedbackTable from '../components/FeedbackTable';
import EmptyState from '../components/EmptyState';
import FeedbackTableHeader from '../components/FeedbackTableHeader';

export default function Dashboard() {
    const { user } = useAuth();

    const { data, error } = useSWR(user ? ['/api/feedback', user.token] : null, {
        fetcher: fetcher
    });

    console.log(data);

    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {
                data ? <>
                    {
                        data.feedbacks.length ?
                            <FeedbackTable feedbacks={data.feedbacks} ></FeedbackTable>
                            : <EmptyState />
                    }
                </> : <SiteTableSkeleton />
            }
        </DashboardShell>
    )
}
