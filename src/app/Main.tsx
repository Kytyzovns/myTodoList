import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Lists} from "../features/todolists/ui/todolists/Lists";
import {About} from "../About";

export const PATH = {
    LISTS: "/lists",
    ABOUT: "/about",
}

export const Main = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Lists />} />
            <Route path={PATH.LISTS} element={<Lists />} />
            <Route path={PATH.ABOUT} element={<About />} />
        </Routes>
    );
};

