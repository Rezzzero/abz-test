import { Button } from "../button/Button";
import image from "../../assets/pexels-alexandr-podvalny-1227513.jpeg";

import "./IntroSection.scss";
export const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="intro-section__inner">
        <img src={image} alt="" className="intro-section__inner-bg" />

        <div className="intro-section__info">
          <h1 className="intro-section__info-title">
            Test assignment for front-end developer
          </h1>
          <p className="intro-section__info-description">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
        </div>
        <div className="intro-section__actions">
          <Button
            text="Sign up"
            type="button"
            onClick={() => console.log("To Sign Up form")}
          />
        </div>
      </div>
    </section>
  );
};
