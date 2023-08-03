import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import "./owl.css";

export class OwlDemo extends Component {
  render() {
    return (
      <div>
        <div class="container-fluid">
          <OwlCarousel items={3} margin={8} autoplay={true}>
            <div>
              <img className="img" src="https://i.imgur.com/vcvHhNm.png" />
            </div>
            <div>
              <img className="img" src="https://i.imgur.com/nfmqrYg.png" />
            </div>
            <div>
              <img className="img" src="https://i.imgur.com/HtxCd7i.png" />
            </div>
            <div>
              <img className="img" src="https://i.imgur.com/CFGzSvf.png" />
            </div>
            <div>
              <img className="img" src="https://i.imgur.com/WWfR7bW.png" />
            </div>
            <div>
              <img className="img" src="https://i.imgur.com/SPgAujN.png" />
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}

export default OwlDemo;
