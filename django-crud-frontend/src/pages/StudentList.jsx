import React, { useEffect, useState } from 'react';
import StudentCard from '../components/StudentCard'
import axios from "axios";
import '../assets/css/Pagination.css';

function StudentList(props) {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalStudents, setTotalStudents] = useState(0);
    const pageSize = 50;

    const fetchStudents = async (page) => {
        try {
            const response = await axios.get(`${props.url}/get-students/?page=${page}`);
            setStudents(response.data.results);
            console.log(props.url, response.data.results);
            setTotalPages(Math.ceil(response.data.count / pageSize));
            setTotalStudents(response.data.count);
        } catch (error) {
            console.error('Error fetching students:', error);
            $('#contentwa').text(error)
        }
    };

    useEffect(() => {
        fetchStudents(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const ellipsis = (
            <li key="ellipsis" className="page-item disabled">
                <a className="page-link" href="#">...</a>
            </li>
        );

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
                    </li>
                );
            }
        } else {
            pageNumbers.push(
                <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                </li>
            );

            if (currentPage > 3) {
                pageNumbers.push(ellipsis);
            }

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
                    </li>
                );
            }

            if (currentPage < totalPages - 2) {
                pageNumbers.push(ellipsis);
            }

            pageNumbers.push(
                <li key={totalPages} className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                </li>
            );
        }

        return (
            <nav className="mt-10">
                <ul className="pagination pag2">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    </li>
                    {pageNumbers}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    };

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = startItem + students.length - 1;

    return (
        <section className="text-gray-400 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Our Students</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
                </div>
                <div className="flex flex-wrap mt-6 sm:space-x-2 sm:space-y-0 space-y-2 mb-10">
                    <div className="w-full sm:w-1/4 px-2">
                        <select className="w-full bg-gray-800 bg-opacity-60 rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                            <option>Class</option>
                            {/* {props.classes.map(c => <option key={c}>{c}</option>)} */}
                        </select>
                    </div>
                    <div className="w-full sm:w-1/4 px-2">
                        <select className="w-full bg-gray-800 bg-opacity-60 rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                            <option>Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="w-full sm:w-1/6 px-2">
                        <button className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">Search</button>
                    </div>
                </div>
                <div className="flex flex-wrap -m-2" id='contentwa'>
                    {students.map((student) => (
                        <StudentCard key={student.sno}  {...student} />
                    ))}
                </div>
                <div className="container flex items-center justify-center">
                    {renderPagination()}
                </div>
                <div className="mt-3">
                    Showing {startItem}-{endItem} out of {totalStudents} instances
                </div>
            </div>
        </section>
    );
}

export default StudentList;
