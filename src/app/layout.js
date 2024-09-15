// src/app/layout.js
'use client'; // クライアントコンポーネントとしてマーク

import { UserProvider } from '../context/UserContext'; // パスを調整

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
