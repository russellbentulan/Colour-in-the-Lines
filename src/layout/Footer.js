import React from "react";

function Footer() {
  return (
    <footer className="FooterComponent">
      <div className="wrapper FooterComponent__container flexGrid">
        <div className="col-1-of-3">
          <p>
            Colour Palettes from{" "}
            <a href="https://www.colourlovers.com/">COLOURLovers</a>
          </p>
        </div>

        <div className="col-1-of-3">
          <p>
            Text Analytics by{" "}
            <a href="https://azure.microsoft.com/en-ca/services/cognitive-services/text-analytics/">
              Microsoft Azure
            </a>
          </p>
        </div>

        <div className="col-1-of-3">
          Created by <a href="http://russellbentulan.com">Russell Bentulan 2019</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
