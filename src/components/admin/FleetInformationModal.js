import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'antd';
import FleetSelection from './common/FleetSelection';

const FleetInformationModal = ({ visible, onFleetUpdate, onCancel, fleetData, initialFleet, isEditable }) => {
    const [form] = Form.useForm();

    const [selectedFleetId, setSelectedFleetId] = useState('');
    const [selectedFleet, setSelectedFleet] = useState({});
    const [sortedFleetData, setSortedFleetData] = useState([]);

    useEffect(() => {
        const selectedFlightFleet = fleetData.find(fleet => fleet.id === initialFleet.id);
        setSelectedFleetId(initialFleet.id);

        if (initialFleet.flightHasBookings) {
            setSelectedFleet({
                ...selectedFlightFleet,
                remainingEconomySeats: initialFleet.remainingEconomySeats,
                remainingPremiumSeats: initialFleet.remainingPremiumSeats,
                remainingBusinessSeats: initialFleet.remainingBusinessSeats,
            });
        } else {
            setSelectedFleet(selectedFlightFleet);
        }

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
            title: initialFleet.flightHasBookings ? 'Remaining Economy Seats' : 'Total Economy Seats',
            dataIndex: initialFleet.flightHasBookings ? 'remainingEconomySeats' : 'totalEconomySeats',
        },
        {
            title: initialFleet.flightHasBookings ? 'Remaining Premium Seats' : 'Total Premium Seats',
            dataIndex: initialFleet.flightHasBookings ? 'remainingPremiumSeats' : 'totalPremiumSeats',
        },
        {
            title: initialFleet.flightHasBookings ? 'Remaining Business Seats' : 'Total Business Seats',
            dataIndex: initialFleet.flightHasBookings ? 'remainingBusinessSeats' : 'totalBusinessSeats',
        },
    ];

    return (
        <Modal
            open={visible}
            title="Select a Fleet"
            onCancel={onCancel}
            footer={[
                // Conditionally render buttons based on isEditable
                isEditable && <Button key="back" onClick={onCancel}>Cancel</Button>,
                isEditable && <Button key="submit" type="primary" onClick={onSave}>Save</Button>,
            ]}
            style={{ top: '5%' }}
        >
            <FleetSelection
                isEditable={isEditable}
                rowSelection={rowSelection}
                columns={columns}
                fleetData={isEditable ? sortedFleetData : [selectedFleet]} // Conditionally limit to selectedFleet if not editable
                selectedFleet={selectedFleet}
                form={form} />
        </Modal>
    );
}

export default FleetInformationModal;
