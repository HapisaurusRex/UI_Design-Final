'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function page() {
  const pathName = usePathname().split('/').slice(-1)[0]

  console.log(pathName)
  return (
    <>
    <div>page material: {pathName}</div>
    <Link href='/clothing'>Back</Link>
    </>
  )
}
