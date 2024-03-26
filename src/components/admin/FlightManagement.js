import { useState } from 'react';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FleetInfomationModal from './FleetInformationModal';
import AddFlightModal from './AddFlightModal';
import EditableCell from '../common/EditableCell';
import { formatDate } from '../../util/DateConversion';

const originFleetData = [
    {
        id: '1',
        code: '1200',
        model: 'Boeing',
        totalEconomySeats: 50,
        totalPremiumSeats: 30,
        totalBusinessSeats: 30
    },
    {
        id: '2',
        code: '1201',
        model: 'AirBus',
        totalEconomySeats: 100,
        totalPremiumSeats: 60,
        totalBusinessSeats: 60
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
            totalEconomySeats: 50,
            totalPremiumSeats: 30,
            totalBusinessSeats: 30
        },
        status: {
            remainingEconomySeats: 10,
            remainingPremiumSeats: 24,
            remainingBusinessSeats: 24
        },
        departureTime: new Date(),
        arrivalTime: new Date()
    },
    {
        id: '1',
        departureLocation: 'Katunayake International Airport',
        arrivalLocation: 'Dubai International Airport',
        fleet: {
            id: '2',
            code: '1201',
            model: 'AirBus',
            totalEconomySeats: 50,
            totalPremiumSeats: 30,
            totalBusinessSeats: 30
        },
        status: {
            remainingEconomySeats: 8,
            remainingPremiumSeats: 20,
            remainingBusinessSeats: 0
        },
        departureTime: new Date(),
        arrivalTime: new Date()
    },
];

const FlightManagement = () => {
    const [form] = Form.useForm();

    const [flightData, setFlightData] = useState(originFlightData);
    const [fleetData, setFleetData] = useState(originFleetData);

    const [flightEditingId, setFlightEditingId] = useState('');
    const [fleetEditingId, setFleetEditingId] = useState('');
    const [viewingFleet, setViewingFleet] = useState({});

    const [addFlightModalVisible, setAddFlightModalVisible] = useState(false);
    const [fleetInformationModalVisible, setFleetInformationModalVisible] = useState(false);


    const isEditing = (record) => record.id === flightEditingId;

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
        setFlightEditingId(record.id);
    }

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = {
                ...row,
                departureTime: row['departureAndArrival'][0],
                arrivalTime: row['departureAndArrival'][1]
            };
            delete newData.departureAndArrival;

            const existingFlightData = [...flightData];
            const index = existingFlightData.findIndex((item) => id === item.id);
            const item = existingFlightData[index];
            existingFlightData.splice(index, 1, {
                ...item,
                ...newData,
            });
            setFlightData(existingFlightData);
            setFlightEditingId('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const deleteRow = async (id) => {
        setFlightData(flightData.filter((item) => item.id !== id));
    }

    const cancel = () => {
        setFlightEditingId('');
    }

    const addNewFlight = (newFlight) => {
        const newId = flightData.length.toString();
        const selectedFleet = fleetData.find(fleet => fleet.id === newFlight.fleetId);

        const newFlightData = {
            id: newId,
            departureLocation: newFlight.departureLocation,
            arrivalLocation: newFlight.arrivalLocation,
            departureTime: newFlight.departureTime,
            arrivalTime: newFlight.arrivalTime,
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

    const handleFleetUpdate = (updatedFleet, flightId) => {
        const existingFlightData = [...flightData];
        const flightIndex = existingFlightData.findIndex(flight => flight.id === flightId);

        existingFlightData[flightIndex] = {
            ...existingFlightData[flightIndex],
            fleet: updatedFleet
        }

        setFlightData(existingFlightData);
    }

    const showFleetModal = (record) => {
        setViewingFleet(record.fleet);
        setFleetEditingId(record.id);
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
            title: 'Departure Time and Arrival Time',
            dataIndex: 'departureAndArrival',
            width: '25%',
            editable: true,
            render: (_, record) => {
                return (
                    <div>
                        {formatDate(record.departureTime)} <br /> <FlightTakeoffIcon /> <br /> {formatDate(record.arrivalTime)}
                    </div>
                );
            }
        },
        {
            title: 'Fleet Information',
            dataIndex: 'fleet',
            width: '5%',
            render: (_, record) => (
                <a href={() => false} disabled={fleetEditingId !== ''} onClick={() => showFleetModal(record)}>View</a>
            ),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a href={() => false}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={flightEditingId !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.id)}>
                            <a href={() => false} disabled={flightEditingId !== ''}>Delete</a>
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
                inputType: col.dataIndex === 'departureAndArrival' ? 'rangePicker' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    })

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
                key={fleetEditingId}
                visible={fleetInformationModalVisible}
                onFleetUpdate={handleFleetUpdate}
                onCancel={() => {
                    setFleetInformationModalVisible(false);
                    setFleetEditingId('');
                }}
                fleetData={fleetData}
                initialFleet={viewingFleet}
                editingFlightId={fleetEditingId}
            />
        </>
    );
}

export default FlightManagement;
