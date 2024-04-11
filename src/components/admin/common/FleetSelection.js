import { Col, Form, InputNumber, Row, Table } from "antd";

const FleetSelection = ({ rowSelection, columns, fleetData, selectedFleet, form, isEditable }) => {
    // Conditionally set rowSelection configuration
    const conditionalRowSelection = isEditable ? {
        ...rowSelection,
        type: 'radio' // Set type to 'radio' when editable
    } : undefined; // Pass undefined to disable row selection

    return (
        <>
            <Table
                rowSelection={conditionalRowSelection} // Use conditional rowSelection
                columns={columns}
                dataSource={fleetData}
                rowKey="id"
                pagination={isEditable ? { // Adjust pagination based on editability
                    pageSize: 3,
                    total: fleetData.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                } : false}
            />
            <Form form={form} layout="vertical" name="form_in_modal">
                <Row gutter={16} style={{ marginTop: 20 }}>
                    <Col span={8}>
                        <Form.Item
                            name="economyFare"
                            label="Economy Fare"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                disabled={!isEditable || selectedFleet?.totalEconomySeats === 0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="premiumFare"
                            label="Premium Fare"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                disabled={!isEditable || selectedFleet?.totalPremiumSeats === 0}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="businessFare"
                            label="Business Fare"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                disabled={!isEditable || selectedFleet?.totalBusinessSeats === 0}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default FleetSelection;
