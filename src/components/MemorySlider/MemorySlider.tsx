import "./MemorySlider.scss";
import * as Slider from "@radix-ui/react-slider";

interface MemorySliderProps {
  max: number;
  min: number;
  firstEnd: number;
  secondEnd: number;
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
}

const MemorySlider: React.FC<MemorySliderProps> = ({
  max,
  min,
  firstEnd,
  secondEnd,
  value,
  setValue,
}) => {
  return (
    <div className="memory-slider">
      <Slider.Root
        value={value}
        onValueChange={setValue}
        max={max}
        min={min}
        step={1}
        className="memory-slider__root"
      >
        <Slider.Track className="memory-slider__track">
          <div
            className="memory-slider__segment memory-slider__segment--first"
            style={{ flex: firstEnd - min }}
          />
          <div
            className="memory-slider__segment memory-slider__segment--second"
            style={{ flex: secondEnd - firstEnd }}
          />
          <div
            className="memory-slider__segment memory-slider__segment--third"
            style={{ flex: max - secondEnd }}
          />

          <div
            className="memory-slider__divider"
            style={{
              left: `${(firstEnd / max) * 100}%`,
              width: `${((secondEnd - firstEnd) / (max - min)) * 100}%`,
            }}
          />
        </Slider.Track>

        <Slider.Thumb className="memory-slider__thumb">
          <div className="memory-slider__thumb-rect"></div>
          <div className="memory-slider__thumb-triangle"></div>
          <div className="memory-slider__thumb-line"></div>
        </Slider.Thumb>
      </Slider.Root>

      <div
        className="memory-slider__labels"
        style={
          {
            "--first-end": `${(firstEnd / max) * 100}%`,
            "--second-end": `${(secondEnd / max) * 100}%`,
          } as React.CSSProperties
        }
      >
        <span className="memory-slider__label memory-slider__label--min">
          {min} GB
        </span>
        <span className="memory-slider__label memory-slider__label--first">
          {firstEnd} GB
        </span>
        <span className="memory-slider__label memory-slider__label--second">
          {secondEnd} GB
        </span>
        <span className="memory-slider__label memory-slider__label--max">
          {max} GB
        </span>
      </div>

      <div className="memory-slider__recommended">Recommended</div>
    </div>
  );
};

export default MemorySlider;
