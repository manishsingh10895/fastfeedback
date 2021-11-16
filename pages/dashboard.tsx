import { Button, Heading, Text, Code } from '@chakra-ui/react';
import Head from 'next/head'
import React from 'react';
import { useAuth } from '@/lib/auth';
import styles from '@/styles/Home.module.css';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';
import SiteTableHeader from '../components/SiteTableHeader';

export default function Dashboard() {
    const { user } = useAuth();


    const { data, error } = useSWR(user ? ['/api/sites', user.token] : null, {
        fetcher: fetcher
    });

    console.log(data);

    return (
        <DashboardShell>
            <SiteTableHeader />
            {
                data ? <>
                    {
                        data.sites.length ?
                            <SiteTable sites={data.sites} ></SiteTable>
                            : <EmptyState />
                    }
                </> : <SiteTableSkeleton />
            }
        </DashboardShell>
    )
}
