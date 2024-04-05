import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import FleetSelection from './common/FleetSelection';

const FleetInformationModal = ({ visible, onFleetUpdate, onCancel, fleetData, initialFleet }) => {
    const [form] = Form.useForm();

    const [selectedFleetId, setSelectedFleetId] = useState('');
    const [selectedFleet, setSelectedFleet] = useState({});
    const [sortedFleetData, setSortedFleetData] = useState([]);

    useEffect(() => {
        const selectedFlightFleet = fleetData.find(fleet => fleet.id === initialFleet.id);
        setSelectedFleetId(initialFleet.id);
        setSelectedFleet(selectedFlightFleet);

        // Place initialFleet on top
        const sortedData = [
            selectedFlightFleet,
            ...fleetData.filter(fleet => fleet.id !== initialFleet.id)
        ];
        setSortedFleetData(sortedData);

        form.setFieldsValue({
            economyFare: initialFleet.economyFare,
            premiumFare: initialFleet.premiumFare,
            businessFare: initialFleet.businessFare,
        });
    }, [visible]);

    const onSave = () => {
        form.validateFields().then(values => {
            onFleetUpdate({
                fleetId: selectedFleetId,
                economyFare: values.economyFare,
                premiumFare: values.premiumFare,
                businessFare: values.businessFare,
            });
            form.resetFields();
            onCancel();
        }).catch(info => console.log('Validation Failed:', info));
    }

    const rowSelection = {
        type: 'radio',
        selectedRowKeys: [selectedFleetId],
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedFleetId(selectedRowKeys[0]);
            setSelectedFleet(selectedRows[0]);
        },
    }

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
        },
        {
            title: 'Model',
            dataIndex: 'model',
        },
        {
            title: 'Total Economy Seats',
            dataIndex: 'totalEconomySeats',
        },
        {
            title: 'Total Premium Seats',
            dataIndex: 'totalPremiumSeats',
        },
        {
            title: 'Total Business Seats',
            dataIndex: 'totalBusinessSeats',
        },
    ];

    return (
        <Modal
            open={visible}
            title="Select a Fleet"
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={onSave}>Save</Button>,
            ]}
            style={{ top: '5%', }}
        >
            <FleetSelection
                rowSelection={rowSelection}
                columns={columns}
                fleetData={sortedFleetData}
                selectedFleet={selectedFleet}
                form={form} />
        </Modal>
    );
}

export default FleetInformationModal;
