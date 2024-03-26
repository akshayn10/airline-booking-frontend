import { Form, Input, DatePicker } from "antd";
const { RangePicker } = DatePicker;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    let inputNode = <Input />; // Default input

    if (inputType === 'rangePicker') {
        inputNode = <RangePicker showTime defaultValue={[record.departureTime, record.arrivalTime]} />;
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
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
