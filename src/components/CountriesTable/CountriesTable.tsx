import "./CountriesTable.css";
import { useState, useMemo } from "react";
import useDebouncedValue from "../../hooks/useDebounceValue";
import searchIcon from "../../assets/Search.svg";
import { useCountries } from "../../context/CountriesContext";
import Skeleton from "@mui/material/Skeleton";

const ITEMS_PER_PAGE = 10;

export default function CountriesTable() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebouncedValue(search, 500);

  const { countries, isWeatherLoading } = useCountries();

  const filteredCountries = useMemo(() => {
    const lowerSearch = debouncedSearch.trim().toLowerCase();

    const filtered = countries.filter((country) =>
      [
        country.name,
        country.capital_city,
        country.region,
        country.sub_region,
      ].some((field) => field.toLowerCase().includes(lowerSearch))
    );

    return filtered.sort((a, b) => b.votes - a.votes);
  }, [countries, debouncedSearch]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const paginatedCountries = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCountries.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCountries, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="countriesTable-container">
      <div className="countriesTable-searchInputContainer">
        <img src={searchIcon} alt="search" />
        <input
          id="search"
          type="text"
          placeholder="Search Country, Capital City, Region or Subregion"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="countriesTable-table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Capital City</th>
            <th>Region</th>
            <th>Sub Region</th>
            <th>Weather</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCountries.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No results found.
              </td>
            </tr>
          ) : (
            paginatedCountries.map((country, index) => (
              <tr key={`${country.name}-${index}`}>
                <td>{country.name}</td>
                <td>{country.capital_city}</td>
                <td>{country.region}</td>
                <td>{country.sub_region}</td>
                <td>
                  {isWeatherLoading ? (
                    <Skeleton variant="text" width={120} />
                  ) : (
                    country.weather || "N/A"
                  )}
                </td>
                <td>{country.votes}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="countriesTable-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            type="button"
            className={i + 1 === currentPage ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
