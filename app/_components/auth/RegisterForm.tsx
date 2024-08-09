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
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import AuthWrapper from './AuthWrapper';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/_hooks/useAuth';

interface RegisterFormInputs {
    email: string;
    password: string;
}

const RegisterForm: FC = () => {
    const { register, handleSubmit } = useForm<RegisterFormInputs>();
    const { register: registerUser } = useAuth();
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            await registerUser(data.email, data.password);
            toast({
                title: 'Register DONE',
                duration: 2000,
                className: 'bg-green-700 text-white font-bold',
            });
            router.push('/login');
        } catch (error) {
            toast({
                title: 'Register FAILED',
                duration: 2000,
                className: 'bg-red-700 text-white font-bold',
            });
            console.error('Registration error:', error);
        }
    };

    return (
        <AuthWrapper>
            <Card className='mx-auto max-w-sm'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Register</CardTitle>
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
                                <Label htmlFor='password'>Password</Label>
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
                                Register
                            </Button>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                            Already have an account?{' '}
                            <Link href='/login' className='underline'>
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthWrapper>
    );
};

export default RegisterForm;