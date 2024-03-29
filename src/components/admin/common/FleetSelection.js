import { Col, Form, InputNumber, Row, Table } from "antd";

const FleetSelection = ({ rowSelection, columns, fleetData, selectedFleet, form }) => {
    return (
        <>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={fleetData}
                rowKey="id"
                pagination={{
                    pageSize: 3,
                    total: fleetData.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
            />
            <Form form={form} layout="vertical" name="form_in_modal">
                <Row gutter={16} style={{ marginTop: 20 }}>
                    <Col span={8}>
                        <Form.Item
                            name="economyFare"
                            label="Economy Fare"
                            rules={[{ required: selectedFleet?.totalEconomySeats > 0, message: 'Please input economy fare!' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                disabled={typeof selectedFleet?.totalEconomySeats != "number"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="premiumFare"
                            label="Premium Fare"
                            rules={[{ required: selectedFleet?.totalPremiumSeats > 0, message: 'Please input premium fare!' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                disabled={typeof selectedFleet?.totalPremiumSeats != "number"}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="businessFare"
                            label="Business Fare"
                            rules={[{ required: selectedFleet?.totalBusinessSeats > 0, message: 'Please input business fare!' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                disabled={typeof selectedFleet?.totalBusinessSeats != "number"}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default FleetSelection;
