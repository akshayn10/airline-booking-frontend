import { Modal, Form, Input } from 'antd';

const NewFlightLocationModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            open={visible}
            title="Add New Flight Location"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the country!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="cityName"
                    label="City Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the city name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="airportName"
                    label="Airport Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the airport name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the code!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default NewFlightLocationModal;
