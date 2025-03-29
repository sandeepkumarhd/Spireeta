import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Radio, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined, DeleteOutlined, EditOutlined, DeleteFilled, PrinterOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import Notification from "@/src/common/Notification";
import * as XLSX from 'xlsx';
import { createEmployee, getEmployees, permanentDeleteEmployee, updateEmployee } from "@/src/store/AllSlices/employee.slice";
import Swal from 'sweetalert2';

const EmployeeTable = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employeeReducer.Employee);
    console.log("employeeSelector", employees)

    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const handleView = (record) => {
        setSelectedRecord(record);
        setIsViewModalVisible(true);
    };

    const handleAddEmployee = () => {
        setIsAddModalVisible(true);
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setIsEditModalVisible(true);

        // Convert ISO date strings to moment objects
        form.setFieldsValue({
            ...record,
            dateOfJoining: record.dateOfJoining ? moment(record.dateOfJoining) : null,
            dateOfBirth: record.dateOfBirth ? moment(record.dateOfBirth) : null,
        });
    };

    const handleDelete = async (record) => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        // Proceed with deletion if the user confirms
        if (result.isConfirmed) {
            console.log("handleDelete", record); // Log the record being deleted
            try {
                const response = await dispatch(permanentDeleteEmployee(record._id));
                Swal.fire(
                    'Deleted!',
                    'The record has been deleted.',
                    'success'
                );
            } catch (error) {
                console.log(error);
                Notification({ message: 'An error occurred while deleting', type: 'error' });
            }
        }
    };

    const handleBulkDelete = async () => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        // Proceed with bulk deletion if the user confirms
        if (result.isConfirmed) {
            try {
                // Perform bulk deletion
                await Promise.all(selectedRowKeys.map(id => dispatch(permanentDeleteEmployee(id))));
                setSelectedRowKeys([]); // Clear selected keys
                Swal.fire(
                    'Deleted!',
                    'Selected records have been deleted.',
                    'success'
                );
            } catch (error) {
                console.log(error);
                Notification({ message: 'An error occurred while deleting selected records', type: 'error' });
            }
        }
    };

    const handleEmployeeUpdate = async () => {
        try {
            const values = await form.validateFields();

            const { _id, ...filteredValues } = values;

            const res = await dispatch(updateEmployee(_id, filteredValues));

            if (res.status === 200) {
                form.resetFields();
                dispatch(getEmployees());
                setIsEditModalVisible(false);
            }
        } catch (error) {
            // Handle validation or dispatch errors
            console.error("Validate Failed:", error);
        }
    };

    const handleAddEmployeeSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("handleAddEmployeeSubmit", values)
            // return;
            const res = await dispatch(createEmployee(values));
            if (res.status === 200) {
                form.resetFields();
                dispatch(getEmployees());
                setIsAddModalVisible(false);
            }
        } catch (error) {
            console.error("Validate Failed:", error);
        }
    };

    const handleCancel = () => {
        setIsViewModalVisible(false);
        setIsEditModalVisible(false);
    };

    const printTable = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Employee Table</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    table, th, td {
                        border: 1px solid #000;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f4f4f4;
                    }
                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h2>Employee Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>EmployeeID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Date of Joining</th>
                            <th>Date of Birth</th>
                            <th>Pan No</th>
                            <th>Aadhar No</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${employees.map((record, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${record.employeeID}</td>
                                <td>${record.name}</td>
                                <td>${record.email}</td>
                                <td>${record.phone}</td>
                                <td>${record.address}</td>
                                <td>${record.city}</td>
                                <td>${record.position}</td>
                                <td>${record.department}</td>
                                <td>${record.dateOfJoining ? moment(record.dateOfJoining).format("DD/MM/YYYY") : "-"}</td>
                                <td>${record.dateOfBirth ? moment(record.dateOfBirth).format("DD/MM/YYYY") : "-"}</td>
                                <td>${record.pancardNo}</td>
                                <td>${record.aadharNo}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const exportToExcel = () => {
        const dataToExport = employees.map((record, index) => ({
            Index: index + 1,
            EmployeeId: record.employeeID,
            Name: record.name,
            Email: record.email,
            Phone: record.phone,
            Address: record.address,
            City: record.city,
            Position: record.position,
            Department: record.department,
            "Date of Joining": record.dateOfJoining ? moment(record.dateOfJoining).format("DD/MM/YYYY") : "-",
            "Date of Birth": record.dateOfBirth ? moment(record.dateOfBirth).format("DD/MM/YYYY") : "-",
            PanNo: record.pancardNo,
            AadharNo: record.aadharNo
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
        XLSX.writeFile(workbook, "Employees.xlsx");
    };

    const columns = [
        {
            title: "Index",
            key: "index",
            render: (text, record, index) => index + 1,
            sorter: (a, b) => a.index - b.index,
            align: 'left',
        },
        {
            title: "Employee Id",
            dataIndex: "employeeID",
            key: "employeeID",
            align: 'left',
            sorter: (a, b) => {
                const idA = parseInt(a.employeeID.split('-')[1]);
                const idB = parseInt(b.employeeID.split('-')[1]);
                return idA - idB;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: 'left',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: 'left',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            align: 'left',
            sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            align: 'left',
            sorter: (a, b) => a.address.localeCompare(b.address),
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
            align: 'left',
            sorter: (a, b) => a.city.localeCompare(b.city),
        },
        {
            title: "Pan No",
            dataIndex: "pancardNo",
            key: "pancardNo",
            align: 'left',
            // sorter: (a, b) => a.panNo.localeCompare(b.panNo),
        },
        {
            title: "Aadhar No",
            dataIndex: "aadharNo",
            key: "aadharNo",
            align: 'left',
            // sorter: (a, b) => a.aadharNo.localeCompare(b.aadharNo),
        },
        {
            title: "Position",
            dataIndex: "position",
            key: "position",
            align: 'left',
            sorter: (a, b) => a.position.localeCompare(b.position),
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            align: 'left',
            sorter: (a, b) => a.department.localeCompare(b.department),
        },
        {
            title: "Date of Joining",
            dataIndex: "dateOfJoining",
            key: "dateOfJoining",
            render: (text) => moment(text).format("DD/MM/YYYY"),
            align: 'left',
            sorter: (a, b) => moment(a.dateOfJoining).diff(moment(b.dateOfJoining)),
        },
        {
            title: "Date of Birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (text) => moment(text).format("DD/MM/YYYY"),
            align: 'left',
            sorter: (a, b) => moment(a.dateOfBirth).diff(moment(b.dateOfBirth)),
        },
        {
            title: "Action",
            key: "action",
            align: 'left',
            render: (text, record) => (
                <span>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record)}
                    />
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    />
                </span>
            )
        },
    ];

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = employees?.filter(record =>
        record.name.toLowerCase().includes(searchText.toLowerCase()) ||
        record.city.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <section className="tp-support-breadcrumb fix pt-60 pb-210">
                <div className="container-fluid px-5">
                    <Card
                        title="Employee Registrations"
                        style={{ overflowX: 'auto' }}
                        className="antdCard"
                    >
                        <div className="cardfirstDiv">
                            <Input
                                placeholder="Search..."
                                onChange={handleSearch}
                                style={{ width: '100%', maxWidth: 240, marginRight: 16, height: '41px' }}
                            />
                            <Button
                                type="default"
                                icon={<PrinterOutlined />}
                                onClick={printTable}
                                className="tableButtons"
                                size='large'

                            >
                                Print
                            </Button>
                            <Button
                                type="default"
                                icon={<ExportOutlined />}
                                onClick={exportToExcel}
                                className="tableButtons"
                                size='large'

                            >
                                Export to Excel
                            </Button>
                            <Button
                                type="default"
                                icon={<DeleteFilled />}
                                onClick={handleBulkDelete}
                                className="tableButtons"
                                disabled={selectedRowKeys.length === 0}
                                size='large'

                            >
                                Delete Selected
                            </Button>
                            <Button
                                type="default"
                                icon={<PlusOutlined />}
                                onClick={handleAddEmployee}
                                className="tableButtons"
                                size='large'

                            >
                                Add Employee
                            </Button>
                        </div>
                        <Table
                            rowKey="_id"
                            columns={columns}
                            dataSource={filteredData}
                            rowSelection={{
                                selectedRowKeys,
                                onChange: setSelectedRowKeys
                            }}
                            pagination={{
                                pageSize: 5,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20']
                            }}
                            bordered={true}
                            size={'middle'}
                            // scroll={{ x: 800 }}
                            scroll={{ x: 'max-content' }}
                        />
                    </Card>
                </div>
            </section>

            {/* View Modal */}
            {selectedRecord && (
                <Modal
                    title="Employee Details"
                    visible={isViewModalVisible}
                    onCancel={handleCancel}
                    footer={<Button onClick={handleCancel}>Close</Button>}
                >
                    {selectedRecord && (
                        <Card>
                            <p><strong>Employee ID:</strong> {selectedRecord.employeeID}</p>
                            <p><strong>Name:</strong> {selectedRecord.name}</p>
                            <p><strong>Email:</strong> {selectedRecord.email}</p>
                            <p><strong>Phone:</strong> {selectedRecord.phone}</p>
                            <p><strong>Address:</strong> {selectedRecord.address}</p>
                            <p><strong>City:</strong> {selectedRecord.city}</p>
                            <p><strong>Position:</strong> {selectedRecord.position}</p>
                            <p><strong>Department:</strong> {selectedRecord.department}</p>
                            <p><strong>Date of Joining:</strong> {selectedRecord.dateOfJoining ? moment(selectedRecord.dateOfJoining).format("DD/MM/YYYY") : "-"}</p>
                            <p><strong>Date of Birth:</strong> {selectedRecord.dateOfBirth ? moment(selectedRecord.dateOfBirth).format("DD/MM/YYYY") : "-"}</p>
                            <p><strong>Pan no.:</strong>{selectedRecord.pancardNo}</p>
                            <p><strong>Aadhar no.:</strong>{selectedRecord.aadharNo}</p>
                        </Card>
                    )}
                </Modal>
            )}

            {/* Add Employee Modal */}
            {isAddModalVisible && (
                <Modal
                    title="Add Employee"
                    visible={isAddModalVisible}
                    onCancel={() => setIsAddModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsAddModalVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleAddEmployeeSubmit}>
                            Add
                        </Button>
                    ]}
                >
                    <Form
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address" label="Address">
                            <Input />
                        </Form.Item>
                        <Form.Item name="city" label="City">
                            <Input />
                        </Form.Item>
                        <Form.Item name="pancardNo" label="Pancard">
                            <Input />
                        </Form.Item>
                        <Form.Item name="aadharNo" label="Aadhar">
                            <Input />
                        </Form.Item>
                        <Form.Item name="position" label="Position">
                            <Input />
                        </Form.Item>
                        <Form.Item name="department" label="Department">
                            <Input />
                        </Form.Item>
                        <Form.Item name="dateOfJoining" label="Date of Joining">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item name="dateOfBirth" label="Date of Birth">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                    </Form>
                </Modal>
            )}

            {/* Edit Modal */}
            {selectedRecord && (
                <Modal
                    title="Edit Employee"
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleEmployeeUpdate}>
                            Save
                        </Button>
                    ]}
                >
                    <Form
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item name="_id" hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address" label="Address">
                            <Input />
                        </Form.Item>
                        <Form.Item name="city" label="City">
                            <Input />
                        </Form.Item>
                        <Form.Item name="pancardNo" label="Pancard">
                            <Input />
                        </Form.Item>
                        <Form.Item name="aadharNo" label="Aadhar">
                            <Input />
                        </Form.Item>
                        <Form.Item name="position" label="Position">
                            <Input />
                        </Form.Item>
                        <Form.Item name="department" label="Department">
                            <Input />
                        </Form.Item>
                        <Form.Item name="dateOfJoining" label="Date of Joining">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item name="dateOfBirth" label="Date of Birth">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    )
}
export default EmployeeTable;
