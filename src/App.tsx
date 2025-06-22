import "./App.css";
import CountriesTable from "./components/CountriesTable/CountriesTable";
import CountryForm from "./components/CountryForm/CountryForm";
import VoteSuccessMessage from "./components/VoteSuccessMessage/VoteSuccessMessage";
import { useCountries } from "./context/CountriesContext";

function App() {
  const { isFormSubmitted } = useCountries();
  return (
    <div className="app-container">
      {isFormSubmitted ? <VoteSuccessMessage /> : <CountryForm />}
      <h1>Top 30 Most Voted Countries</h1>
      <CountriesTable />
    </div>
  );
}

export default App;
