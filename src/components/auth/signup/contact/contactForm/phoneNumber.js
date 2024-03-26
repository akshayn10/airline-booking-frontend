import { Form, Input, Select } from "antd";
import countryList from "../../../../../assets/json/countries.json";
const PhoneNumber = ({ selectedCountry }) => {
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
          console.log(combinedIdd, "combinedIdd");
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
    <Form.Item name="prefix" noStyle>
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
      name="phone"
      rules={[{ required: true, message: "Please input your phone number!" }]}
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