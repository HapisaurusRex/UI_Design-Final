// RainDrop.jsx placeholder
export default function RainDrop({ left, delay, blocked }) {
    return (
      <div
        className="raindrop"
        style={{
          left: `${left}%`,
          animationDelay: `${delay}s`,
          opacity: blocked ? 0 : 0.5,
        }}
      />
    );
  }
  