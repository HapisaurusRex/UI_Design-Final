// WeaveStructure.jsx placeholder
export default function WeaveStructure({ filled }) {
    return (
      <div className="weave">
        <div className="circle" />
        <div className="gap">
          {filled && <div className="plug" />}
        </div>
        <div className="circle" />
      </div>
    );
  }
  