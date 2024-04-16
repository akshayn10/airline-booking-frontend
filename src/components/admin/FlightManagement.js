import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Popconfirm, Table, Typography, Space } from 'antd';
import Chip from '@mui/material/Chip';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FleetInfomationModal from './FleetInformationModal';
import AddFlightModal from './AddFlightModal';
import EditableCell from './common/EditableCell';
import { AddFlight, GetFleets, GetFlightLocations, GetFlights, UpdateFlight } from '../../redux/actions/AdminActions';
import { formatDate } from '../../util/DateConversion';
import dayjs from 'dayjs';

const FlightManagement = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const flightLocationData = useSelector((state) => state.flightLocationsReducer.flightLocations);
    const fleetData = useSelector((state) => state.fleetsReducer.fleets);
    const flightData = useSelector((state) => state.flightsReducer.flights);

    const [flightEditingId, setFlightEditingId] = useState('');
    const [flightFleetEditingId, setFlightFleetEditingId] = useState('');
    const [viewingFleet, setViewingFleet] = useState({});

    const [addFlightModalVisible, setAddFlightModalVisible] = useState(false);
    const [fleetInformationModalVisible, setFleetInformationModalVisible] = useState(false);
    const [isFleetEditable, setIsFleetEditable] = useState(false);

    useEffect(() => {
        document.title = "Flight Management";
    }, []);

    useEffect(() => {
        dispatch(GetFlightLocations());
    }, []);

    useEffect(() => {
        dispatch(GetFleets());
    }, []);

    useEffect(() => {
        dispatch(GetFlights());
    }, []);

    const isEditing = (record) => record.id === flightEditingId;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
            departureAndArrival: [dayjs(record.departureTime), dayjs(record.arrivalTime)],
        });
        setFlightEditingId(record.id);
    }

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            form.resetFields();

            const updatedFlight = flightData.find(flight => flight.id === id);
            const updatedFlightCopy = { ...updatedFlight };

            updatedFlightCopy.departureTime = row['departureAndArrival'][0];
            updatedFlightCopy.arrivalTime = row['departureAndArrival'][1];
            updatedFlightCopy.departureLocation = row['departureLocation'];
            updatedFlightCopy.arrivalLocation = row['arrivalLocation'];

            dispatch(UpdateFlight(updatedFlightCopy));
            setFlightEditingId('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const cancel = () => {
        setFlightEditingId('');
    }

    const addNewFlight = (newFlight) => {
        dispatch(AddFlight(newFlight));
    }

    const handleFlightFleetUpdate = (updatedFleet) => {
        const existingFlightData = [...flightData];
        const flightIndex = existingFlightData.findIndex(flight => flight.id === flightFleetEditingId);

        existingFlightData[flightIndex] = {
            ...existingFlightData[flightIndex],
            ...updatedFleet
        };

        dispatch(UpdateFlight(existingFlightData[flightIndex]));
    }

    const showFleetModal = (record) => {
        const tempViewingFleet = {
            id: record.fleetId,
            economyFare: record.economyFare,
            premiumFare: record.premiumFare,
            businessFare: record.businessFare,
            remainingEconomySeats: record.remainingEconomySeats,
            remainingPremiumSeats: record.remainingPremiumSeats,
            remainingBusinessSeats: record.remainingBusinessSeats,
            flightHasBookings: record.flightHasBookings,
        };
        setViewingFleet(tempViewingFleet);
        setFlightFleetEditingId(record.id);

        // Determine if the fleet information is editable
        const isFlightEditable = !record.flightHasBookings && dayjs(record.departureTime).isAfter(dayjs());

        // Pass the isEditable flag to the modal
        setIsFleetEditable(isFlightEditable);
        setFleetInformationModalVisible(true);
    }

    const columns = [
        {
            title: 'Departure Location',
            dataIndex: 'departureLocation',
            width: '30%',
            editable: true,
            render: (text, record) => flightLocationData.find(loc => loc.id === record.departureLocation)?.airportName || 'N/A',
        },
        {
            title: 'Arrival Location',
            dataIndex: 'arrivalLocation',
            width: '30%',
            editable: true,
            render: (text, record) => flightLocationData.find(loc => loc.id === record.arrivalLocation)?.airportName || 'N/A',
        },
        {
            title: 'Departure Time and Arrival Time',
            dataIndex: 'departureAndArrival',
            width: '20%',
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
            width: '10%',
            align: 'center',
            render: (_, record) => (
                <a href={() => false} onClick={() => showFleetModal(record)}>View</a>
            ),
        },
        {
            title: 'Operation / Status',
            dataIndex: 'operation',
            align: 'center',
            render: (_, record) => {
                const isCompleted = dayjs(record.departureTime).isBefore(dayjs());

                // Condition to determine if the row should be editable
                const editable = isEditing(record) && !record.flightHasBookings && !isCompleted;

                // Display different content based on flight status
                if (isCompleted) {
                    return <Chip label={"Completed"} />;
                } else if (record.flightHasBookings) {
                    return <Chip label={"Has Bookings"} />;
                } else if (editable) {
                    // If the row is editable and flight status is active
                    return (
                        <Space size="large">
                            <Typography.Link onClick={() => save(record.id)} style={{ whiteSpace: 'nowrap' }}>
                                Save
                            </Typography.Link>
                            <Popconfirm title="Are you sure?" onConfirm={cancel}>
                                <a href={() => false}>Cancel</a>
                            </Popconfirm>
                        </Space>
                    );
                } else {
                    // If the flight is active but not currently being edited
                    return (
                        <Typography.Link disabled={flightEditingId !== ''} onClick={() => edit(record)} style={{ whiteSpace: 'nowrap' }}>
                            Edit
                        </Typography.Link>
                    );
                }
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
                editing: isEditing(record),
                dataIndex: col.dataIndex,
                title: col.title,
                inputType: col.dataIndex === 'departureLocation' || col.dataIndex === 'arrivalLocation' ? 'select'
                    : col.dataIndex === 'departureAndArrival' ? 'rangePicker' : 'text',
                record,
                selectOptions: flightLocationData.map(({ id, airportName, cityName, country }) => ({
                    label: `${airportName} at ${cityName}, ${country}`,
                    value: id,
                })),
                dependencies: ['departureLocation', 'arrivalLocation'].filter(field => field !== col.dataIndex),
                form,
            }),
        }
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
                    loading={useSelector((state) => state.flightsReducer.isLoading)}
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
                        pageSize: 5,
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
                flightLocationData={flightLocationData}
            />
            <FleetInfomationModal
                key={flightFleetEditingId}
                visible={fleetInformationModalVisible}
                onFleetUpdate={handleFlightFleetUpdate}
                onCancel={() => {
                    setFleetInformationModalVisible(false);
                    setFlightFleetEditingId('');
                }}
                fleetData={fleetData}
                initialFleet={viewingFleet}
                isEditable={isFleetEditable}
            />
        </>
    );
}

export default FlightManagement;
