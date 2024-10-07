import React from 'react';
import {Route, Routes} from "react-router-dom";
import {TodoLists} from "../features/todolists/ui/todolists/TodoLists";
import {About} from "../features/todolists/ui/about/About";

export const PATH = {
    LISTS: "/lists",
    ABOUT: "/about",
}

export const Main = () => {
    return (
        <Routes>
            <Route path={"/"} element={<TodoLists />} />
            <Route path={PATH.LISTS} element={<TodoLists />} />
            <Route path={PATH.ABOUT} element={<About />} />
        </Routes>
    );
};

