import { useState } from "react";
import { useCountries } from "../../context/CountriesContext";
import "./CountryFormInputs.css";
import warningIcon from "../../assets/ExclamationOutline.svg";

interface FieldProps {
  id: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  error?: string;
}

const InputField = ({
  id,
  type = "text",
  value,
  placeholder,
  onChange,
  error,
}: FieldProps) => (
  <div>
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      className={error ? "error" : ""}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && (
      <>
        <p className="error">{error}</p>
        <img src={warningIcon} alt="warning" />
      </>
    )}
  </div>
);

export default function CountryFormInputs() {
  const { countries, increaseCountryVote } = useCountries();

  const [form, setForm] = useState({ name: "", email: "", country: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name.trim()) newErrors.name = "Invalid name";
    if (!form.email.trim() || !isValidEmail(form.email))
      newErrors.email = "Invalid email";
    if (!form.country) newErrors.country = "Select country";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    increaseCountryVote(form.country);
  };

  return (
    <div className="countryFormInputs">
      <InputField
        id="name"
        value={form.name}
        placeholder="Name"
        onChange={(val) => setForm((prev) => ({ ...prev, name: val }))}
        error={errors.name}
      />

      <InputField
        id="email"
        type="email"
        value={form.email}
        placeholder="Email"
        onChange={(val) => setForm((prev) => ({ ...prev, email: val }))}
        error={errors.email}
      />

      <div className="form-field">
        <select
          id="country"
          value={form.country}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, country: e.target.value }))
          }
          className={`${!form.country ? "placeholder-selected" : ""} ${
            errors.country ? "error" : ""
          }`}
        >
          <option value="" disabled>
            Country
          </option>
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <>
            <p className="error">{errors.country}</p>
            <img src={warningIcon} alt="warning" />
          </>
        )}
      </div>

      <button type="button" onClick={handleSubmit}>
        Submit Vote
      </button>
    </div>
  );
}
