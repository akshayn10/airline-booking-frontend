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
            break;
        case 'select':
            inputNode = (
                <Select>
                    {selectOptions.map(opt => (
                        <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                    ))}
                </Select>
            );

            // Custom validation for departureLocation and arrivalLocation
            if (['departureLocation', 'arrivalLocation'].includes(dataIndex)) {
                rules.push({
                    validator: async (_, value) => {
                        const oppositeField = dataIndex === 'departureLocation' ? 'arrivalLocation' : 'departureLocation';
                        const oppositeValue = form.getFieldValue(oppositeField);
                        if (value === oppositeValue) {
                            throw new Error('Departure and arrival locations must be different');
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
                    dependencies={['departureLocation', 'arrivalLocation'].filter(field => field !== dataIndex)}
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
