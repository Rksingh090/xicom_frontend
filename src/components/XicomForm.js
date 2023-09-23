import React, { useState } from 'react'

import { API } from '../constant';
import axios from 'axios';

import DocumentUpload from './DocumentUpload';

const XicomForm = () => {


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        residential_address: {
            street_1: "",
            street_2: ""
        },
        same_addresses: false,
        permanent_address: {
            street_1: "",
            street_2: ""
        },
        files: [
            {
                file_name: "",
                file_type: "",
                file_url: ""
            }
        ],
        files_array: [""]
    })

    const onFormSubmit = (e) => {
        e.preventDefault();

        const currentData = new Date();
        const dobDate = new Date(formData.dob);

        const diffInMilliseconds = currentData - dobDate;
        const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
        const diffInYears = diffInMilliseconds / millisecondsPerYear;


        if (diffInYears < 18) {
            alert("You must be 18 years old.")
            return;
        }

    
        let rowFormData = new FormData()
        rowFormData.append("first_name", formData.first_name)
        rowFormData.append("last_name", formData.last_name)
        rowFormData.append("email", formData.email)
        rowFormData.append("dob", formData.dob)
        rowFormData.append("residential_address[street_1]", formData.residential_address.street_1)
        rowFormData.append("residential_address[street_2]", formData.residential_address.street_2)
        rowFormData.append("same_addresses", formData.same_addresses)
    
        formData.files.forEach((fileItem, idx) => {
            rowFormData.append(`files[${idx}][file_name]`, fileItem.file_name)
            rowFormData.append(`files[${idx}][file_type]`, fileItem.file_type)
            rowFormData.append(`files[${idx}][file_url]`, "")
        })
        
        formData.files_array.forEach((fileItem) => {
            rowFormData.append("files_array", fileItem)
        })
        
        // api call to add the form 
        axios.post(`${API}/register`, rowFormData)
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    alert("Data adedd!")
                }
            })
            .catch((err) => {
                alert(err.response.data?.message)
            })
    }


    // add new files 
    const addMoreFiles = () => {
        setFormData(prev => ({
            ...prev,
            files_array: [...prev.files_array, ""],
            files: [
                ...prev.files,
                {
                    file_name: "",
                    file_type: "",
                    file_url: ""
                }
            ],
        }))
    }

    const deleteDocument = (idx) => {
        const allFiles = formData.files.filter((_, doc_idx) => doc_idx !== idx);
        const allFilesArray = formData.files_array.filter((_, doc_idx) => doc_idx !== idx);

        setFormData(prev => ({
            ...prev,
            files: allFiles,
            files_array: allFilesArray
        }))
    }


    const handleFormInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="xicomFormPage">
            <form onSubmit={onFormSubmit} className='mainForm'>
                <div>
                    <h2>Xicom Technologies (Rishab Singh)</h2>
                </div>
                <div className="gridCol2">
                    <div className="inputGroup">
                        <label className="labelStyling" htmlFor="first_name">First Name<span className='requiredMarker'>*</span></label>
                        <input
                            value={formData.first_name}
                            onChange={handleFormInput}
                            type="text" name='first_name' id='first_name' className="formInput" placeholder='Enter your first name here...'
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label className="labelStyling" htmlFor="last_name">Last Name<span className='requiredMarker'>*</span></label>
                        <input
                            value={formData.last_name}
                            onChange={handleFormInput}
                            type="text" className="formInput" name='last_name' id='last_name' placeholder='Enter your last name here...'
                            required
                        />
                    </div>
                </div>
                <div className="gridCol2">
                    <div className="inputGroup">
                        <label className="labelStyling" htmlFor="email">Email<span className='requiredMarker'>*</span></label>
                        <input
                            value={formData.email}
                            onChange={handleFormInput}
                            type="email"
                            name='email' id='email' className="formInput" placeholder='ex:myname2example.com'
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label className="labelStyling" htmlFor="dob">Date of Birth<span className='requiredMarker'>*</span></label>
                        <input
                            value={formData.dob}
                            onChange={handleFormInput}
                            type="date" className="formInput"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            name='dob' id='dob' placeholder='Date of Birth' />
                        <span className="infoText">(Min. age should be greater than 18years.)</span>
                    </div>
                </div>

                {/* residential address  */}
                <div className='residentialAddress'>
                    <h2 className='labelStyling'>Residential Address</h2>
                    <div className="gridCol2">
                        <div className="inputGroup">
                            <label className="secondary_label" htmlFor="street_1">Street 1<span className='requiredMarker'>*</span></label>
                            <input type="text"
                                value={formData.residential_address.street_1}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    residential_address: {
                                        ...prev.residential_address,
                                        street_1: e.target.value
                                    }
                                }))}
                                name='street_1' id='street_1' className="formInput"
                                required
                            />
                        </div>
                        <div className="inputGroup">
                            <label className="secondary_label" htmlFor="street_2">Street 2<span className='requiredMarker'>*</span></label>
                            <input type="text"
                                value={formData.residential_address.street_2}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    residential_address: {
                                        ...prev.residential_address,
                                        street_2: e.target.value
                                    }
                                }))}
                                name='street_2' id='street_2' className="formInput"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='sameAddressCheckBox'>
                    <input
                        value={formData.same_addresses}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            same_addresses: !prev.same_addresses
                        }))}
                        type="checkbox" name="same_addresses" id="same_addresses" />
                    <label htmlFor="same_addresses">Same as Residential Address</label>
                </div>

                {/* permanent address  */}
                <div className='residentialAddress'>
                    <h2 className='labelStyling'>Permanent Address</h2>
                    <div className="gridCol2">
                        <div className="inputGroup">
                            <label className="secondary_label" htmlFor="p_street_1">Street 1</label>
                            <input
                                value={formData.permanent_address.street_1}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    permanent_address: {
                                        ...prev.permanent_address,
                                        street_1: e.target.value
                                    }
                                }))}
                                type="text" name='street_1' id='p_street_1' className="formInput"

                                required={!formData.same_addresses}
                            />
                        </div>
                        <div className="inputGroup">
                            <label className="secondary_label" htmlFor="p_street_2">Street 2</label>
                            <input type="text"
                                value={formData.permanent_address.street_2}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    permanent_address: {
                                        ...prev.permanent_address,
                                        street_2: e.target.value
                                    }
                                }))}
                                name='street_2' id='p_street_2' className="formInput"
                                required={!formData.same_addresses}
                            />
                        </div>
                    </div>
                </div>

                {/* DOCUMENT UPLOAD AREA  */}
                <div className="documentsUpload">
                    <h2 className="labelStyling">Documents Upload</h2>

                    {
                        formData.files &&
                        formData.files.length > 0 &&
                        formData.files.map((file, idx) => {
                            return (
                                <DocumentUpload
                                    onChangeFile={setFormData}
                                    key={idx}
                                    file={file}
                                    id={idx}
                                    onAddMore={addMoreFiles}
                                    onDelete={() => deleteDocument(idx)}
                                    allFiles={formData.files}
                                    filesArray={formData.files_array}
                                />

                            )
                        })
                    }
                </div>

                <div className='formSubmitBtn'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}



export default XicomForm
