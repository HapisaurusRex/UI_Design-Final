'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Triangle from './Triangle'
import styles from './Header.module.css'

const pathNames = {
    '/layering': 'Layering',
    '/material': 'Material',
    '/clothing': 'Clothing'
  }

export default function Header() {
    const path = usePathname()  
    const header = pathNames[path]
  
  return (
    <div className={styles.header}><h2>{header}</h2>
    <Triangle/></div>
  )
}
