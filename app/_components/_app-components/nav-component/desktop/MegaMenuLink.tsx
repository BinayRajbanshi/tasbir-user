import { MenuT } from '@/_types/menuTypes';
import Link from 'next/link';
import React from 'react';

export const MegaMenuLink = ({
  name,
  children,
  route,
}: {
  name: string;
  children: MenuT[] | undefined;
  route: string;
}) => {
  return (
    <div>
      {children ? (
        <p className={`font-semibold underline`}>{name}</p>
      ) : (
        <Link href={route} className="text-sm hover:text-accent-foreground">
          {name}
        </Link>
      )}
      <div className="flex flex-col gap-2 mt-3">
        {children?.map((childrenItem) => {
          return (
            <Link className="hover:text-accent-foreground" href={childrenItem.route}>
              {childrenItem.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
