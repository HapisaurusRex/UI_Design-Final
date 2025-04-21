// RainContainer.jsx placeholder

import RainDrop from "./RainDrop";
import DraggableBlock from "./DraggableBlock";
import WeaveStructure from "./WeaveStructure";
import ResultLabel from "./ResultLabel";


export default function RainContainer({ blocked, handleDrop }) {

    

    const drops = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random(),
    }));
  
    return (
        <div className="rain-box">
          {/* Falling drops */}
          {drops.map((drop) => (
            <RainDrop key={drop.id} {...drop} blocked={blocked} />
          ))}
    
          {/* Interactive elements inside the rain box */}
          <DraggableBlock shape="rect" onDrop={handleDrop} />
          <DraggableBlock shape="circle" onDrop={handleDrop} />
          <WeaveStructure filled={blocked} />
          <ResultLabel blocked={blocked} />
        </div>
      );
  }
