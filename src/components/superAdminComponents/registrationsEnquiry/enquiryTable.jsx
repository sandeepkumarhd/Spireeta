import Notification from "@/src/common/Notification";
import { fetchRegistrationsEnquiry, softDeleteEnquiry } from "@/src/store/AllSlices/enquiry.slice";
import { createStudents } from "@/src/store/AllSlices/enrollStudent.slice";
import { DeleteFilled, DeleteOutlined, EditOutlined, ExportOutlined, EyeOutlined, PrinterOutlined, RestOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Modal, Radio, Table } from "antd";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import DeleteEnquiry from "./deleteEnquiry";

const EnquiryTable = () => {
    const dispatch = useDispatch();
    const enquirySelector = useSelector((state) => state.enquiryReducer.REGenquiry);
    const [showDeletedEnquiry, setShowDeletedEnquiry] = useState(false);

    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(fetchRegistrationsEnquiry());
    }, [dispatch]);

    useEffect(() => {
        if (!showDeletedEnquiry) {
            dispatch(fetchRegistrationsEnquiry());
        }
    }, [setShowDeletedEnquiry]);

    if (showDeletedEnquiry) {
        return <DeleteEnquiry setShowDeletedEnquiry={setShowDeletedEnquiry} />;
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

    // const handleDelete = async (record) => {
    //     console.log("Delete record:", record);
    //     try {
    //         const response = await dispatch(permenantlyDeleteEnquiry(record._id));
    //     } catch (error) {
    //         console.log(error);
    //         Notification({ message: 'An error occurred while deleting property', type: 'error' });
    //     }
    // };
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
            console.log("Delete record:", record);
            try {
                const response = await dispatch(softDeleteEnquiry(record._id));
                Swal.fire(
                    'Deleted!',
                    'Your record has been deleted.',
                    'success'
                );
            } catch (error) {
                console.log(error);
                Notification({ message: 'An error occurred while deleting the property', type: 'error' });
            }
        }
    };

    // const handleBulkDelete = async () => {
    //     try {
    //         await Promise.all(selectedRowKeys.map(id => dispatch(permenantlyDeleteEnquiry(id))));
    //         setSelectedRowKeys([]);
    //     } catch (error) {
    //         console.log(error);
    //         notification.error({ message: 'An error occurred while deleting selected enquiries' });
    //     }
    // };
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
                // Delete all selected records
                await Promise.all(selectedRowKeys.map(id => dispatch(softDeleteEnquiry(id))));
                setSelectedRowKeys([]);
                Swal.fire(
                    'Deleted!',
                    'Selected enquiries have been deleted.',
                    'success'
                );
            } catch (error) {
                console.log(error);
                Notification({ message: 'An error occurred while deleting selected enquiries', type: 'error' });
            }
        }
    };

    const handleEnroll = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values before removing createdAt:", values);

            // Remove the createdAt field from values
            const { createdAt, ...filteredValues } = values;

            // Combine filteredValues with selectedRecord ID
            const dataToSend = {
                ...filteredValues,
                enquiryId: selectedRecord?._id // Add the ID from the selectedRecord
            };

            console.log("Data to send:", dataToSend);

            // Dispatch createStudents action with combined data
            const res = await dispatch(createStudents({ dataToSend }));

            if (res.status === 200) {
                form.resetFields();
                dispatch(fetchRegistrationsEnquiry());
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
                <title>Print Enquiry Table</title>
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
                <h2>Enquiry Table</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Student Name</th>
                            <th>College Name</th>
                            <th>Educational Degree</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${enquirySelector.map((record, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${record.nameOfTheStudent}</td>
                                <td>${record.collegeName}</td>
                                <td>${record.educationalDegree}</td>
                                <td>${record.email}</td>
                                <td>${record.phone}</td>
                                <td>${record.createdAt ? moment(record.createdAt).format("DD/MM/YYYY") : "-"}</td>
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
        const worksheet = XLSX.utils.json_to_sheet(filteredData.map((record, index) => ({
            Index: index + 1,
            StudentName: record.nameOfTheStudent,
            CollegeName: record.collegeName,
            EducationalDegree: record.educationalDegree,
            Email: record.email,
            Phone: record.phone,
            Date: record.createdAt ? moment(record.createdAt).format("DD/MM/YYYY") : "-"
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
        XLSX.writeFile(workbook, "EnquiryTable.xlsx");
    };

    const columns = [
        {
            title: "Index",
            key: "index",
            render: (text, record, index) => index + 1,
            sorter: (a, b) => a.index - b.index,
            align: 'left'
        },
        {
            title: "Student Name",
            dataIndex: "nameOfTheStudent",
            key: "nameOfTheStudent",
            sorter: (a, b) => a.nameOfTheStudent.localeCompare(b.nameOfTheStudent),
            align: 'left'

        },
        {
            title: "College Name",
            dataIndex: "collegeName",
            key: "collegeName",
            sorter: (a, b) => a.collegeName.localeCompare(b.collegeName),
            align: 'left'

        },
        {
            title: "Educational Degree",
            dataIndex: "educationalDegree",
            key: "educationalDegree",
            sorter: (a, b) => a.educationalDegree.localeCompare(b.educationalDegree),
            align: 'left'

        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
            align: 'left'

        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            sorter: (a, b) => a.phone.localeCompare(b.phone),
            align: 'left'

        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            // render: (date) => new Date(date)?.toLocaleDateString("en-gb")
            // render: (date) => date ? moment(date).format("DD/MM/YYYY") : "-"
            render: (text) => moment(text).format("DD/MM/YYYY"),
            sorter: (a, b) => moment(a.createdAt).diff(moment(b.createdAt)),
            align: 'left'

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

    // const filteredData = enquirySelector?.filter((record) =>
    //     Object.values(record).some((value) =>
    //         value.toString().toLowerCase().includes(searchText.toLowerCase())
    //     )
    // );
    const filteredData = enquirySelector?.filter((record) =>
    Object.values(record).some((value) =>
        value !== null && value !== undefined && value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
);

    const printContent = () => {
        if (!selectedRecord) return;

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
                    .print-container {
                        padding: 10px;
                        border: 1px solid #000;
                    }
                    .print-container p {
                        margin: 10px 0;
                    }
                    .print-container h2 {
                        border-bottom: 1px solid #000;
                        padding-bottom: 5px;
                    }
                    .print-container strong {
                        width: 250px;
                        display: inline-block;
                    }
                </style>
            </head>
            <body>
                <div class="print-container">
                    <h2>Student Details</h2>
                    <p><strong>Enquiry Date:</strong> ${selectedRecord.createdAt ? moment(selectedRecord.createdAt).format("DD/MM/YYYY") : "-"}</p>
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
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
    };
    return (
        <>
            <section className="tp-support-breadcrumb fix pt-60 pb-210">
                <div className="container-fluid px-5">
                    <Card
                        title="List of Registration Enquiries"
                        style={{ overflowX: 'auto' }}
                        className="antdCard"
                    >
                        <div className="cardfirstDiv">
                            <Input
                                placeholder="Search..."
                                onChange={handleSearch}
                                style={{ width: '100%', maxWidth: 240, margin: 5, height: '41px' }}
                            />
                            <Button
                                type="default"
                                icon={<PrinterOutlined />}
                                onClick={printTable}
                                className="tableButtons"
                                size='large'
                                style={{ margin: 5 }}
                            >
                                Print
                            </Button>
                            <Button
                                type="default"
                                icon={<ExportOutlined />}
                                onClick={exportToExcel}
                                className="tableButtons"
                                size='large'
                                style={{ margin: 5 }}
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
                                style={{ margin: 5 }}
                            >
                                Delete Selected
                            </Button>
                            <Button
                                type="default"
                                icon={<RestOutlined  />}
                                // onClick={handleBulkDelete}
                                className="tableButtons"
                                size='large'
                                style={{ margin:5 }}
                                onClick={() => setShowDeletedEnquiry(true)}
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
                </div >
            </section >

            {selectedRecord && (
                <Modal
                    title="Student Details"
                    open={isViewModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="print" onClick={printContent}>
                            Print
                        </Button>,
                        <Button key="cancel" onClick={handleCancel}>
                            Close
                        </Button>
                    ]}
                >
                    <p><strong>Enquiry Date:</strong> {selectedRecord.createdAt ? moment(selectedRecord.createdAt).format("DD/MM/YYYY") : "-"}</p>
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
                </Modal>
            )
            }

            {
                selectedRecord && (
                    <Modal
                        title="Student Details"
                        open={isEditModalVisible}
                        onCancel={handleCancel}
                        width={window.innerWidth < 768 ? '90%' : '80%'}
                        footer={[
                            <Button key="cancel" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="enroll" type="primary" onClick={handleEnroll}>
                                Enroll
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
                            <Form.Item name="createdAt" label="Enquiry Date">
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
                )
            }
        </>
    )
}
export default EnquiryTable;
