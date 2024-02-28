'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'node_modules/next/link';

const SideBar = ({ page }) => {
  const activePage = (data: boolean) => {
    if (data) {
      return 'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start';
    } else {
      return 'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start';
    }
  };

  return (
    <aside className="-mx-4 mt-4 lg:w-1/5 h-max md:sticky">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        <Link href="/profile" className={activePage(page === 'profile')}>
          Profile
        </Link>
        <Link href="/order/list" className={activePage(page === 'order-list')}>
          Orders
        </Link>
        <Link href="/purchase/list" className={activePage(page === 'purchase-list')}>
          Purchase History
        </Link>
        <Link href="/profile/change-password" className={activePage(page === 'change-password')}>
          Change Password
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
