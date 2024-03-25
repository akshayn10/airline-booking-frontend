import React, { useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Typography } from 'antd';
import FleetInfomationModal from './FleetInformationModal';
import AddFlightModal from './AddFlightModal';
import { formatDate } from '../../util/DateConversion';

const originFleetData = [
    {
        id: '1',
        code: '1200',
        model: 'Boeing',
        totalEconomySeats: '50',
        totalPremiumSeats: '30',
        totalBusinessSeats: '30'
    },
    {
        id: '2',
        code: '1201',
        model: 'AirBus',
        totalEconomySeats: '100',
        totalPremiumSeats: '60',
        totalBusinessSeats: '60'
    }
];

const originData = [
    {
        key: '0',
        departureLocation: 'Dubai International Airport',
        arrivalLocation: 'Katunayake International Airport',
        fleet: {
            id: '1',
            code: '1200',
            model: 'Boeing',
            totalEconomySeats: '50',
            totalPremiumSeats: '30',
            totalBusinessSeats: '30'
        },
        status: {
            remainingEconomySeats: '10',
            remainingPremiumSeats: '24',
            remainingBusinessSeats: '24'
        },
        departureTime: 'Sun, 24 Mar 2024 18:36:00 GMT',
        arrivalTime: 'Sun, 25 Mar 2024 18:36:00 GMT'
    },
    {
        key: '1',
        departureLocation: 'Katunayake International Airport',
        arrivalLocation: 'Dubai International Airport',
        fleet: {
            id: '2',
            code: '1201',
            model: 'AirBus',
            totalEconomySeats: '50',
            totalPremiumSeats: '30',
            totalBusinessSeats: '30'
        },
        status: {
            remainingEconomySeats: '8',
            remainingPremiumSeats: '20',
            remainingBusinessSeats: '0'
        },
        departureTime: 'Sun, 27 Mar 2024 18:36:00 GMT',
        arrivalTime: 'Sun, 28 Mar 2024 18:36:00 GMT'
    },
];

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
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
}

const FlightManagement = () => {
    const [form] = Form.useForm();

    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [currentFleet, setCurrentFleet] = useState({});

    const [addFlightModalVisible, setAddFlightModalVisible] = useState(false);
    const [fleetModalVisible, setFleetModalVisible] = useState(false);


    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            departureLocation: '',
            arrivalLocation: '',
            fleet: {},
            status: {
                remainingEconomySeats: '',
                remainingPremiumSeats: '',
                remainingBusinessSeats: ''
            },
            departureTime: '',
            arrivalTime: '',
            ...record,
        });
        setEditingKey(record.key);
    }

    const cancel = () => {
        setEditingKey('');
    }

    const addNewFlight = (newFlight) => {
        const newKey = data.length.toString();
        const selectedFleet = originFleetData.find(fleet => fleet.id === newFlight.fleetId);

        const newFlightData = {
            key: newKey,
            departureLocation: newFlight.departureLocation,
            arrivalLocation: newFlight.arrivalLocation,
            departureTime: formatDate(newFlight.departureTime),
            arrivalTime: formatDate(newFlight.arrivalTime),
            fleet: {
                id: selectedFleet.id,
                code: selectedFleet.code,
                model: selectedFleet.model,
                totalEconomySeats: selectedFleet.totalEconomySeats,
                totalPremiumSeats: selectedFleet.totalPremiumSeats,
                totalBusinessSeats: selectedFleet.totalBusinessSeats,
            },
            status: {
                remainingEconomySeats: selectedFleet.totalEconomySeats,
                remainingPremiumSeats: selectedFleet.totalPremiumSeats,
                remainingBusinessSeats: selectedFleet.totalBusinessSeats
            }
        };
        setData([...data, newFlightData]);
        setAddFlightModalVisible(false);
    };

    const handleFleetUpdate = (updatedFleet) => {
        const newData = [...data];
        const flightIndex = newData.findIndex(flight => flight.key === editingKey);

        if (flightIndex >= 0) {
            newData[flightIndex] = {
                ...newData[flightIndex],
                fleet: updatedFleet
            };

            setData(newData);
        }
    };


    const showFleetModal = (fleet) => {
        console.dir(fleet)
        setCurrentFleet(fleet);
        setFleetModalVisible(true);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const deleteRow = async (key) => {
        setData(data.filter((item) => item.key !== key));
    };

    const columns = [
        {
            title: 'Departure Location',
            dataIndex: 'departureLocation',
            width: '30%',
            editable: true,
        },
        {
            title: 'Arrival Location',
            dataIndex: 'arrivalLocation',
            width: '30%',
            editable: true,
        },
        {
            title: 'Departure Time',
            dataIndex: 'departureTime',
            width: '12%',
            editable: true,
        },
        {
            title: 'Arrival Time',
            dataIndex: 'arrivalTime',
            width: '12%',
            editable: true,
        },
        {
            title: 'Fleet Information',
            dataIndex: 'fleet',
            width: '5%',
            render: (_, record) => (
                <a href={() => false} onClick={() => showFleetModal(record.fleet)}>View</a>
            ),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a href={() => false}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
                            <a href={() => false} disabled={editingKey !== ''}>Delete</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <>
            <Button
                type="primary"
                onClick={() => setAddFlightModalVisible(true)}
                style={{ marginBottom: 16 }}
            >
                Add Flight
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: 10,
                        total: data.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        onChange: cancel
                    }}
                />
            </Form>
            <AddFlightModal
                visible={addFlightModalVisible}
                onCreate={addNewFlight}
                onCancel={() => setAddFlightModalVisible(false)}
                fleetData={originFleetData}
            />
            <FleetInfomationModal
                visible={fleetModalVisible}
                onFleetUpdate={handleFleetUpdate}
                onCancel={() => {
                    setFleetModalVisible(false);
                }}
                fleetData={originFleetData}
                initialFleet={currentFleet}
            />

        </>
    );
};

export default FlightManagement;
