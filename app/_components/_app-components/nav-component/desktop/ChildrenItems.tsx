'use client';
import React from 'react';
import { MenuT } from '@/_types/menuTypes';
import Link from 'next/link';
import Dropdown from './Dropdown';
import MegaMenu from './MegaMenu';

import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/_components/ui/navigation-menu';

import { cn } from '@/lib/utils';

interface PropT {
  name: string;
  children: MenuT[];
}

export const ChildrenDesktop = ({ name, children }: PropT) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{name}</NavigationMenuTrigger>
      <NavigationMenuContent>
        {!children[0].children ? (
          <Dropdown children={children} />
        ) : (
          children[0].children && <MegaMenu children={children} />
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
