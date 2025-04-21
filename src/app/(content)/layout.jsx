'use client'

import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";

export default function ContentLayout({
  children,
}) {
  const pathNames = usePathname().split('/')
  return (
    <>
     {pathNames.length < 3 && <Header />} 
      {children}
    </>
  );
}
