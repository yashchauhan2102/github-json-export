import axios from "axios";
import { useState } from "react";

export const ImportPage = () => {
  const [jsonContent, setJsonContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleDownload = async () => {
    const owner = process.env.REACT_APP_GITHUB_OWNER; // GitHub username
    const repo = process.env.REACT_APP_GITHUB_REPO_NAME; // GitHub repository name
    const path = process.env.REACT_APP_GITHUB_PATH; // File path in the repo (e.g., `folder/filename.json`)
    const githubToken = process.env.REACT_APP_GITHUB_PRIVATE_TOKEN; // Replace with your token

    if (!fileName) {
      alert("Please provide filename to download");
      return;
    }

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}/${fileName}`;

    const config = {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    };

    try {
      const response = await axios.get(githubUrl, config);
      const fileData = response.data.content; // Get Base64 encoded content
      const decodedContent = atob(fileData); // Decode Base64

      // Set the decoded content to the jsonContent state to display in textarea
      setJsonContent(decodedContent);
    } catch (error) {
      console.error(error);
      alert("Error downloading file");
    }
  };

  return (
    <div className="App">
      <h1>Show JSON from GitHub Repo</h1>

      <input
        type="text"
        placeholder="Enter filename"
        value={fileName}
        onChange={handleFileNameChange}
      />

      <button onClick={handleDownload}>Fetch JSON from GitHub</button>

      <textarea
        rows="10"
        cols="50"
        placeholder="Fetched JSON content will appear here"
        value={jsonContent}
        readOnly
      />
    </div>
  );
};
