import classNames from "classnames";
import "./InputField.scss";
import images from "../../assets/img";
import { useEffect } from "react";

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
  const error = type === "number" ? Number(value) > max : value.length > max;
  const hasValue =
    type === "number" ? value !== "" && value !== "0" : value.length > 0;

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

  const changeValue = (delta: number) =>
    onChange(Math.max(0, Math.min(Number(value) + delta, max)));

  return (
    <div className="input-field">
      <label
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
              type === "number" && hasValue
                ? `${value?.toString().length + 1}ch`
                : undefined,
          }}
        />
        {hasValue && (
          <span
            className={classNames("input-field__placeholder", {
              "input-field__placeholder--error": !!error,
            })}
          >
            {placeholder}
          </span>
        )}

        {type === "number" && hasValue && (
          <span className="input-field__counter">/ {max}</span>
        )}

        {suffix && hasValue && (
          <span className="input-field__suffix">{suffix}</span>
        )}

        {error && (
          <img src={images.error} alt="error" className="input-field__icon" />
        )}

        {type === "number" && !error && (
          <div className="input-field__arrows">
            <div
              className={classNames("input-field__arrow", {
                "input-field__arrow--disable": Number(value) === max,
              })}
              onClick={() => changeValue(+1)}
            >
              <img src={images.inputArrow} alt="" />
            </div>
            <div className="input-field__arrow" onClick={() => changeValue(-1)}>
              <img src={images.inputArrow} alt="" />
            </div>
          </div>
        )}
      </label>

      {hint && !error && <p className="input-field__hint-text">{hint}</p>}
      {error && <p className="input-field__error-text">{errorText}</p>}
    </div>
  );
};

export default InputField;
