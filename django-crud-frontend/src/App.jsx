// Update App component
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
import List from "./pages/List";
import Search from "./pages/Search";

export default function App() {
    return (
        <Router>
            <div className="h-screen w-full p-2">
                <LoadingBar />
                <div className="h-full w-full overflow-hidden rounded-md">
                    <Header />
                    <h1 className="text-3xl font-bold underline text-lime-400">
                        Hello world!
                    </h1>
                    <main className="container flex">
                        <Sidebar />
                        <section className="Route_view flex-grow overflow-y-auto overflow-hidden">
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route path="/add-student" element={<AddStudent />} />
                                <Route path="/list" element={<List />} />
                                <Route path="/search" element={<Search />} />
                            </Routes>
                        </section>
                    </main>
                    <hr />
                    <Footer />
                </div>
            </div>
        </Router>
    );
}
