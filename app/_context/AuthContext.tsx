'use client';

import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useState,
    useEffect,
} from 'react';
import {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User,
    signInWithPopup,
    GoogleAuthProvider,
    UserCredential,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../_firebase/init';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    currentUser: User | null;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<UserCredential | undefined>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence);
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                    setCurrentUser(user);
                });
                return unsubscribe;
            } catch (error) {
                console.error('Error setting persistence:', (error as Error).message);
            }
        };
        initializeAuth();
    }, []);

    const register = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error registering:', (error as Error).message);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error logging in:', (error as Error).message);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            router.push("/dashboard");
            return result;
        } catch (error) {
            console.error('Error signing in with Google:', (error as Error).message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', (error as Error).message);
        }
    };

    const value: AuthContextType = {
        currentUser,
        register,
        login,
        signInWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};