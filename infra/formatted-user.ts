export type FormattedUser = {
    displayName: string;
    email: string;
    photoURL: string;
    token?: string;
    uid: string;
    stripeRole: string;
    provider: string;
}