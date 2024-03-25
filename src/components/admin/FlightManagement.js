import { useState } from 'react';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import FleetInfomationModal from './FleetInformationModal';
import AddFlightModal from './AddFlightModal';
import EditableCell from '../common/EditableCell';
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

const originFlightData = [
    {
        id: '0',
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
        id: '1',
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

const FlightManagement = () => {
    const [form] = Form.useForm();

    const [flightData, setFlightData] = useState(originFlightData);
    const [fleetData, setFleetData] = useState(originFleetData);

    const [flightEditingKey, setFlightEditingKey] = useState('');
    const [fleetEditingKey, setFleetEditingKey] = useState('');
    const [viewingFleet, setViewingFleet] = useState({});

    const [addFlightModalVisible, setAddFlightModalVisible] = useState(false);
    const [fleetInformationModalVisible, setFleetInformationModalVisible] = useState(false);


    const isEditing = (record) => record.key === flightEditingKey;

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
        setFlightEditingKey(record.id);
    }

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const existingFlightData = [...flightData];
            const index = existingFlightData.findIndex((item) => key === item.id);
            const item = existingFlightData[index];
            existingFlightData.splice(index, 1, {
                ...item,
                ...row,
            });
            setFlightData(existingFlightData);
            setFleetEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const deleteRow = async (key) => {
        setFlightData(flightData.filter((item) => item.id !== key));
    }

    const cancel = () => {
        setFlightEditingKey('');
    }

    const addNewFlight = (newFlight) => {
        const newKey = flightData.length.toString();
        const selectedFleet = fleetData.find(fleet => fleet.id === newFlight.fleetId);

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
        }

        setFlightData([...flightData, newFlightData]);
        setAddFlightModalVisible(false);
    }

    const handleFleetUpdate = (updatedFleet, flightKey) => {
        const existingFlightData = [...flightData];
        const flightIndex = existingFlightData.findIndex(flight => flight.id === flightKey);

        existingFlightData[flightIndex] = {
            ...existingFlightData[flightIndex],
            fleet: updatedFleet
        }

        setFlightData(existingFlightData);
    }

    const showFleetModal = (record) => {
        setViewingFleet(record.fleet);
        setFleetEditingKey(record.key);
        setFleetInformationModalVisible(true);
    }

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
                <a href={() => false} disabled={flightEditingKey !== ''} onClick={() => showFleetModal(record)}>View</a>
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
                        <Typography.Link disabled={flightEditingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.key)}>
                            <a href={() => false} disabled={flightEditingKey !== ''}>Delete</a>
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
                    dataSource={flightData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: 10,
                        total: flightData.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        onChange: cancel
                    }}
                />
            </Form>
            <AddFlightModal
                visible={addFlightModalVisible}
                onCreate={addNewFlight}
                onCancel={() => setAddFlightModalVisible(false)}
                fleetData={fleetData}
            />
            <FleetInfomationModal
                key={viewingFleet.id}
                visible={fleetInformationModalVisible}
                onFleetUpdate={handleFleetUpdate}
                onCancel={() => {
                    setFleetInformationModalVisible(false);
                }}
                fleetData={fleetData}
                initialFleet={viewingFleet}
                editingFlightKey={fleetEditingKey}
            />
        </>
    );
};

export default FlightManagement;
