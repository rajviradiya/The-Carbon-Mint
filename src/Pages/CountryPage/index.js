import React from "react";
import CountryComp from "./Components/CountryComp";
import SearchBar from "./Components/SearchBar";
import CloseNav from "./Components/CloseNav";
import "./Countrypage.css";

const index = () => {
  return (
    <section className="countrypage">
      <section className="CloseNavmain">
        <CloseNav />
      </section>
      <section className="searchbarmain">
        <SearchBar />
      </section>
      <section className="Countrylistmain">
        <CountryComp />
      </section>
    </section>
  );
};

export default index;
