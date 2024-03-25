import { useState } from 'react';
import { Modal, Form, Input, DatePicker, Table, Alert } from 'antd';

const AddFlightModal = ({ visible, onCreate, onCancel, fleetData }) => {
    const [form] = Form.useForm();
    const [selectedFleetId, setSelectedFleetId] = useState(null);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const onOk = () => {
        if (!selectedFleetId) {
            setSubmitAttempted(true);
            return;
        }

        form.validateFields()
            .then((values) => {
                onCreate({ ...values, fleetId: selectedFleetId });
                form.resetFields();
                setSelectedFleetId(null);
                setSubmitAttempted(false);
            })
            .catch((info) => console.log('Validate Failed:', info));
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

    const rowSelection = {
        type: 'radio',
        onChange: (selectedRowKeys) => {
            setSelectedFleetId(selectedRowKeys[0]);
            setSubmitAttempted(false);
        },
    };

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
                <Form.Item name="departureLocation" label="Departure Location" rules={[{ required: true, message: 'Please input the departure location!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="arrivalLocation" label="Arrival Location" rules={[{ required: true, message: 'Please input the arrival location!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="departureTime" label="Departure Time" rules={[{ required: true, message: 'Please select the departure time!' }]}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item name="arrivalTime" label="Arrival Time" rules={[{ required: true, message: 'Please select the arrival time!' }]}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
};

export default AddFlightModal;
