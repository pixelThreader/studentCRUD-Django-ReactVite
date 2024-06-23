import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "./components/LoadingBar";

// Necessary Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
// Routing as per sidebar
import AddStudent from "./pages/AddStudent";
import Home from "./pages/Home";
import Search from "./pages/Search";
import StudentList from "./pages/StudentList";

export default function App() {

    return (
        <Router>
            <div className="h-screen w-full flex flex-col p-2">
                <LoadingBar />
                <Header className="flex-shrink-0 mb-2" />
                <div className="flex flex-1 overflow-hidden my-2">
                    <Sidebar className="flex-shrink-0 w-32 me-2" />
                    <main className="flex-1 ms-2 p-4 h-full header-s-dbms rounded-md overflow-hidden">
                        <div className="container h-full overflow-y-auto scrollbar">
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route path="/add-student" element={<AddStudent />} />
                                <Route path="/list" element={<StudentList />} />
                                <Route path="/search" element={<Search />} />
                            </Routes>
                        </div>
                    </main>
                </div>
                <Footer className="flex-shrink-0 mt-2" />
            </div>
        </Router>
    );
}
