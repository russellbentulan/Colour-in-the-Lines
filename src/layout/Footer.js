import React from "react";

function Footer() {
  return (
    <footer className="FooterComponent">
      <div className="wrapper FooterComponent__container flexGrid">
        <div className="col-1-of-2">
          <ul className="FooterCredits__list">
            <li className="FooterCredits__item">
              <p>
                Colour Palettes from{" "}
                <a href="https://www.colourlovers.com/">COLOURLovers</a>
              </p>
            </li>
            <li className="FooterCredits__item">
              <p>
                Text Analytics by{" "}
                <a href="https://azure.microsoft.com/en-ca/services/cognitive-services/text-analytics/">
                  Microsoft Azure
                </a>
              </p>
            </li>
          </ul>
        </div>

        <div className="col-1-of-2">
          <p className="FooterComponent__personalInfo">
            Created by{" "}
            <a href="http://russellbentulan.com">Russell Bentulan 2019</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
