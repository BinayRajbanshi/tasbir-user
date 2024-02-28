import { MenuT } from '@/_types/menuTypes';
import React from 'react';
import Link from 'next/link';
import { Separator } from '@/_components/ui/separator';

const Dropdown = ({ children }: { children: MenuT[] }) => {
  return (
    <div className="z-10 divide-y divide-gray-100 border dark:border-gray-700 rounded-lg shadow w-44 bg-background">
      <ul className=" text-sm">
        {children.map((item) => {
          return (
            <li>
              <Link
                href={item.route}
                className="block px-4 py-2 border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
