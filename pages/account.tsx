import { Button, Heading, Text, Code, Box } from '@chakra-ui/react';
import Head from 'next/head'
import React, { useState } from 'react';
import { useAuth } from '@/lib/auth';
import styles from '@/styles/Home.module.css';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '../components/SiteTableSkeleton';
import DashboardShell from '../components/DashboardShell';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import SiteTable from '../components/SiteTable';
import SiteTableHeader from '../components/SiteTableHeader';
import ActionButton from '../components/ActionButton';
import { createCheckoutSession, getToBillingPortal } from '../lib/db';

export default function Account() {
    const { user, signinWithGithub } = useAuth();

    const [loading, setLoading] = useState(false);

    return (
        <DashboardShell>
            <Box display="flex" >
                <ActionButton
                    isLoading={loading}
                    mr={5}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await createCheckoutSession(user.uid);
                        } catch (error) {
                            console.error(error);
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    Upgrade to starter
                </ActionButton>

                <ActionButton
                    isLoading={loading}
                    onClick={async () => {
                        setLoading(true);
                        try {
                            await getToBillingPortal();
                        } catch (error) {
                            console.error(error);
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    View Billing Portal
                </ActionButton>
            </Box>
        </DashboardShell >
    )
}
