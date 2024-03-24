import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'antd';

const FleetInformationModal = ({ visible, onFleetUpdate, onCancel, fleetData, initialFleet }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([initialFleet.id]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Place initialFleet on top
        const sortedData = [
            initialFleet,
            ...fleetData.filter(fleet => fleet.id !== initialFleet.id)
        ];
        setData(sortedData);
    }, [fleetData, initialFleet]);

    const onSelectChange = selectedKeys => {
        setSelectedRowKeys(selectedKeys);
    };

    const onSave = () => {
        const newSelectedFleet = data.find(fleet => fleet.id === selectedRowKeys[0]);
        onFleetUpdate(newSelectedFleet);
        onCancel(); // Optionally close the modal
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        type: 'radio',
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
};

export default FleetInformationModal;
