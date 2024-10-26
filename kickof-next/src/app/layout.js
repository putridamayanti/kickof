'use client'

import localFont from "next/font/local";
import "./globals.css";
import {Provider} from "react-redux";
import RootApp from "layouts/Root";
import store from "store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
          <title>KickOf - Project Management</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <Provider store={store}>
          <RootApp>
              {children}
          </RootApp>
      </Provider>
      </body>
      </html>
  );
}
