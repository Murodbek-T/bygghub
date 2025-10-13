// src/routes/AppRoutes.js
import { Routes, Route } from "react-router-dom";
import Hem from "../Pages/Hem";
import OmOss from "../Pages/Om_oss";
import Contacts from "../Pages/Contacts";
import Blog from "../Pages/Blog";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import About from "../Pages/About";
import Faq from "../Pages/Faq";
import ArticlePage from "../Pages/ArticlePage";

import Admin from "../Pages/Admin";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Hem />} />
            <Route path="/om_oss" element={<OmOss />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/admin" element={<Admin />}/>





        </Routes>
    );
}
