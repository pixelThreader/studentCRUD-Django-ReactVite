import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";

export default function App() {
    return (
        <div className="h-screen w-full p-2">
            <div className="h-full w-full overflow-hidden rounded-md">
                <Header />
                <h1 className="text-3xl font-bold underline text-lime-400">
                    Hello world!
                </h1>
                <main className="container flex">
                    <Sidebar />
                </main>

                <hr />
                <Footer />
            </div>
        </div>
    )
}