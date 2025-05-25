import { ChevronsLeftRight, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@supabase/supabase-js';
import { FC } from 'react';
import { Item } from './Item';

type Props = {
  user: User;
  signout: () => void;
};

const UserItem: FC<Props> = ({ user, signout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex w-full items-center p-3 text-sm hover:bg-primary/5" role="button">
          <div className="flex max-w-[150px] items-center gap-x-2">
            <span className="line-clamp-1 text-start font-medium">
              {user.user_metadata.name} さんのノート
            </span>
          </div>
          <ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">{user.email}</p>
          <div className="flex items-center gap-x-2">
            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">{user.user_metadata.name}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground" asChild>
          <Item label="ログアウト" icon={LogOut} onClick={signout} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
