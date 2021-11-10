import { createContext, useContext, useState } from 'react';
import firebase from './firebase';
import { createUser } from './db';
import { FormattedUser } from '../infra/formatted-user';

export type AuthContextType = {
    user: FormattedUser | null;
    loading: boolean;
    signinWithGithub: () => Promise<void>;
    signout: () => Promise<void>;
}

const authContext = createContext<AuthContextType>({
    loading: false,
    user: null,
    signinWithGithub: async () => {
        throw new Error('Not implemented');
    },
    signout: async () => {
        throw new Error('Not implemented');
    }
});

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

export const useProvideAuth: () => AuthContextType = () => {
    const [user, setUser] = useState<FormattedUser | null>(null);

    const [loading, setLoading] = useState(false);

    const formatUser = (user: firebase.User): FormattedUser => {
        return {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            provider: user.providerData[0].providerId
        };
    };


    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            // createUser(user.uid, user);
            setUser(user);
        } else {
            setUser(null);
            return null;
        }
    };

    const signinWithGithub = () => {
        setLoading(true);
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then(result => {
                handleUser(result.user);
                setLoading(false);
            });
    }

    const signout = () => {
        setLoading(true);
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setLoading(false);
                setUser(null);
            });
    }

    return {
        user,
        signinWithGithub,
        signout,
        loading
    }
}