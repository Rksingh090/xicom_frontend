import React, { useRef } from 'react'


import { FaPlus } from 'react-icons/fa';
import { BsUpload } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';

const DocumentUpload = ({ file, allFiles, filesArray, onChangeFile, id, onAddMore, onDelete }) => {
    const docRef = useRef(null);

    const handleChangeFile = (e) => {
        const { name, value } = e.target;
        const fileData = allFiles;
        fileData[id][name] = value;
        if (name === "file_type") {
            fileData[id].file_url = "";
        }
        onChangeFile(prev => ({
            ...prev,
            files: fileData
        }))
    }

    const uploadFile = (e) => {
        const files = e.target.files;
        if (!files || files.length <= 0) return;
        const { type } = files[0];

        const allowedTypes = {
            pdf: ['application/pdf'],
            image: ['image/jpeg', 'image/png', 'image/gif']
        };

        if (file.file_type === "") {
            alert("Please select file type first.")
            return;
        }
        else if (file.file_type === "pdf") {
            let isallowed = allowedTypes.pdf.includes(type)
            if (!isallowed) {
                alert("Only pdf files is allowed.")
                return;
            }
        }
        else if (file.file_type === "image") {
            let isallowed = allowedTypes.image.includes(type)
            if (!isallowed) {
                alert("Only Image files is allowed.")
                return;
            }
        }

        let files_array = filesArray;
        files_array[id] = files[0];
        onChangeFile(prev => ({
            ...prev,
            files_array
        }))
    }

    return (
        <div className="documentUploadRow">
            <div className="inputGroup">
                <label htmlFor="file_name" className='secondary_label'>File Name <span className="requiredMarker">*</span> </label>
                <input type="text" name="file_name"
                    value={file.file_name}
                    onChange={handleChangeFile}
                    className='formInput' id="file_name" />
            </div>
            <div className="inputGroup">
                <label htmlFor="file_type" className='secondary_label'>Type of File<span className="requiredMarker">*</span> </label>
                <select name="file_type" className='formInput' id="file_type"
                    value={file.file_type}
                    onChange={handleChangeFile}
                >
                    <option value="" disabled>Choose File Type</option>
                    <option value="image">Image</option>
                    <option value="pdf">Pdf</option>
                </select>
                <span className="infoText">(image, pdf.)</span>
            </div>
            <div className="inputGroup">
                <label htmlFor="file_url" className='secondary_label'>Uplolad Document <span className="requiredMarker">*</span> </label>
                <div className='fileInputDiv'
                    onClick={() => docRef.current && docRef.current?.click()}
                >
                    <p>{file?.file_url || ""}</p>
                    <div>
                        <BsUpload size={20} />
                    </div>
                    <input ref={docRef} onChange={uploadFile} type="file" hidden name="file_url" className='formInput' id="file_url" />
                </div>
            </div>
            {
                id === 0 ? (
                    <div className="addMoreFilesBtn" onClick={onAddMore}>
                        <FaPlus size={20} />
                    </div>

                ) : (

                    <div className="deleteThisDoc" onClick={onDelete}>
                        <AiOutlineDelete size={20} />
                    </div>
                )
            }
        </div>
    )
}

export default DocumentUpload