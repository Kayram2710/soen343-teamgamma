import React, { useState } from 'react';
import axios from 'axios';
import './HouseLayout.css';


const LayoutParser = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [layoutHtml, setLayoutHtml] = useState('');
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        try {
            const fileReader = new FileReader();
            fileReader.onload = async (event) => {
                const jsonData = JSON.parse(event.target.result);
                await parseLayout(jsonData);//called here
            };
            fileReader.readAsText(selectedFile);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    //function here
    const parseLayout = async (jsonData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/Layout/parse-layout', jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Layout parsed successfully:', response.data);

            setParam({
                exist: true,
                json: jsonData,
            });

            console.log(successfullCreation.exist);

            setLayoutHtml(response.data);
        } catch (error) {
            console.error('Error parsing layout:', error);
        }
    };

    return (
        <div id="houseViewCtn" className="flex justify-center align-center">
            <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                <div id="loadHouseCtn" style={{ textAlign: 'center' }}>
                    <button id="loadHouseBtn" onClick={handleFileUpload}>Upload File</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <input type="file" onChange={handleFileChange} />

                </div>

                <div style={{ position: 'relative', height: '100%', width: '100%' }} dangerouslySetInnerHTML={{ __html: layoutHtml }} />
            </div>
        </div>
    );
};

export default LayoutParser;