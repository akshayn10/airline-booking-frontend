import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Table } from 'antd';

const AddFlightModal = ({ visible, onCreate, onCancel, fleetData }) => {
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
        form.setFieldsValue({ fleetId: selectedKeys.length ? selectedKeys[0] : null });
    };

    const onAddFlight = () => {
        form
            .validateFields()
            .then((values) => {
                const flightDetails = { ...values, fleetId: values.fleetId };
                form.resetFields();
                onCreate(flightDetails);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        type: 'radio', // Use radio for single selection
    };

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

    return (
        <Modal
            open={visible}
            title="Add New Flight"
            onCancel={onCancel}
            onOk={onAddFlight}
            okText="Add"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="departureLocation"
                    label="Departure Location"
                    rules={[{ required: true, message: 'Please input the departure location!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="arrivalLocation"
                    label="Arrival Location"
                    rules={[{ required: true, message: 'Please input the arrival location!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="departureTime"
                    label="Departure Time"
                    rules={[{ required: true, message: 'Please select the departure time!' }]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item
                    name="arrivalTime"
                    label="Arrival Time"
                    rules={[{ required: true, message: 'Please select the arrival time!' }]}
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>

                <Form.Item
                    shouldUpdate={(prevValues, currentValues) => prevValues.fleetId !== currentValues.fleetId}
                    noStyle
                >
                    {() => (
                        <Form.Item
                            name="fleetId"
                            rules={[{ required: true, message: 'Please select a fleet!' }]}
                            style={{ display: 'none' }}
                        >
                            <Input />
                        </Form.Item>
                    )}
                </Form.Item>

                <Form.Item label="Fleet Selection">
                    <Table
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: selectedRowKeys,
                            onChange: onSelectChange,
                        }}
                        columns={columns}
                        dataSource={fleetData}
                        pagination={false}
                        rowKey="id"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFlightModal;
