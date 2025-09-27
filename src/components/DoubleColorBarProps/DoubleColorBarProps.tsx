import "./DoubleColorBarProps.scss";

interface DoubleColorBarProps {
  firstValue: number; // процент первого сегмента (0-100)
  secondValue: number; // процент второго сегмента (0-100)
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
    <div className="double-bar" style={{ height }}>
      <div
        className="double-bar__segment double-bar__segment--first"
        style={{ width: `${firstPercent}%`, backgroundColor: firstColor }}
      />
      <div
        className="double-bar__segment double-bar__segment--second"
        style={{ width: `${secondPercent}%`, backgroundColor: secondColor }}
      />
    </div>
  );
};

export default DoubleColorBar;
