import logo from "../../assets/Logo.svg";
import { Button } from "../button/Button";
import "../../styles/_globals.scss";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="nav container">
      <img src={logo} alt="test logo" />
      <div className="button-container">
        <Button
          type="button"
          text="Users"
          onClick={() => {
            console.log("to Users");
          }}
        />
        <Button
          type="button"
          text="Sign up"
          onClick={() => {
            console.log("To Sign Up form");
          }}
        />
      </div>
    </div>
  );
};
