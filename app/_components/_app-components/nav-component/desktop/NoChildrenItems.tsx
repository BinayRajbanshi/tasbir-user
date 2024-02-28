import Link from 'next/link';
import { NavigationMenuLink, NavigationMenuItem, navigationMenuTriggerStyle } from '@/_components/ui/navigation-menu';

interface PropT {
  name: string;
  route: string;
}

const NoChildrenDesktop = ({ name, route }: PropT) => {
  return (
    <NavigationMenuItem>
      <Link href={route} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{name}</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

export default NoChildrenDesktop;
