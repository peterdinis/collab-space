import { FC } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProfileDropdown: FC = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const { toast } = useToast();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>
                        <User />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Button
                        onClick={() => {
                            signOut({
                                redirectUrl: '/sign-in',
                            });
                            toast({
                                title: 'Successfully logged out',
                                duration: 2000,
                                className: 'bg-green-600 text-white font-bold',
                            });
                        }}
                        variant={'ghost'}
                        size={'sm'}
                    >
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;
