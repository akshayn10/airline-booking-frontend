import React from "react";
import { Form, Select } from "antd";
import countryList from "../../../../../assets/json/countries.json";
const countryDropdown = ({setSelectedCountry}) => {
  const transformCountries = (countries) => {
    return countries.map((country) => {
      const {
        name: { common },
      } = country;
      const value = common;
      const label = common; 

      return { value, label };
    });
  };
  const filteredCountryList = transformCountries(countryList);
  const onChange = (value) => {
    setSelectedCountry(value);
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Form.Item name="country">
      <Select
        showSearch
        placeholder="Select Country"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={filteredCountryList}
      />
    </Form.Item>
  );
};
export default countryDropdown;
