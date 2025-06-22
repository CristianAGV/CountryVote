import CountryFormInputs from '../CountryFormInputs/CountryFormInputs'
import './CountryForm.css'

export default function CountryForm() {
  return (
    <div className="countryForm-container">
      <h2 className="countryForm-title">Vote your Favourite Country</h2>
      <CountryFormInputs />
    </div>
  );
}
