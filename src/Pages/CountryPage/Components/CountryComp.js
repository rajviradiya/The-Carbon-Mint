import React from "react";
import { MenuItem, Typography } from "@mui/material";
import {
  defaultCountries,
  FlagImage,
  parseCountry,
} from "react-international-phone";
import { useFierbase } from "../../../context/fierbasecontext";
import { useNavigate } from "react-router";

const CountryComp = () => {
  const firebase = useFierbase();
  const navigate = useNavigate();

  const filteredData = defaultCountries.filter((country) => {
    return country[0].toLocaleLowerCase().trim().includes(firebase?.searchcont)
  });

  const selectountry = (dialcode) => {
    firebase.setDialcode(`+${dialcode}`);
    navigate("/");
  };

  return (
    <div className="container countrylist">
      <div className="allcountry">
        {filteredData.map((c, index) => {
          const country = parseCountry(c);
          return (
            <div key={index}>
              <MenuItem
                key={country.iso2}
                value={country.iso2}
                onClick={() => {
                  selectountry(country.dialCode);
                }}
                sx={{ height: "10vw" }}
              >
                <FlagImage iso2={country.iso2} style={{ marginRight: "30px" }} />
                <Typography marginRight="8px">{country.name}</Typography>
                <Typography color="gray">+{country.dialCode}</Typography>
              </MenuItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountryComp;
