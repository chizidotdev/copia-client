import axios from 'axios';
import { BASE_URL } from '~/lib/constants';
import type { User } from '~/lib/types';

type LoginRequest = {
    email: string;
    password: string;
};

export const signup = async ({ email, password }: LoginRequest): Promise<string> => {
    const response = await axios.post(
        `${BASE_URL}/signup`,
        { email, password },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    return response.data;
};

type EmailOptions<T extends Providers> = T extends 'google'
    ? undefined
    : {
        email: string;
        password: string;
    };
type Providers = 'google' | 'email';
export const signIn = async <T extends Providers>(provider: T, options?: EmailOptions<T>) => {
    if (provider === 'google') {
        window.location.href = `${BASE_URL}/login/google`;
        return;
    }

    const { email, password } = options!;
    const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
    );
    return response;
};

export const getUser = async (): Promise<User | string> => {
    try {
        const response = await axios.get(`${BASE_URL}/user`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return (error as Error).message;
    }
};

export const signOut = async (): Promise<any> => {
    const response = await axios.get(`${BASE_URL}/logout`);
    return response.data;
};
