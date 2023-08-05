import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [adsDetail, setAdsDetails] = useState({
    ad_show: true,
    ad_source: "Facebook",
    admob_app_id: "",
    admob_open_app_id: "",
    admob_interstitial_ad_id: "",
    admob_native_ad_id: "",
    admob_banner_ad_id: "",
    fb_app_id: "",
    fb_interstitial_ad_id: "",
    fb_native_ad_id: "",
    fb_banner_ad_id: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;
    if (name === "ad_show") {
      updatedValue = value === "true";
    }
    setAdsDetails((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("SettingsData===>", adsDetail);
  };
  return (
    <div className="settings-container">
      <div className="heading-div">
        <h3 className="featureTitle">
          <b>App Features</b>
        </h3>
        {/* <h3 className="setting-title">Settings</h3> */}
        {/* <button className="save-btn">Save</button> */}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="my-label" htmlFor="adShow">
            Ads Status
          </label>
          <select
            className=" form-control my-1"
            id="adShow"
            name="ad_show"
            onChange={handleInputChange}
            value={adsDetail.ad_show}
          >
            <option value={true}>On</option>
            <option value={false}>Off</option>
          </select>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="adSource">
            Primary Ad Network
          </label>
          <select
            className="form-control my-1"
            id="adSource"
            name="ad_source"
            onChange={handleInputChange}
            value={adsDetail.ad_source}
          >
            <option value="Facebook">Meta Audience Networks</option>
            <option value="AdMob">AdMob</option>
          </select>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="mobApID">
            AdMob App Id
          </label>
          <input
            type="text"
            className="form-control"
            id="mobAppId"
            name="admob_app_id"
            placeholder="ca-app-pub-3940256099942544~3347511713"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="mobOpenId">
            AdMob Open App Id
          </label>
          <input
            type="text"
            className="form-control"
            id="mobOpenId"
            name="admob_open_app_id"
            placeholder="ca-app-pub-3940256099942544/3419835294"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="mobInterstitialId">
            AdMob Interstitial Ad Id
          </label>
          <input
            type="text"
            className="form-control"
            id="mobInterstitialId"
            name="admob_interstitial_ad_id"
            placeholder="ca-app-pub-3940256099942544/3419835294"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="mobNativeId">
            AdMob Native Ad Id
          </label>
          <input
            type="text"
            className="form-control"
            id="mobNativeId"
            name="admob_native_ad_id"
            placeholder="TEST_AD_TYPE#YOUR_PLACEMENT_ID"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="mobBannerId">
            AdMob Banner Ad Id
          </label>
          <input
            type="text"
            className="form-control"
            id="mobBannerId"
            name="admob_banner_ad_id"
            placeholder="ca-app-pub-3940256099942544/3419835294"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="fbAppId">
            Facebook App Id
          </label>
          <input
            type="text"
            className="form-control"
            id="fbAppId"
            name="fb_app_id"
            placeholder="Facebook App Id"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="fbInterstitalId">
            Facebook Interstitial Ad Id
          </label>
          <input
            type="text"
            className="form-control"
            id="fbInterstitialId"
            name="fb_interstitial_ad_id"
            placeholder="TEST_AD_TYPE#YOUR_PLACEMENT_ID"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="fbNativeId">
            Facebook Native Ad Id
          </label>
          <input
            type="text"
            className="form-control"
            id="fbNativeId"
            name="fb_native_ad_id"
            placeholder="TEST_AD_TYPE#YOUR_PLACEMENT_ID"
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label className="my-label" htmlFor="fbBannerId">
            Facebook Banner Ad Id
          </label>
          <input
            type="text"
            className="form-control"
            id="fbBannerid"
            name="fb_banner_ad_id"
            placeholder="TEST_AD_TYPE#YOUR_PLACEMENT_ID"
            onChange={handleInputChange}
            required
          ></input>
        </div>

        <div className="d-flex justify-content-end">
          <button className="add-job-btn mt-5" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
