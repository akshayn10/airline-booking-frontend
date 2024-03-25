import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import EditableCell from '../common/EditableCell';
import NewFlightLocationModal from './NewFlightLocationModal';
import { AddFlightLocation } from '../../redux/actions/AdminActions';

const originFlightLocationData = [
    {
        id: '0',
        country: 'Sri Lanka',
        cityName: 'Katunayake',
        airportName: 'Katunayake International Airport',
        code: '941'
    },
    {
        id: '1',
        country: 'United Arab Emirates',
        cityName: 'Dubai',
        airportName: 'Dubai International Airport',
        code: '971'
    },
];

const FlightLocationManagement = () => {
    const [form] = Form.useForm();

    const [flightLocationData, setFlightLocationData] = useState([]);
    const [editingFlightLocationId, setEditingFlightLocationId] = useState('');
    const [newFlightLocationModalVisible, setNewFlightLocationModalVisible] = useState(false);

    const data = useSelector((state) => state.flightLocations.flightLocations);
    const dispatch = useDispatch();

    useEffect(() => {
        setFlightLocationData(data);
    }, [data])

    const isEditing = (record) => record.id === editingFlightLocationId;

    const edit = (record) => {
        form.setFieldsValue({
            country: '',
            cityName: '',
            airportName: '',
            code: '',
            ...record,
        });
        setEditingFlightLocationId(record.id);
    }

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const existingFlightLocationData = [...flightLocationData];
            const index = existingFlightLocationData.findIndex((item) => id === item.id);
            const item = existingFlightLocationData[index];
            existingFlightLocationData.splice(index, 1, {
                ...item,
                ...row,
            });
            setFlightLocationData(existingFlightLocationData);
            setEditingFlightLocationId('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const deleteRow = async (id) => {
        setFlightLocationData(flightLocationData.filter((item) => item.id !== id));
    }

    const cancel = () => {
        setEditingFlightLocationId('');
    }

    const addFlightLocation = (newLocation) => {
        const newFlightLocationData = [...flightLocationData, { id: flightLocationData.length.toString(), ...newLocation }];
        // setFlightLocationData(newFlightLocationData);
        dispatch(AddFlightLocation({ id: flightLocationData.length.toString(), ...newLocation }));
        setNewFlightLocationModalVisible(false);
    }

    const columns = [
        {
            title: 'Country',
            dataIndex: 'country',
            width: '20%',
            editable: true,
        },
        {
            title: 'City Name',
            dataIndex: 'cityName',
            width: '20%',
            editable: true,
        },
        {
            title: 'Airport Name',
            dataIndex: 'airportName',
            width: '40%',
            editable: true,
        },
        {
            title: 'Code',
            dataIndex: 'code',
            width: '10%',
            editable: true,
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
                        <Typography.Link disabled={editingFlightLocationId !== ''} onClick={() => edit(record)} style={{ marginRight: 8 }}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => deleteRow(record.id)}>
                            <a href={() => false} disabled={editingFlightLocationId !== ''}>Delete</a>
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
                onClick={() => setNewFlightLocationModalVisible(true)}
                style={{ marginBottom: 16 }}
            >
                Add Flight Location
            </Button>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={flightLocationData}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        pageSize: 10,
                        total: flightLocationData.length,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        onChange: cancel
                    }}
                />
            </Form>
            <NewFlightLocationModal
                visible={newFlightLocationModalVisible}
                onCreate={addFlightLocation}
                onCancel={() => setNewFlightLocationModalVisible(false)}
            />
        </>
    );
}

export default FlightLocationManagement;
