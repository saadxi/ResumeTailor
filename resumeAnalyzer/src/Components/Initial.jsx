function Initial() {
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
  </div>;
}

export default Initial;
