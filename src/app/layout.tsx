// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'VarsityPlay',
  description: 'College sports platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <header className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <h1 className="text-xl bg-lime-300 text-blue-600 font-semibold">VarsityPlay</h1>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>

        <footer className="mt-12 text-center text-sm text-slate-500 pb-8">
          Built with effort & mild caffeine.
        </footer>
      </body>
    </html>
  );
}
