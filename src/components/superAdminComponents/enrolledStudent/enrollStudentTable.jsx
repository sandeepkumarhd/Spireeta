import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Radio, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined, DeleteOutlined, EditOutlined, DeleteFilled, PrinterOutlined, ExportOutlined, RestOutlined } from '@ant-design/icons';
import moment from 'moment';
import Notification from "@/src/common/Notification";
import { createStudents, fetchEnrollStudent, permenantlyDeleteEnrollStudent, softDeleteEnrollStudent, updateStudents } from "@/src/store/AllSlices/enrollStudent.slice";
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import DeleteStudentTable from "./deleteStudent";

const EnrollStudentTable = () => {
    const dispatch = useDispatch();
    const enrollStudentsSelector = useSelector((state) => state.enrollStudentReducer.enrollStudents);
    console.log("enrollStudentsSelector", enrollStudentsSelector)

    const [showDeleted, setShowDeleted] = useState(false);

    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(fetchEnrollStudent());
    }, [dispatch]);

    useEffect(() => {
        if (!showDeleted) {
            dispatch(fetchEnrollStudent());
        }
    }, [setShowDeleted]);

    if (showDeleted) {
        console.log("showDeleted",showDeleted)
        return <DeleteStudentTable setShowDeleted={setShowDeleted} />;
    }

    const handleView = (record) => {
        setSelectedRecord(record);
        setIsViewModalVisible(true);
    };

    const handleEdit = (record) => {
        setSelectedRecord(record);
        setIsEditModalVisible(true);

        // Convert ISO date strings to moment objects
        form.setFieldsValue({
            ...record,
            internshipInterestedTechnologies: record.internshipInterestedTechnologies.join(", "),
            createdAt: record.createdAt ? moment(record.createdAt) : null,
            itpTargetStartDate: record.itpTargetStartDate ? moment(record.itpTargetStartDate) : null,
            itpTargetEndDate: record.itpTargetEndDate ? moment(record.itpTargetEndDate) : null,
            actualStartDate: record.actualStartDate ? moment(record.actualStartDate) : null,
            actualEndDate: record.actualEndDate ? moment(record.actualEndDate) : null,
            registrationDate: record.registrationDate ? moment(record.registrationDate) : null
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

        if (result.isConfirmed) {
            try {
                const response = await dispatch(softDeleteEnrollStudent(record._id));
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

        if (result.isConfirmed) {
            try {
                // Perform bulk deletion
                await Promise.all(selectedRowKeys.map(id => dispatch(softDeleteEnrollStudent(id))));
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

    const handleEnrollUpdate = async () => {
        try {
            const values = await form.validateFields();

            const { createdAt, ...filteredValues } = values;

            const dataToSend = {
                ...filteredValues,
                id: selectedRecord._id
            };

            const res = await dispatch(updateStudents(dataToSend.id, dataToSend));

            console.log("Response:", res);

            if (res.status === 200) {
                // Reset form fields and close modal
                form.resetFields();
                dispatch(fetchEnrollStudent());
                setIsEditModalVisible(false);
            }
        } catch (error) {
            // Handle validation or dispatch errors
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
                <title>Print Enroll Students Table</title>
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
                <h2>Enrolled Students Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Student Name</th>
                            <th>Registration Date</th>
                            <th>Candidate ITP ID</th>
                            <th>Candidate Batch ID</th>
                            <th>Candidate Email ID</th>
                            <th>Phone</th>
                            <th>College Name</th>
                            <th>ITP Project Name</th>
                            <th>ITP Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${enrollStudentsSelector.map((record, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${record.nameOfTheStudent}</td>
                                <td>${record.registrationDate ? moment(record.registrationDate).format("DD/MM/YYYY") : "-"}</td>
                                <td>${record.itpNumber}</td>
                                <td>${record.batchNumber}</td>
                                <td>${record.email}</td>
                                <td>${record.phone}</td>
                                <td>${record.collegeName}</td>
                                <td>${record.itpProjectName}</td>
                                <td>${record.itpCompleted}</td>
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

    const printModalContent = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Student Details</title>
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
                <h2>Student Details</h2>
                <p><strong>Enroll Date:</strong> ${selectedRecord.createdAt ? moment(selectedRecord.createdAt).format("DD/MM/YYYY") : "-"}</p>
                <p><strong>Name of the Student:</strong> ${selectedRecord.nameOfTheStudent}</p>
                <p><strong>College/Institute Name:</strong> ${selectedRecord.collegeName}</p>
                <p><strong>College Address:</strong> ${selectedRecord.collegeAddress}</p>
                <p><strong>Educational Degree:</strong> ${selectedRecord.educationalDegree}</p>
                <p><strong>Branch:</strong> ${selectedRecord.branch}</p>
                <p><strong>Last year/semester percentage/grade obtained:</strong> ${selectedRecord.lastYearPercentageGrade}</p>
                <p><strong>Candidate email id:</strong> ${selectedRecord.email}</p>
                <p><strong>Candidate Phone number:</strong> ${selectedRecord.phone}</p>
                <p><strong>Candidate emergency contact number:</strong> ${selectedRecord.emergencyPhone}</p>
                <p><strong>Candidate Address:</strong> ${selectedRecord.address}</p>
                <p><strong>Candidate Aadhar Card Number:</strong> ${selectedRecord.aadharCardNumber}</p>
                <p><strong>Candidate PAN number:</strong> ${selectedRecord.panNumber}</p>
                <p><strong>Internship technologies interested in:</strong> ${selectedRecord.internshipInterestedTechnologies.join(", ")}</p>
                <p><strong>Working Style:</strong> ${selectedRecord.workingStyle}</p>
                <p><strong>College Internal Guide:</strong> ${selectedRecord.collegeInternalGuide}</p>
                <p><strong>College External Guide:</strong> ${selectedRecord.collegeExternalGuide}</p>
                <p><strong>Internship Training Coordinator:</strong> ${selectedRecord.internshipTrainingCoordinator}</p>
                <p><strong>Candidate ITP Number:</strong> ${selectedRecord.itpNumber}</p>
                <p><strong>Candidate Batch Number:</strong> ${selectedRecord.batchNumber}</p>
                <p><strong>ITP Target Start Date:</strong> ${selectedRecord.itpTargetStartDate ? moment(selectedRecord.itpTargetStartDate).format("DD/MM/YYYY") : "-"}</p>
                <p><strong>ITP Target End Date:</strong> ${selectedRecord.itpTargetEndDate ? moment(selectedRecord.itpTargetEndDate).format("DD/MM/YYYY") : "-"}</p>
                <p><strong>Actual Start Date:</strong> ${selectedRecord.actualStartDate ? moment(selectedRecord.actualStartDate).format("DD/MM/YYYY") : "-"}</p>
                <p><strong>Actual End Date:</strong> ${selectedRecord.actualEndDate ? moment(selectedRecord.actualEndDate).format("DD/MM/YYYY") : "-"}</p>
                <p><strong>Internship Completed:</strong> ${selectedRecord.itpCompleted}</p>
                <p><strong>Additional Info:</strong> ${selectedRecord.additionalInfo}</p>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const exportToExcel = () => {
        const dataToExport = enrollStudentsSelector.map((record, index) => ({
            Index: index + 1,
            "Student Name": record.nameOfTheStudent,
            "Registration Date": record.registrationDate ? moment(record.registrationDate).format("DD/MM/YYYY") : "-",
            "Candidate ITP ID": record.itpNumber,
            "Candidate Batch ID": record.batchNumber,
            "Candidate Email ID": record.email,
            "Phone": record.phone,
            "College Name": record.collegeName,
            "ITP Project Name": record.itpProjectName,
            "ITP Completed": record.itpCompleted
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Enroll Students");
        XLSX.writeFile(workbook, "Enroll_Students.xlsx");
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
            title: "Student Name",
            dataIndex: "nameOfTheStudent",
            key: "nameOfTheStudent",
            align: 'left',
            sorter: (a, b) => a.nameOfTheStudent.localeCompare(b.nameOfTheStudent),
        },
        {
            title: "Registration Date",
            dataIndex: "registrationDate",
            key: "registrationDate",
            // render: (date) => new Date(date).toLocaleDateString("en-gb")
            render: (text) => moment(text).format("DD/MM/YYYY"),
            align: 'left',
            sorter: (a, b) => moment(a.registrationDate).diff(moment(b.registrationDate)),

        },
        {
            title: "Candidate ITP ID",
            dataIndex: "itpNumber",
            key: "itpNumber",
            align: 'left',
            sorter: (a, b) => a.itpNumber.localeCompare(b.itpNumber),
        },
        {
            title: "Candidate Batch ID",
            dataIndex: "batchNumber",
            key: "batchNumber",
            align: 'left',
            sorter: (a, b) => a.batchNumber.localeCompare(b.batchNumber),
        },
        {
            title: "Candidate Email ID",
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
            title: "College Name",
            dataIndex: "collegeName",
            key: "collegeName",
            align: 'left',
            sorter: (a, b) => a.collegeName.localeCompare(b.collegeName),

        },
        {
            title: "ITP Project Name",
            dataIndex: "itpProjectName",
            key: "itpProjectName",
            align: 'left',
            sorter: (a, b) => a.itpProjectName.localeCompare(b.itpProjectName),

        },
        {
            title: "ITP completed",
            dataIndex: "itpCompleted",
            key: "itpCompleted",
            align: 'left',
            sorter: (a, b) => a.itpCompleted.localeCompare(b.itpCompleted),
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

    const filteredData = enrollStudentsSelector?.filter(record =>
        record.nameOfTheStudent.toLowerCase().includes(searchText.toLowerCase()) ||
        record.collegeName.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <section className="tp-support-breadcrumb fix pt-60 pb-210">
                <div className="container-fluid px-5">
                    <Card
                        title="Enrolled Students"
                        style={{ overflowX: 'auto' }}
                        className="antdCard"
                    >
                        <div className="cardfirstDiv">
                            <Input
                                placeholder="Search..."
                                onChange={handleSearch}
                                style={{ width: '100%', maxWidth: 240, margin:5, height: '41px' }}
                            />
                            <Button
                                type="default"
                                icon={<PrinterOutlined />}
                                onClick={printTable}
                                className="tableButtons"
                                size='large'
                                style={{ margin:5 }}

                            >
                                Print
                            </Button>
                            <Button
                                type="default"
                                icon={<ExportOutlined />}
                                onClick={exportToExcel}
                                className="tableButtons"
                                size='large'
                                style={{ margin:5 }}

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
                                style={{ margin:5 }}

                            >
                                Delete Selected
                            </Button>
                            <Button
                                type="default"
                                icon={<RestOutlined />}
                                className="tableButtons"
                                size='large'
                                onClick={() => setShowDeleted(true)}
                                style={{ margin:5 }}
                            >
                                Recycle Bin
                            </Button>
                        </div>
                        <Table 
                        className="table-admin"
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
                    title="Student Details"
                    open={isViewModalVisible}
                    onCancel={handleCancel}
                    width={window.innerWidth < 768 ? '90%' : '80%'}
                    footer={[
                        <Button key="print" icon={<PrinterOutlined />} onClick={printModalContent}>
                            Print
                        </Button>,
                        <Button key="cancel" onClick={handleCancel}>
                            Close
                        </Button>,
                    ]}
                >
                    <div>
                        <p><strong>Enroll Date:</strong> {selectedRecord.createdAt ? moment(selectedRecord.createdAt).format("DD/MM/YYYY") : "-"}</p>
                        <p><strong>Name of the Student:</strong> {selectedRecord.nameOfTheStudent}</p>
                        <p><strong>College/Institute Name:</strong> {selectedRecord.collegeName}</p>
                        <p><strong>College Address:</strong> {selectedRecord.collegeAddress}</p>
                        <p><strong>Educational Degree:</strong> {selectedRecord.educationalDegree}</p>
                        <p><strong>Branch:</strong> {selectedRecord.branch}</p>
                        <p><strong>Last year/semester percentage/grade obtained:</strong> {selectedRecord.lastYearPercentageGrade}</p>
                        <p><strong>Candidate email id:</strong> {selectedRecord.email}</p>
                        <p><strong>Candidate Phone number:</strong> {selectedRecord.phone}</p>
                        <p><strong>Candidate emergency contact number:</strong> {selectedRecord.emergencyPhone}</p>
                        <p><strong>Candidate Address:</strong> {selectedRecord.address}</p>
                        <p><strong>Candidate Aadhar Card Number:</strong> {selectedRecord.aadharCardNumber}</p>
                        <p><strong>Candidate PAN number:</strong> {selectedRecord.panNumber}</p>
                        <p><strong>Internship technologies interested in:</strong> {selectedRecord.internshipInterestedTechnologies.join(", ")}</p>
                        <p><strong>Working Style:</strong> {selectedRecord.workingStyle}</p>
                        <p><strong>College Internal Guide:</strong> {selectedRecord.collegeInternalGuide}</p>
                        <p><strong>College External Guide:</strong> {selectedRecord.collegeExternalGuide}</p>
                        <p><strong>Internship Training Coordinator:</strong> {selectedRecord.internshipTrainingCoordinator}</p>
                        <p><strong>Candidate ITP Number:</strong> {selectedRecord.itpNumber}</p>
                        <p><strong>Candidate Batch Number:</strong> {selectedRecord.batchNumber}</p>
                        <p><strong>ITP Target Start Date:</strong> {selectedRecord.itpTargetStartDate ? moment(selectedRecord.itpTargetStartDate).format("DD/MM/YYYY") : "-"}</p>
                        <p><strong>ITP Target End Date:</strong> {selectedRecord.itpTargetEndDate ? moment(selectedRecord.itpTargetEndDate).format("DD/MM/YYYY") : "-"}</p>
                        <p><strong>ITP Completed Successfully:</strong> {selectedRecord.itpCompleted}</p>
                        <p><strong>If No – Reason:</strong> {selectedRecord.noCompletedReason}</p>
                        <p><strong>Actual Start Date:</strong> {selectedRecord.actualStartDate ? moment(selectedRecord.actualStartDate).format("DD/MM/YYYY") : "-"}</p>
                        <p><strong>Actual End Date:</strong> {selectedRecord.actualEndDate ? moment(selectedRecord.actualEndDate).format("DD/MM/YYYY") : "-"}</p>
                        <p><strong>ITP Project Name:</strong> {selectedRecord.itpProjectName}</p>
                        <p><strong>Registration Date:</strong> {selectedRecord.registrationDate ? moment(selectedRecord.registrationDate).format("DD/MM/YYYY") : "-"}</p>

                        <p><strong>Candidate Reference:</strong> {selectedRecord.candidateReference}</p>
                    </div>
                </Modal>
            )}

            {/* Edit Modal */}
            {selectedRecord && (
                <Modal
                    title="Student Details"
                    open={isEditModalVisible}
                    onCancel={handleCancel}
                    width={window.innerWidth < 768 ? '90%' : '80%'}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="enroll" type="primary" onClick={handleEnrollUpdate}>
                            Update Student
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        // initialValues={selectedRecord}
                        initialValues={{
                            createdAt: null,
                            itpTargetStartDate: null,
                            itpTargetEndDate: null,
                            actualStartDate: null,
                            actualEndDate: null,
                            registrationDate: null
                        }}
                    >
                        <Form.Item name="createdAt" label="Enroll Date">
                            <DatePicker format="DD/MM/YYYY" disabled />
                        </Form.Item>
                        <Form.Item label="Name of the Student" name="nameOfTheStudent">
                            <Input />
                        </Form.Item>
                        <Form.Item label="College/Institute Name" name="collegeName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="College Address" name="collegeAddress">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Educational Degree" name="educationalDegree">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Branch" name="branch">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Last year/semester percentage/grade obtained" name="lastYearPercentageGrade">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate email id" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate Phone number" name="phone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate emergency contact number" name="emergencyPhone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate Address" name="address">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate Aadhar Card Number" name="aadharCardNumber">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate PAN number" name="panNumber">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Internship technologies interested in" name="internshipInterestedTechnologies">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Working Style" name="workingStyle">
                            <Input />
                        </Form.Item>

                        <Form.Item label="College Internal Guide" name="collegeInternalGuide">
                            <Input />
                        </Form.Item>
                        <Form.Item label="College External Guide" name="collegeExternalGuide">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Internship Training Coordinator" name="internshipTrainingCoordinator">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate ITP Number" name="itpNumber">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Candidate Batch Number" name="batchNumber">
                            <Input />
                        </Form.Item>
                        <Form.Item label="ITP Target Start Date" name="itpTargetStartDate">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item label="ITP Target End Date" name="itpTargetEndDate">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item label="ITP Completed Successfully" name="itpCompleted">
                            <Radio.Group>
                                <Radio value="Yes">Yes</Radio>
                                <Radio value="No">No</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="If No – Reason" name="noCompletedReason">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Actual Start Date" name="actualStartDate">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item label="Actual End Date" name="actualEndDate">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item label="ITP Project Name" name="itpProjectName">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Registration Date" name="registrationDate">
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item label="Candidate Reference" name="candidateReference">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    )
}
export default EnrollStudentTable;
