import React, { useState } from "react";
import axios from "axios";

export const ExportPage = () => {
  const [jsonContent, setJsonContent] = useState("");

  const handleJsonChange = (e) => {
    setJsonContent(e.target.value);
  };

  const handleSubmit = async () => {
    const owner = process.env.REACT_APP_GITHUB_OWNER; // GitHub username
    const repo = process.env.REACT_APP_GITHUB_REPO_NAME; // GitHub repository name
    const path = process.env.REACT_APP_GITHUB_PATH; // File path in the repo (e.g., `folder/filename.json`)
    const timestamp = new Date()
      .toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/[\/,]/g, "_")
      .replace(/\s/g, "")
      .replace(/:/g, "-");

    const hardcodedString = "exported-data";
    const generatedFileName = `${hardcodedString}_${timestamp}`;
    const githubToken = process.env.REACT_APP_GITHUB_PRIVATE_TOKEN; // Replace with your token

    if (!jsonContent) {
      alert("Please provide Json data");
      return;
    }

    const contentBase64 = btoa(jsonContent); // Convert JSON to Base64
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}/${generatedFileName}.json`;

    const config = {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    };

    const data = {
      message: `Create ${generatedFileName}.json`,
      content: contentBase64,
    };

    try {
      const response = await axios.put(githubUrl, data, config);
      alert("File created successfully");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Error creating file");
    }
  };

  return (
    <div className="App">
      <h1>Export JSON to GitHub Repo</h1>

      <textarea
        rows="10"
        cols="50"
        placeholder="Enter your JSON content here"
        onChange={handleJsonChange}
      />
      <button onClick={handleSubmit}>Upload JSON to GitHub</button>
    </div>
  );
};
