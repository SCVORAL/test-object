import "./DoubleColorBarProps.scss";

interface DoubleColorBarProps {
  firstValue: number;
  secondValue: number;
  firstColor: string;
  secondColor: string;
  height?: number;
}

const DoubleColorBar: React.FC<DoubleColorBarProps> = ({
  firstValue,
  secondValue,
  firstColor,
  secondColor,
  height = 8,
}) => {
  const total = firstValue + secondValue;
  const firstPercent = total ? (firstValue / total) * 100 : 0;
  const secondPercent = total ? (secondValue / total) * 100 : 0;

  return (
    <div
      className="double-bar"
      style={
        {
          "--height": `${height}px`,
          "--first-width": `${firstPercent}%`,
          "--first-bgColor": firstColor,
          "--second-width": `${secondPercent}%`,
          "--second-bgColor": secondColor,
        } as React.CSSProperties
      }
    >
      <div className="double-bar__segment double-bar__segment--first" />
      <div className="double-bar__segment double-bar__segment--second" />
    </div>
  );
};

export default DoubleColorBar;
