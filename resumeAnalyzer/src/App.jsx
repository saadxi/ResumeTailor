import React, {useCallback, useState} from 'react';
import {Document, Page} from 'react-pdf';
import axios from 'axios';
import path from 'path';
import output1 from '/Users/saadiqbal/myProjects/resumeAnalyzer/backend/output1.png';
import DataDashboard from './Components/DataDashboard';

import './App.css';

function App() {
  const [file, setFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [reqProc, setreqProc] = useState(false);
  const [jobText, setjobText] = useState('');
  const [submitjobText, setsubmitjobText] = useState(false);
  // for UI elements

  const [loadingState, setloadingState] = useState(false);
  const [responseState, setresponseState] = useState(false);

  const changeHandler = event => {
    setFile(event.target.files[0]);
    // console.log(event.target.files);
    setisFilePicked(true);
  };

  const handleSubmit = async () => {
    if (!isFilePicked) return;
    const formData = new FormData();
    formData.append('pdfFile', file);

    const response = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
    })
      .catch(e => {
        console.log(e);
      })
      .then(setisSubmit(true));

    handleRequest();
  };

  const handleRequest = async () => {
    const request = await fetch('http://localhost:4000/preview', {
      method: 'GET',
    })
      .catch(e => {
        console.log(e);
      })
      .then(setreqProc(true));
  };

  const handleTextAreaChange = e => {
    setjobText(e.target.value);
    // console.log(textareaVal);
  };

  const handleTextAreaSubmit = e => {
    e.preventDefault();
    console.log(jobText);

    jobdescSubmit(jobText);
  };
  // const handleTextAreaSubmit = event => {
  //   // event.preventDefault();
  //   console.log(textareaVal);
  //   // jobdescSubmit(textareaVal);
  // };

  const requestData = async () => {
    setloadingState(true);
    const response = await fetch('http://localhost4000/data', {
      method: 'GET',
    })
      .catch(error => {
        console.error(error);
      })
      .then(() => {
        setloadingState(false);
        setresponseState(true);
      });

    return requestData;
  };

  const jobdescSubmit = async jobDesc => {
    if (jobDesc == '') return;
    console.log('post reached');
    const response = await fetch('http://localhost:4000/uploadJobDesc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job_description: jobDesc,
      }),
    })
      .catch(e => {
        console.error('error sending job desc', e);
      })
      .then(() => {
        setsubmitjobText(true);
      });
    if (isSubmit) {
      requestData();
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold my-8">Resume Analyzer</h1>

      <div className="grid grid-cols-2 gap-10">
        <div className="mx-5">
          <div className="mb-10">
            <p className="font-bold">Upload your Resume Below</p>
          </div>

          <input type="file" name="resumeFile" onChange={changeHandler} accept=".pdf" />
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>

          {isSubmit ? <p>File Submitted </p> : <p>Choose File</p>}
          {reqProc ? <img src={output1} className="customImg" /> : <p> </p>}
        </div>

        <div className="mx-5">
          <p className="mb-10 font-bold"> Enter your desired job decription here: </p>

          <textarea
            id="textarea"
            name="textarea"
            rows="12"
            // class="w-full py-2 px-3 border border-gray-300"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleTextAreaChange}
            placeholder="Enter your job description..."></textarea>

          <div>
            <button onClick={handleTextAreaSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
