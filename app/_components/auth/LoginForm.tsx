'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FC, useState } from 'react';
import { Label } from '@/components/ui/label';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/app/_context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import AuthWrapper from './AuthWrapper';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from "react-icons/fa";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const { login, signInWithGoogle } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            await login(data.email, data.password);
            toast({
                title: 'Login successful',
                duration: 2000,
                className: 'bg-green-700 text-white font-bold',
            });
            router.push('/dashboard');
        } catch (error) {
            toast({
                title: 'Login failed',
                duration: 2000,
                className: 'bg-red-700 text-white font-bold',
            });
            console.error('Login error:', error);
        }
    };

    return (
        <AuthWrapper>
            <Card className='mx-auto max-w-sm'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid gap-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='m@example.com'
                                    {...register('email', { required: true })}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <Label htmlFor='password'>Password</Label>
                                </div>
                                <div className='relative'>
                                    <Input
                                        id='password'
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                    <Button
                                        type='button'
                                        variant={"ghost"}
                                        className='absolute inset-y-0 right-0 flex items-center px-2'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </Button>
                                </div>
                            </div>
                            <Button type='submit' className='w-full'>
                                Login
                            </Button>
                            <Button variant='outline' onClick={signInWithGoogle} className='w-full'>
                                <FaGoogle /> &nbsp; Login with Google
                            </Button>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                            Don&apos;t have an account?{' '}
                            <Link href='/register' className='underline'>
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthWrapper>
    );
};

export default LoginForm;