import React, { useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Typography } from 'antd';
import NewFlightLocationModal from './NewFlightLocationModal';

const originData = [
    {
        key: '0',
        country: 'Sri Lanka',
        cityName: 'Katunayake',
        airportName: 'Katunayake International Airport',
        code: '941'
    },
    {
        key: '1',
        country: 'United Arab Emirates',
        cityName: 'Dubai',
        airportName: 'Dubai International Airport',
        code: '971'
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

const FlightLocationManagement = () => {
    const [form] = Form.useForm();

    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            country: '',
            cityName: '',
            airportName: '',
            code: '',
            ...record,
        });
        setEditingKey(record.key);
    }

    const cancel = () => {
        setEditingKey('');
    }

    const addFlightLocation = (newLocation) => {
        const newData = [...data, { key: data.length.toString(), ...newLocation }];
        setData(newData);
        setModalVisible(false);
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
                onClick={() => setModalVisible(true)}
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
            <NewFlightLocationModal
                visible={modalVisible}
                onCreate={addFlightLocation}
                onCancel={() => setModalVisible(false)}
            />
        </>
    );
};

export default FlightLocationManagement;
