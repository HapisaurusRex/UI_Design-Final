import styles from "./Clothing.module.css";
import Link from "next/link";
import { MAT1 } from "../../constants";

const images = [
  { src: MAT1, alt: "" , href: 'cotton'},
  { src: MAT1, alt: "" , href: 'wool'},
  { src: MAT1, alt: "" , href: 'down'},
  { src: MAT1, alt: "" , href: 'fleece'},
  { src: MAT1, alt: "" , href: 'synthetic'},
];

export default function Table() {
  return (
    <div>
      <h3>Common Clothing Materials</h3>
      <div className={styles.imgWrapper}>
        {images.map((img, i) => (
          <div key={i}>
            <Link href={`/clothing/${img.href}`}>
              <img
                className="img-fluid"
                src={img.src}
                alt={img.alt}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
