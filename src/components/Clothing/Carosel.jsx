import { CLOTH1, CLOTH2, CLOTH3 } from "../../constants";

const images = [{src: CLOTH1, alt: ''}, {src: CLOTH2, alt: ''}, {src: CLOTH3, alt: ''}]

export default function Carosel() {
  return (
    <div><h3>Any piece of clothing we wear is woven</h3>
    <div>
    {images.map((img, i) =>   <div>
        <img key={i} src={img.src} alt={img.alt}></img>
    </div>)}
    </div>
    </div>

  )
}
