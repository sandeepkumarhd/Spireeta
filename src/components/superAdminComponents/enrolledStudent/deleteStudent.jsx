import { useEffect, useState } from "react";
import { Table, Button, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UndoOutlined, DeleteOutlined, DeleteFilled, ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import Notification from "@/src/common/Notification";
import { fetchDeletedStudent, fetchEnrollStudent, permenantlyDeleteEnrollStudent, restoreStudent } from "@/src/store/AllSlices/enrollStudent.slice";
import Swal from 'sweetalert2';

const DeleteStudentTable = ({ setShowDeleted }) => {
    const dispatch = useDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState("");

    const deleteStudentsSelector = useSelector((state) => state.enrollStudentReducer.deletedStudents);

    useEffect(() => {
        dispatch(fetchDeletedStudent())
        dispatch(fetchEnrollStudent());
    }, [dispatch])

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
            try {
                const response = await dispatch(permenantlyDeleteEnrollStudent(record._id));
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
                await Promise.all(selectedRowKeys.map(id => dispatch(permenantlyDeleteEnrollStudent(id))));
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

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = deleteStudentsSelector?.filter(record =>
        record.nameOfTheStudent.toLowerCase().includes(searchText.toLowerCase()) ||
        record.collegeName.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleBack = () => {
        setShowDeleted(false)
    }

    const handleRestore = async (record) => {
        try {
            await dispatch(restoreStudent(record._id));
        } catch (error) {
            Notification({ message: 'An error occurred while restoring', type: 'error' });
        }
    }

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
                        icon={<UndoOutlined />}
                        onClick={() => handleRestore(record)}
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
                                style={{ width: '100%', maxWidth: 240, marginRight: 16, height: '41px' }}
                            />
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
                                icon={<ArrowLeftOutlined />}
                                className="tableButtons"
                                size='large'
                                onClick={handleBack}
                            >
                                Go Back
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
        </>
    )
}
export default DeleteStudentTable;
