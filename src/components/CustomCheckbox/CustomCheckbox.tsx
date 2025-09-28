import "./CustomCheckbox.scss";
import images from "../../assets/img";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  label?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      <span className="custom-checkbox__box">
        {checked && <img src={images.completeStep} alt="check" />}
      </span>
      {label && <span className="custom-checkbox__label">{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
