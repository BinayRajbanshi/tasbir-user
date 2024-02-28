import '../_assets/globals.css';
import { Toaster } from '@/_components/ui/toaster';
import { ThemeProvider } from '@/_components/ui/theme-provider';
import { poppins } from '@/lib/font';
import AppBar from '@/_components/_app-components/nav-component/appbar/index';
import CartContextProvider from '@/contexts/cart-contexts';

export default function RootLayout({
  children, // will be a page or nested layout
}) {
  // Add router.asPath to the dependency array

  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="bg-background">
        <CartContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Toaster />
            <div className="container-fluid flex">
              {/* Sidebar */}

              {/* Main Content Area */}
              <main className="md:w-full">{children}</main>
            </div>
          </ThemeProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
