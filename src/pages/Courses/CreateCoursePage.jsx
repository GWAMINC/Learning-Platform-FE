import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './CreateCoursePage.css';
import Select from 'react-select';
import courseService from "../../services/courseService.js";

const CreateCoursePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await courseService.getAllCategories();
                const formattedCategories = categoriesData.categories.map(category => ({
                    value: category.id,
                    label: category.name
                }));
                setCategories(formattedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await courseService.createCourse(title, description, selectedCategories.map(category => category.value), price, currency);
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate('/courses');
            }, 1000);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div className="create-course-page">
            <h2>Create New Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <Select
                        isMulti
                        options={categories}
                        value={selectedCategories}
                        onChange={setSelectedCategories}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Currency</label>
                    <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
                </div>
                <button type="submit">Create Course</button>
            </form>
            {showPopup && (
                <div className="popup">
                    <p>Course created successfully!</p>
                </div>
            )}
        </div>
    );
};

export default CreateCoursePage;