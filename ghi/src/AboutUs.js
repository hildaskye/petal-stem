import React from "react";

import "./App.css";

export default function AboutUsPage({}) {
  return (
    <>
      <div className="p-3 mb-2 bg-light-subtle text-emphasis-light background-image: var(--bs-gradient);">
        {/* .bg-light-subtle */}
      </div>

      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Petal & Stem</h1>
      </div>

      <div className="px-2 py-3 my-3 text-center">
        <h3 className="display-5 bold">About the Creators</h3>
      </div>

      {/* Grid for cards */}
      <div className="row row-cols-1 row-cols-md-2" style={{ margin: 20 }}>
        {/* <div className="offset-3 col-6"></div> */}
        {/* <div className="shadow p-4 mt-4"></div> */}

        <div className="card shadow p-4 mt-4" style={{ width: 250 }}>
          <img src="https://i.imgur.com/86kWUlk.jpg" className="card-img-top" />
          <div className="card-body">
            <p className="card-text">
              Melinda Tran resides in the Bay Area, enjoys spending time with
              her husband, Jimmy, and little pupper, Peanut, and is a
              self-certified foodie.
            </p>
          </div>
        </div>

        <div className="card shadow p-4 mt-4" style={{ width: 250 }}>
          <img src="https://i.imgur.com/xxWfcyV.png" className="card-img-top" />
          <div className="card-body">
            <p className="card-text">
              Cindy Lam lives in Southern California, loves the color pink, is
              deemed the CSS queen, and has a little 12-year-old yorkie named
              "Princess."
            </p>
          </div>
        </div>

        <div className="card shadow p-4 mt-4" style={{ width: 250 }}>
          <img src="https://i.imgur.com/d4qlXGp.png" className="card-img-top" />
          <div className="card-body">
            <p className="card-text">
              Dylan Winn, originally hailing from Nashville, TN, currently
              resides in Colorado with her wife, Angel, and enjoys spending time
              with her 15-year-old Pomeranian Chihuahua, Skunk.
            </p>
          </div>
        </div>

        <div className="card shadow p-4 mt-4" style={{ width: 250 }}>
          <img src="https://i.imgur.com/bE0Y1k5.png" className="card-img-top" />
          <div className="card-body">
            <p className="card-text">
              David Sanchez, the social butterfly, born and raised in San Jose,
              CA, appreciates a good cigar and a smooth bourbon, relishes
              nature, hiking, and traveling.
            </p>
          </div>
        </div>

        <div className="card shadow p-4 mt-4" style={{ width: 250 }}>
          <img src="https://i.imgur.com/ao2QrTb.png" className="card-img-top" />
          <div className="card-body">
            <p className="card-text">
              Alan Cheng, a jack of all trades and US Navy reservist, currently
              lives in San Mateo, CA, is trilingual, and enjoys exploring new
              areas and activities.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
