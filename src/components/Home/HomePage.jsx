import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <button type="button" onClick={() => navigate("/export")}>
          Export Page
        </button>
      </div>
      <div>
        <button type="button" onClick={() => navigate("/import")}>
          Import Page
        </button>
      </div>
    </div>
  );
};
