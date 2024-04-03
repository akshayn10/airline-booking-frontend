import { Form, Input, DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    selectOptions = [],
    dependencies,
    form,
    ...restProps
}) => {
    const disabledDate = (current) => {
        return current && current < Date.now();
    }

    let inputNode;

    let rules = [
        {
            required: true,
            message: `Please select ${title}!`,
        },
    ]; // Default validation rules

    switch (inputType) {
        case 'rangePicker':
            inputNode = <RangePicker showTime disabledDate={disabledDate} />;

            if (dataIndex === "departureAndArrival") {
                rules.push({
                    validator: async (_, value) => {
                        console.log(value)
                        if (value && value[0] && value[1] && value[0].isSame(value[1], 'minute')) {
                            throw new Error('Departure and arrival datetime must be different!');
                        }
                    },
                });
            }
            break;
        case 'select':
            inputNode = (
                <Select>
                    {selectOptions.map(opt => (
                        <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                    ))}
                </Select>
            );

            if (['departureLocation', 'arrivalLocation'].includes(dataIndex)) {
                rules.push({
                    validator: async (_, value) => {
                        const oppositeField = dataIndex === 'departureLocation' ? 'arrivalLocation' : 'departureLocation';
                        const oppositeValue = form.getFieldValue(oppositeField);
                        if (value === oppositeValue) {
                            throw new Error('Departure and arrival locations must be different!');
                        }
                    },
                });
            }
            break;
        default:
            inputNode = <Input />;
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={rules}
                    dependencies={dependencies}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
}

export default EditableCell;
