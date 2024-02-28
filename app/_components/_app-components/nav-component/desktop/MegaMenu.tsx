import React, { useState } from 'react';
import { MenuT } from '@/_types/menuTypes';
import { ChevronRight } from 'lucide-react';
import { MegaMenuLink } from './MegaMenuLink';

const MegaMenu = ({ children }: { children: MenuT[] }) => {
  const [activeMenu, setActiveMenu] = useState(children[0].name);
  return (
    <div className="p-4 md:min-w-[650px] bg-background shadow-md rounded-sm border dark:border-gray-700 text-sm gap-6 p-3 flex gap-4">
      <div className="flex flex-col border-r pr-4 dark:border-gray-700">
        {children.map((item) => {
          return (
            <button
              className="text-start py-1 hover:underline flex items-center dark:text-accent font-medium text-md gap-6 justify-between"
              onClick={() => setActiveMenu(item.name)}
            >
              {item.name}
              <span>
                <ChevronRight className="h-4 w-4 font-semibold" />
              </span>
            </button>
          );
        })}
      </div>
      <div
        className={`${
          children[0].children && children[0].children[0].children
            ? 'grid grid-cols-3 gap-5 justify-between '
            : 'flex flex-col justify-start'
        } bg-background grow`}
      >
        {children
          .find((menu) => menu.name == activeMenu)
          ?.children?.map((item) => {
            return <MegaMenuLink name={item.name} route={item.route} children={item.children} />;
          })}
      </div>
    </div>
  );
};

export default MegaMenu;
