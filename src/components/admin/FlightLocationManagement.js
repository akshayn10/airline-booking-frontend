import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Popconfirm, Table, Typography, Space } from 'antd';
import EditableCell from './common/EditableCell';
import NewFlightLocationModal from './NewFlightLocationModal';
import { AddFlightLocation, GetFlightLocations, UpdateFlightLocation } from '../../redux/actions/AdminActions';

const FlightLocationManagement = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const flightLocationData = useSelector((state) => state.flightLocationsReducer.flightLocations);

    const [editingFlightLocationId, setEditingFlightLocationId] = useState('');
    const [newFlightLocationModalVisible, setNewFlightLocationModalVisible] = useState(false);

    useEffect(() => {
        dispatch(GetFlightLocations());
    }, []);

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
            form.resetFields();

            row.id = id;

            dispatch(UpdateFlightLocation(row));
            setEditingFlightLocationId('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const cancel = () => {
        setEditingFlightLocationId('');
    }

    const addFlightLocation = (newLocation) => {
        dispatch(AddFlightLocation(newLocation));
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
            align: 'center'
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            align: 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return (
                    <Space size='large'>
                        {editable ? (
                            <>
                                <Typography.Link onClick={() => save(record.id)} style={{ whiteSpace: 'nowrap' }}>
                                    Save
                                </Typography.Link>
                                <Popconfirm title="Are you sure?" onConfirm={cancel}>
                                    <a href={() => false}>Cancel</a>
                                </Popconfirm>
                            </>
                        ) : (
                            <Typography.Link disabled={editingFlightLocationId !== ''} onClick={() => edit(record)} style={{ whiteSpace: 'nowrap' }}>
                                Edit
                            </Typography.Link>
                        )}
                    </Space>
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
                record,
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
                    loading={useSelector((state) => state.flightLocationsReducer.isLoading)}
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
