// DraggableBlock.jsx placeholder
import { motion } from "framer-motion";

export default function DraggableBlock({ shape, onDrop }) {
  return (
    <motion.div
      className={`block ${shape}`}
      drag
      dragMomentum={false}
      onDragEnd={(e, info) => {
        onDrop(info.point);
      }}
    />
  );
}
