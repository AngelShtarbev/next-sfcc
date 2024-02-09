import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js app with Salesforce Commerce Cloud',
  description: 'Generated for Next.js app with Salesforce Commerce Cloud',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
};
