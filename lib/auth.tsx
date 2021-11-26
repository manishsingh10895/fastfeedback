import { createContext, useContext, useEffect, useState } from 'react';
import firebase from './firebase';
import { createUser } from './db';
import { FormattedUser } from '@/infra/formatted-user';
import Cookies from 'js-cookie';

export type AuthContextType = {
    user: FormattedUser | null;
    loading: boolean;
    signinWithGoogle: () => Promise<void>;
    signinWithGithub: () => Promise<void>;
    signout: () => Promise<void>;
}


const authContext = createContext<AuthContextType>({
    loading: false,
    user: null,
    signinWithGithub: async () => {
        throw new Error('Not implemented');
    },
    signinWithGoogle: async () => {
        throw new Error('Not implemented');
    },
    signout: async () => {
        throw new Error('Not implemented');
    }
});

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    firebase.auth().onAuthStateChanged(async (user) => {
    });
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

export const useProvideAuth: () => AuthContextType = () => {
    const [user, setUser] = useState<FormattedUser | null>(null);

    const [loading, setLoading] = useState(true);

    const formatUser = async (user: firebase.User): Promise<FormattedUser> => {
        const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

        return {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            stripeRole: decodedToken.claims.stripeRole,
            token: await user.getIdToken(),
            provider: user.providerData[0].providerId
        };
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                formatUser(user)
                    .then(formattedUser => {
                        setUser(formattedUser);
                        Cookies.set('fast-feedback-auth', 'true', {
                            expires: 60 * 1000 * 100
                        });
                        setLoading(false);
                    });
            } else {
                setUser(null);
                setLoading(false);
                Cookies.remove('fast-feedback-auth');
            }
        });
    }, []);


    const handleUser = (rawUser) => {
        if (rawUser) {
            formatUser(rawUser)
                .then((user) => {
                    const { token, ...userWithoutToken } = user;
                    createUser(user.uid, userWithoutToken);
                    setUser(user);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                })
        } else {
            setUser(null);
            setLoading(false);
            Cookies.remove('fast-feedback-auth');
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
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }

    const signinWithGoogle = () => {
        setLoading(true);
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(result => {
                handleUser(result.user);
            }).catch(() => {
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
                Cookies.remove('fast-feedback-auth');
                setUser(null);
            }).catch(() => {
                setLoading(false);
            });
    }

    return {
        user,
        signinWithGithub,
        signinWithGoogle,
        signout,
        loading
    }
}