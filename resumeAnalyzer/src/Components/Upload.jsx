function Upload() {
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
  </div>;
}

export default Upload;
