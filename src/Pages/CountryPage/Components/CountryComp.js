import React, { useEffect, useState } from "react";
import { MenuItem, Typography } from "@mui/material";

import {
  defaultCountries,
  FlagImage,
  parseCountry,
} from "react-international-phone";
import { useFierbase } from "../../../context/fierbasecontext";
import { useNavigate } from "react-router";

const CountryComp = () => {
  const [Countrysdata, setCountrysdata] = useState(defaultCountries);

  const fierbase = useFierbase();
  const navigate = useNavigate();

  const selectountry = (dialcode) => {
    fierbase.setDialcode(`+${dialcode}`);
    console.log(`+${dialcode}`);
    navigate("/");
  };

  useEffect(() => {
    const data = Countrysdata.filter((res) => {
      return res[0].toLowerCase().includes(fierbase.searchcont);
    });
    setCountrysdata(data);
  }, [fierbase.searchcont]);

  return (
    <div className="container countrylist">
      <div className="allcountry">
        {Countrysdata.map((c) => {
          const country = parseCountry(c);
          return (
            <>
              <MenuItem
                key={country.iso2}
                value={country.iso2}
                onClick={() => {
                  selectountry(country.dialCode);
                }}
                sx={{height:"10vw"}}
              >
                <FlagImage iso2={country.iso2} style={{marginRight: "30px"}} />
                <Typography marginRight="8px">{country.name}</Typography>
                <Typography color="gray">+{country.dialCode}</Typography>
              </MenuItem>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CountryComp;
