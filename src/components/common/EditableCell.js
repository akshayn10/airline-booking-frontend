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

    if (inputType === 'rangePicker') {
        inputNode = <RangePicker showTime />;
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
