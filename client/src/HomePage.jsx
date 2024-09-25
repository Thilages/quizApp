import axios from "axios";
import React, { useState } from "react";
import { FiFile } from "react-icons/fi";

const HomePage = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    console.log(e);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedFile = document.getElementById("file-upload").files[0]
    console.log(selectedFile)
    const formData = new FormData();
    formData.append("file", selectedFile); // Ensure 'file' matches the key used in Flask

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#2D3748] flex justify-center items-center text-center">
      <div className="w-[50%] flex flex-col items-center py-10">
        <h1 className="text-2xl text-[#ECC94B] font-bold">Welcome!</h1>
        <h2 className="text-4xl font-semibold text-white mt-4">
          Upload a File
        </h2>
        <p className="text-gray-400 mt-2">
          Please upload a PDF file to start creating your quiz.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-center mt-6"
        >
          <label
            htmlFor="file-upload"
            className="h-[150px] sm:h-[200px] w-[350px] mx-auto border-4 mt-4 rounded-lg border-dashed border-[#ECC94B] flex flex-col justify-center items-center cursor-pointer bg-[#EDF2F7] hover:bg-[#E2E8F0] transition duration-200"
            onDrop={handleDrag}
            onDragOver={handleDragOver}
          >
            <FiFile className="text-5xl text-gray-500 mb-2" /> {/* File icon */}
            {fileName ? (
              <span className="text-gray-600 text-lg">{fileName}</span>
            ) : (
              <>
                <span className="text-gray-500 mx-5">
                  Drag and drop to upload your file
                </span>
                <span className="text-sm text-gray-400">
                  or click here to select a file
                </span>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-[#48BB78] text-white font-semibold rounded-lg shadow-lg hover:bg-[#38A169] transition duration-300"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
