import '../_assets/globals.css';
import { Toaster } from '@/_components/ui/toaster';
import { ThemeProvider } from '@/_components/ui/theme-provider';
import { poppins } from '@/lib/font';
import AppBar from '@/_components/_app-components/nav-component/appbar/index';

export default function RootLayout({
  children, // will be a page or nested layout
}) {
  // Add router.asPath to the dependency array

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Toaster />
          <div className="container-fluid flex">
            {/* Sidebar */}
            <aside className="hidden sticky md:block md:w-3/7 top-0 left-0 z-40 w-64 h-screen bg-gray-800 text-white transition-transform -translate-x-full">
              <AppBar />
            </aside>

            {/* Main Content Area */}
            <main className="p-4 md:w-full">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
