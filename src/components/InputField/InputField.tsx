import classNames from "classnames";
import "./InputField.scss";
import errorIcon from "../../assets/img/error.svg";
import arrowIcon from "../../assets/img/input-arrow.svg";
import { useEffect, useState } from "react";

interface InputFieldProps {
  value: string;
  onChange: (val: string | number) => void;
  max: number;
  suffix?: string;
  errorText?: string;
  placeholder?: string;
  hint?: string;
  type: "text" | "number";
  setHasError?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  max,
  suffix,
  errorText,
  placeholder,
  hint,
  type,
  setHasError,
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (type === "number" ? Number(value) > max : value.length > max) {
      setError(true);
    } else {
      setError(false);
    }
  }, [max, value, type]);

  useEffect(() => {
    setHasError?.(error);
  }, [error, setHasError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (type === "number") {
      const numeric = raw.replace(/\D/g, "");
      onChange(numeric === "" ? "" : Math.max(0, Number(numeric)));
    } else {
      onChange(raw);
    }
  };

  const handleIncrement = () => onChange(Math.max(0, Number(value) + 1));

  const handleDecrement = () => onChange(Math.max(0, Number(value) - 1));

  return (
    <label className="input-field">
      <div
        className={classNames("input-field__wrapper", {
          "input-field__wrapper--error": !!error,
        })}
      >
        <input
          type="text"
          value={type === "number" ? (value === "0" ? "" : value) : value}
          placeholder={placeholder}
          onChange={handleChange}
          className="input-field__input"
          style={{
            width:
              type === "number" && value !== "0"
                ? `${value?.toString().length + 1}ch`
                : undefined,
          }}
        />
        {value !== "0" && (
          <span
            className={classNames("input-field__placeholder", {
              "input-field__placeholder--error": !!error,
            })}
          >
            {placeholder}
          </span>
        )}

        {type === "number" && value !== "0" && (
          <span className="input-field__counter">/ {max}</span>
        )}

        {suffix && value !== "0" && (
          <span className="input-field__suffix">{suffix}</span>
        )}

        {error && errorIcon && (
          <img src={errorIcon} alt="error" className="input-field__icon" />
        )}

        {type === "number" && !error && (
          <div className="input-field_arrows">
            <div className="input-field_arrow" onClick={handleIncrement}>
              <img src={arrowIcon} alt="" />
            </div>
            <div className="input-field_arrow" onClick={handleDecrement}>
              <img src={arrowIcon} alt="" />
            </div>
          </div>
        )}
      </div>

      {hint && !error && <p className="input-field__hint-text">{hint}</p>}
      {error && <p className="input-field__error-text">{errorText}</p>}
    </label>
  );
};

export default InputField;
