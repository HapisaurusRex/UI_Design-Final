"use client"
import Link from "next/link";
import styles from "./page.module.css"
import "./weave.css"


// test stuff
import { useState } from "react";
import RainContainer from "../components/test/RainContainer";


//end test stuff

export default function Home() {
  const [blocked, setBlocked] = useState(false);

  const handleDrop = ({ x, y }) => {
    const centerX = window.innerWidth / 2;
    const centerY = 300;
    const distance = Math.hypot(centerX - x, centerY - y);
    if (distance < 60) setBlocked(true);
  };
  return (
    <main>
      <h1 className="text-center fw-bold mb-4">The 3 keys to dressing for the weather</h1>
      <div className={styles.triangleContainer}>
      <svg className={styles.triangleSvg}viewBox="0 0 300 260">

        <polygon points="150,0 0,260 300,260"
                fill="none" stroke="black" strokeWidth="2"/>
        <line x1="150" y1="0"    x2="150" y2="173.2" stroke="black" strokeWidth="1.5"/>
        <line x1="0"   y1="260"  x2="150" y2="173.2" stroke="black" strokeWidth="1.5"/>
        <line x1="300" y1="260"  x2="150" y2="173.2" stroke="black" strokeWidth="1.5"/>


        <Link href="/layering">
          <polygon points="150,0 0,260 150,173.2" className={styles.triangleBtn}/>
          <text x="100" y="150" textAnchor="middle" fontSize="12">Layering</text>
        </Link>

        <Link href="/material">
          <polygon points="0,260 300,260 150,173.2" className={styles.triangleBtn}/>
          <text x="150" y="230" textAnchor="middle" fontSize="12">Material</text>
        </Link>

        <Link href="/clothing">
          <polygon points="300,260 150,0 150,173.2" className={styles.triangleBtn}/>
          <text x="200" y="150" textAnchor="middle" fontSize="12">
            <tspan x="200">Clothing</tspan>
            <tspan x="200" dy="14">Type</tspan>
          </text>
        </Link>

      </svg>

      <RainContainer blocked={blocked} handleDrop={handleDrop} />;

  </div>
    </main>
    
  );
}
