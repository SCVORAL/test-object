import { useState } from "react";
import img from "../../assets/img";
import "./DaysSelector.scss";

interface DaysSelectorProps {
  days: number;
  setDays: (days: number) => void;
  options: number[];
}

const DaysSelector: React.FC<DaysSelectorProps> = ({
  days,
  setDays,
  options,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="days-selector">
      <div className="days-selector__toggle" onClick={() => setOpen(!open)}>
        <span className="days-selector__label">Последние {days} дней</span>
        <span
          className={`days-selector__icon ${
            open ? "days-selector__icon--open" : ""
          }`}
        >
          <img src={img.arrow} />
        </span>
      </div>

      {open && (
        <div className="days-selector__menu">
          {options.map((option) => (
            <div
              key={option}
              className="days-selector__item"
              onClick={() => {
                setDays(option);
                setOpen(false);
              }}
            >
              Последние {option} дней
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaysSelector;
