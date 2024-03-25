import { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';

const FleetInformationModal = ({ visible, onFleetUpdate, onCancel, fleetData, initialFleet, editingFlightId }) => {
    const [selectedRowIds, setSelectedRowIds] = useState([initialFleet.id]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Place initialFleet on top
        const sortedData = [
            initialFleet,
            ...fleetData.filter(fleet => fleet.id !== initialFleet.id)
        ];
        setData(sortedData);
    }, [fleetData, initialFleet, visible]);

    const onSelectChange = selectedIds => {
        setSelectedRowIds(selectedIds);
    }

    const onSave = () => {
        const newSelectedFleet = data.find(fleet => fleet.id === selectedRowIds[0]);
        onFleetUpdate(newSelectedFleet, editingFlightId);
        onCancel();
    }

    const rowSelection = {
        selectedRowKeys: selectedRowIds,
        onChange: onSelectChange,
        type: 'radio',
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
        >
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={false}
            />
        </Modal>
    );
}

export default FleetInformationModal;
