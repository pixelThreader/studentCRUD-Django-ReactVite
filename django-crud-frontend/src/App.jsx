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
import Profile from "./pages/Profile";

export default function App() {

    // let base_url = 'http://localhost:8000';
    let base_url = 'https://f451-157-35-78-113.ngrok-free.app';
    // let base_url = 'http://192.168.43.99:8000';

    return (
        <Router>
            <div className="h-screen xl:container max-w-full mx-auto flex flex-col p-2">
                <LoadingBar />
                <Header className="flex-shrink-0 mb-2" />
                <div className="flex flex-1 overflow-hidden my-2 gap-2">

                    <main className="flex-1 p-4 h-full header-s-dbms rounded-md overflow-hidden">
                        <div className="container h-full overflow-y-auto scrollbar">
                            <Routes>
                                <Route path="/" element={<Home url={base_url} />} />
                                <Route path="/:user" element={<Profile url={base_url} />} />
                                <Route path="/add-student" element={<AddStudent url={base_url} />} />
                                <Route path="/list" element={<StudentList url={base_url} />} />
                                <Route path="/search" element={<Search url={base_url} />} />
                            </Routes>
                        </div>
                    </main>

                    <Sidebar className="flex-shrink-0 w-32" />
                </div>
                <Footer className="flex-shrink-0 mt-2" />
            </div>
        </Router>
    );
}
