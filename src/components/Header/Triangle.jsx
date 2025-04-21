"use client";

// data type we'll need:
const data = { layering: 1, material: 1, clothing: 1 }


export default function Triangle() {

    const getColor = (key) => (data[key] === 1 ? "#4CAF50" : "#E0E0E0");
    const showQuiz = data.material && data.layering && data.clothing
    
    return (
      <>
      <svg viewBox="0 0 300 260" width="40" height="35" xmlns="http://www.w3.org/2000/svg">
        {/* Outer triangle outline */}
        <polygon
          points="150,0 0,260 300,260"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
  
        {/* Layering (left) */}
        <polygon
          points="150,0 0,260 150,173.2"
          fill={getColor("layering")}
          stroke="black"
          strokeWidth="1"
        />
  
        {/* Material (bottom) */}
        <polygon
          points="0,260 300,260 150,173.2"
          fill={getColor("material")}
          stroke="black"
          strokeWidth="1"
        />
  
        {/* Clothing (right) */}
        <polygon
          points="300,260 150,0 150,173.2"
          fill={getColor("clothing")}
          stroke="black"
          strokeWidth="1"
        />
      </svg>
      
      {!!showQuiz && <button>Quiz</button>}</>
    );
}
