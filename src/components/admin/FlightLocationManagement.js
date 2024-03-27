import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import EditableCell from '../common/EditableCell';
import NewFlightLocationModal from './NewFlightLocationModal';
import { AddFlightLocation, DeleteFlightLocation, GetFlightLocations, UpdateFlightLocation } from '../../redux/actions/AdminActions';

const FlightLocationManagement = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const flightLocationData = useSelector((state) => state.flightLocationsReducer.flightLocations);

    const [editingFlightLocationId, setEditingFlightLocationId] = useState('');
    const [newFlightLocationModalVisible, setNewFlightLocationModalVisible] = useState(false);

    useEffect(() => {
        dispatch(GetFlightLocations());
    }, [dispatch, flightLocationData]);

    const isEditing = (record) => record.id === editingFlightLocationId;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingFlightLocationId(record.id);
    }

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            dispatch(UpdateFlightLocation(row, id));
            setEditingFlightLocationId('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const deleteRow = async (id) => {
        dispatch(DeleteFlightLocation(id));
    }

    const cancel = () => {
        setEditingFlightLocationId('');
    }

    const addFlightLocation = (newLocation) => {
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
