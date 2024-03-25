import { useState } from 'react';
import { Modal, Form, DatePicker, Table, Alert, Select } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const AddFlightModal = ({ visible, onCreate, onCancel, fleetData, flightLocationData }) => {
    const [form] = Form.useForm();
    const [selectedFleetId, setSelectedFleetId] = useState(null);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [selectedDepartureLocation, setSelectedDepartureLocation] = useState(null);
    const [selectedArrivalLocation, setSelectedArrivalLocation] = useState(null);

    const disabledDate = (current) => {
        return current && current < Date.now();
    }

    const onOk = () => {
        if (!selectedFleetId) {
            setSubmitAttempted(true);
            return;
        }

        form.validateFields()
            .then((fieldsValue) => {
                const rangeValue = fieldsValue['dateRange'];
                const values = {
                    ...fieldsValue,
                    departureTime: rangeValue[0],
                    arrivalTime: rangeValue[1],
                    fleetId: selectedFleetId
                };
                onCreate(values);
                form.resetFields();
                setSelectedFleetId(null);
                setSubmitAttempted(false);
                setSelectedDepartureLocation(null);
                setSelectedArrivalLocation(null);
            })
            .catch((info) => console.log('Validate Failed:', info));
    }

    const onDepartureLocationChange = value => {
        setSelectedDepartureLocation(value);
        form.setFieldsValue({ arrivalLocation: undefined }); // Reset arrival location to ensure it cannot be the same
    }

    const onArrivalLocationChange = value => {
        setSelectedArrivalLocation(value);
    }

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Total Economy Seats',
            dataIndex: 'totalEconomySeats',
            key: 'totalEconomySeats',
        },
        {
            title: 'Total Premium Seats',
            dataIndex: 'totalPremiumSeats',
            key: 'totalPremiumSeats',
        },
        {
            title: 'Total Business Seats',
            dataIndex: 'totalBusinessSeats',
            key: 'totalBusinessSeats',
        },
    ];

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys) => {
            setSelectedFleetId(selectedRowKeys[0]);
            setSubmitAttempted(false);
        },
    }

    return (
        <Modal
            open={visible}
            title="Add New Flight"
            okText="Add"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={onOk}
        >
            {submitAttempted && !selectedFleetId && (
                <Alert message="Please select a fleet before adding a flight." type="warning" showIcon style={{ marginBottom: 16 }} />
            )}
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item name="departureLocation" label="Departure Location" rules={[{ required: true, message: 'Please select the departure location!' }]}>
                    <Select
                        showSearch
                        placeholder="Select departure location"
                        onChange={onDepartureLocationChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {flightLocationData.map(location => {
                            if (location.id !== selectedArrivalLocation) {
                                return <Option key={location.id} value={location.id}>{`${location.airportName} at ${location.cityName}, ${location.country}`}</Option>;
                            }
                            return null;
                        })}
                    </Select>
                </Form.Item>
                <Form.Item name="arrivalLocation" label="Arrival Location" rules={[{ required: true, message: 'Please select the arrival location!' }]}>
                    <Select
                        showSearch
                        placeholder="Select arrival location"
                        onChange={onArrivalLocationChange}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {flightLocationData.map(location => {
                            if (location.id !== selectedDepartureLocation) {
                                return <Option key={location.id} value={location.id}>{`${location.airportName} at ${location.cityName}, ${location.country}`}</Option>;
                            }
                            return null;
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="dateRange"
                    label="Departure and Arrival Time"
                    rules={[{ required: true, message: 'Please select the departure and arrival time!' }]}
                >
                    <RangePicker showTime disabledDate={disabledDate} format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
            </Form>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={fleetData}
                rowKey="id"
                pagination={false}
            />
        </Modal>
    );
}

export default AddFlightModal;
