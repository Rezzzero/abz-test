import { useEffect, useState } from "react";
import "./App.scss";
import { IntroSection } from "./components/intro-section/IntroSection";
import { UserList } from "./components/list/UserList";
import { Navbar } from "./components/navigation/Navbar";
import axios from "axios";
import { RegForm } from "./components/form/RegForm";

function App() {
  const [token, setToken] = useState<string>("");

  const initialToken = async () => {
    try {
      const { data } = await axios.post(
        "https://frontend-test-assignment-api.abz.agency/api/v1/token"
      );

      const expires = Date.now() + 40 * 60 * 1000;
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenExpires", expires.toString());
      setToken(data.token);
    } catch {
      console.log("error getting token");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedExpires = localStorage.getItem("tokenExpires");

    if (!savedToken || !savedExpires || Date.now() > Number(savedExpires)) {
      initialToken();
    } else {
      setToken(savedToken);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="content">
        <IntroSection />
        <UserList token={token} />
        <RegForm />
      </div>
    </>
  );
}

export default App;
