import React, {useCallback, useState} from 'react';
import {Document, Page} from 'react-pdf';
import axios from 'axios';
import path from 'path';
import output1 from '/Users/saadiqbal/myProjects/resumeAnalyzer/backend/output1.png';

import './App.css';

function App() {
  const [file, setFile] = useState();
  const [isFilePicked, setisFilePicked] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [reqProc, setreqProc] = useState(false);

  const [textareaVal, setTextareaVal] = useState('');
  const [jobDesc, setjobDesc] = useState('');

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
    setTextareaVal(e.target.value);
  };

  const handleTextAreaSubmit = e => {
    e.preventDefault();
    const txt = textareaVal;
    jobdescSubmit(txt);
  };

  const jobdescSubmit = async jobDesc => {
    if (jobDesc == '') return;
    console.log('post reached');
    const response = await fetch('http://localhost:4000/uploadJobDesc', {
      method: 'POST',
      body: jobDesc,
    })
      .catch(e => {
        console.log(e);
      })
      .then(setjobDesc(jobDesc));
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

          {isSubmit ? <p>File Submitted. Now Loading...</p> : <p>Choose File</p>}
          {reqProc ? <img src={output1} className="customImg" /> : <p> </p>}
        </div>
        <div className="mx-5">
          <p className="mb-10 font-bold"> Enter your desired job decription here: </p>
          {/* <div className="">
          
            <textarea rows={10} cols={60} color="black">
              Enter job description here...
            </textarea>
          </div> */}
          <div class="w-93 p-2 bg-gray-600">
            <form>
              <div class="mb-6 text-black">
                <textarea
                  id="textarea"
                  name="textarea"
                  rows="12"
                  class="w-full py-2 px-3 border border-gray-300"
                  onChange={handleTextAreaChange}
                  placeholder="Enter your job description..."></textarea>
              </div>

              <div class="mb-2">
                <button
                  type="submit"
                  class="bg-gray-800 text-white py-2 px-4  hover:bg-gray-700 focus:bg-gray-700"
                  onSubmit={handleTextAreaSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
