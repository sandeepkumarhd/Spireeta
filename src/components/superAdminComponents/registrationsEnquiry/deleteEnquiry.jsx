import React, { useEffect, useState } from "react";
import { Table, Button, Input, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeletedEnquiry, fetchRegistrationsEnquiry, permenantlyDeleteEnquiry, restoreEnquiry } from "@/src/store/AllSlices/enquiry.slice";
import { DeleteOutlined, DeleteFilled, ArrowLeftOutlined, UndoOutlined } from '@ant-design/icons';
import moment from 'moment';
import Notification from "@/src/common/Notification";
import Swal from 'sweetalert2';

const DeleteEnquiry = ({ setShowDeletedEnquiry }) => {
    const dispatch = useDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState("");

    const deletedEnquirySelector = useSelector((state) => state.enquiryReducer.deletedEnquiry);
    console.log("deletedEnquirySelector", deletedEnquirySelector)

    useEffect(() => {
        dispatch(fetchDeletedEnquiry())
        dispatch(fetchRegistrationsEnquiry());
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
            console.log("Delete record:", record);
            try {
                const response = await dispatch(permenantlyDeleteEnquiry(record._id));
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
                await Promise.all(selectedRowKeys.map(id => dispatch(permenantlyDeleteEnquiry(id))));
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

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = deletedEnquirySelector?.filter((record) =>
        Object.values(record).some((value) =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleBack = () => {
        setShowDeletedEnquiry(false)
    }

    const handleRestore = async (record) => {
        try {
            await dispatch(restoreEnquiry(record._id));
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
                        icon={<UndoOutlined  />}
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
                        title="Registrations Enquiry"
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
                                icon={<ArrowLeftOutlined  />}
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
                </div >
            </section >
        </>
    )
}
export default DeleteEnquiry;
