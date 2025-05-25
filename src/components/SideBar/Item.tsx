import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ItemProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  onIconClick?: (event: React.MouseEvent) => void;
  isActive?: boolean;
  trailingItem?: React.ReactElement;
}

export function Item({
  label,
  onClick,
  onIconClick,
  icon: Icon,
  isActive = false,
  trailingItem,
}: ItemProps) {
  return (
    <div
      className={cn(
        'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground',
        isActive && 'bg-neutral-200',
      )}
      onClick={onClick}
      role="button"
      style={{ paddingLeft: '12px' }}
    >
      <Icon
        onClick={onIconClick}
        className="mr-2 h-[18px] w-[18px] shrink-0 text-muted-foreground"
      />
      <span className="truncate">{label}</span>
      {trailingItem}
    </div>
  );
}
