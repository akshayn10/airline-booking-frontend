import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import { getCountryList } from "../../../../../redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";


const PhoneNumber = ({ selectedCountry }) => {

  const dispatch = useDispatch();
  const countryList = useSelector(
    (state) => state.countryListReducer.countryList
  );

  useEffect(() => {
    dispatch(getCountryList());
  }, [dispatch, countryList]);


  const getCombinedIddNumbers = (countries, selectedCountry) => {
    if (selectedCountry !== null) {
      return countries
        .filter((country) => {
          const {
            name: { common },
          } = country;
          return common === selectedCountry;
        })
        .map((country) => {
          const {
            idd: { root, suffixes },
          } = country;
          const combinedIdd = [root, ...suffixes].join("");
          return combinedIdd;
        });
    }
  };
  const combinedIddNumbers = getCombinedIddNumbers(
    countryList,
    selectedCountry
  );

  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="phoneNumberPrefix" noStyle>
      <Select style={{ width: 90 }}>
        {combinedIddNumbers &&
          combinedIddNumbers.map((iddNumber) => (
            <Option key={iddNumber} value={iddNumber}>
              {iddNumber}
            </Option>
          ))}{" "}
      </Select>
    </Form.Item>
  );
  return (
    <Form.Item
      name="phoneNumber"
    >
      <Input
        type="number"
        placeholder="Phone Number"
        addonBefore={prefixSelector}
        style={{ width: "100%" }}
      />
    </Form.Item>
  );
};
export default PhoneNumber;
