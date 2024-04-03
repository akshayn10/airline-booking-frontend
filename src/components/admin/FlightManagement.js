import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FleetInfomationModal from './FleetInformationModal';
import AddFlightModal from './AddFlightModal';
import EditableCell from './common/EditableCell';
import { AddFlight, DeleteFlight, GetFleets, GetFlightLocations, GetFlights, UpdateFlight } from '../../redux/actions/AdminActions';
import { formatDate } from '../../util/DateConversion';

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

    useEffect(() => {
        dispatch(GetFlightLocations());
    }, [flightLocationData]);

    useEffect(() => {
        dispatch(GetFleets());
    }, [fleetData]);

    useEffect(() => {
        dispatch(GetFlights());
    }, [flightData]);

    const isEditing = (record) => record.id === flightEditingId;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
            departureAndArrival: [record.departureTime, record.arrivalTime],
        });
        setFlightEditingId(record.id);
    }

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            row.id = id;
            row.departureTime = row['departureAndArrival'][0];
            row.arrivalTime = row['departureAndArrival'][1];
            delete row.departureAndArrival;

            dispatch(UpdateFlight(row));
            setFlightEditingId('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const deleteRow = async (id) => {
        dispatch(DeleteFlight(id));
    }

    const cancel = () => {
        setFlightEditingId('');
    }

    const addNewFlight = (newFlight) => {
        const selectedFleet = fleetData.find(fleet => fleet.id === newFlight.fleetId);

        const newFlightData = {
            departureLocation: newFlight.departureLocation,
            arrivalLocation: newFlight.arrivalLocation,
            departureTime: newFlight.departureTime,
            arrivalTime: newFlight.arrivalTime,
            fleet: {
                id: selectedFleet.id,
                economyFare: newFlight.economyFare,
                premiumFare: newFlight.premiumFare,
                businessFare: newFlight.businessFare
            }
        }

        dispatch(AddFlight(newFlightData));
        setAddFlightModalVisible(false);
    }

    const handleFlightFleetUpdate = (updatedFleet, flightId) => {
        const existingFlightData = [...flightData];
        const flightIndex = existingFlightData.findIndex(flight => flight.id === flightId);

        existingFlightData[flightIndex] = {
            ...existingFlightData[flightIndex],
            departureAndArrival: [
                existingFlightData[flightIndex].departureTime,
                existingFlightData[flightIndex].arrivalTime
            ],
            fleet: updatedFleet
        };

        dispatch(UpdateFlight(existingFlightData[flightIndex], flightId));
    }

    const showFleetModal = (record) => {
        setViewingFleet(record.fleet);
        setFlightFleetEditingId(record.id);
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
                <a href={() => false} disabled={flightFleetEditingId !== ''} onClick={() => showFleetModal(record)}>View</a>
            ),
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8, whiteSpace: 'nowrap' }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a href={() => false}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={flightEditingId !== ''} onClick={() => edit(record)} style={{ marginRight: 8, whiteSpace: 'nowrap' }}>
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
                editing: isEditing(record),
                dataIndex: col.dataIndex,
                title: col.title,
                inputType: col.dataIndex === 'departureLocation' || col.dataIndex === 'arrivalLocation' ? 'select' : col.dataIndex === 'departureAndArrival' ? 'rangePicker' : 'text',
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
                editingFlightId={flightFleetEditingId}
            />
        </>
    );
}

export default FlightManagement;
