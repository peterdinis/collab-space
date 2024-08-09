'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FC, useState } from 'react';
import { Label } from '@/components/ui/label';
import { useForm, FieldValues } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import AuthWrapper from './AuthWrapper';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm: FC = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const loginUser = async (data: FieldValues) => {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: result.error,
                    duration: 2000,
                    className: 'bg-red-800 text-white font-bold',
                });
            } else {
                toast({
                    title: 'Login DONE',
                    duration: 2000,
                    className: 'bg-green-800 text-white font-bold',
                });
                router.push('/dashboard');
            }
        } catch (error) {
            toast({
                title: 'Something went wrong',
                duration: 2000,
                className: 'bg-red-800 text-white font-bold',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthWrapper>
            <Card className='mx-auto max-w-sm'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(loginUser)}>
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
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        {...register('password', {
                                            required: true,
                                        })}
                                    />
                                    <Button
                                        type='button'
                                        variant={'ghost'}
                                        className='absolute inset-y-0 right-0 flex items-center px-2'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </Button>
                                </div>
                            </div>
                            <Button
                                disabled={loading}
                                type='submit'
                                className='w-full'
                            >
                                {loading ? 'Logging in...' : 'Login'}
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
