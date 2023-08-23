import React, { useEffect, useState } from "react";
import "./Settings.css";
import axios from "axios";
import { Base_Route } from "../../helper/constant";
import { Modal } from "antd";
import { toast } from "react-toastify";

const Settings = () => {
  const [setting, setSetting] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    axios({
      method: "Get",
      url: `${Base_Route}/api/settings`,
      headers: {
        Authorization: `Bearer ${localStorage.AuthToken}`,
      },
    }).then(
      (res) => {
        setId(res.data[0]._id);
        setSetting(res.data[0]);

        // toast.success("setting data get successfully");
      },
      (err) => {
        if (err.response.status === 401) {
          toast.warn("UnAuthorize user request");
        } else if (err.response.status === 500) {
          toast.warn("Internal Server Error");
        } else {
          toast.warn(err.message);
        }
      }
    );
  }, []);

  const saveSetting = () => {
    const data = JSON.stringify(setting);
    axios({
      method: "Put",
      url: `${Base_Route}/api/settings/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.AuthToken}`,
        "Content-Type": "application/Json",
      },
      data,
    }).then(
      (res) => {
        Modal.success({
          title: "Success",
          content: "Setting Updated Successfully",
        });
      },
      (err) => {
        if (err.response.status === 401) {
          toast.warn("UnAuthorize user request");
        } else if (err.response.status === 500) {
          toast.warn("Internal Server Error");
        } else {
          toast.warn(err.message);
        }
      }
    );
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;
    if (name === "ad_show") {
      updatedValue = value === "true";
    }
    setSetting((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    saveSetting();
  };
  return (
    <div className="settings-container">
      <div className="heading-div">
        <h3 className="featureTitle">
          <b>App Features</b>
        </h3>
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
            value={setting.ad_show}
            // contentEditable
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
            value={setting.ad_source}
            // defaultValue={setting.ad_source}
            // contentEditable
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
            value={setting.admob_app_id}
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
            value={setting.admob_open_app_id}
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
            value={setting.admob_interstitial_ad_id}
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
            value={setting.admob_native_ad_id}
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
            value={setting.admob_banner_ad_id}
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
            value={setting.fb_app_id}
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
            value={setting.fb_interstitial_ad_id}
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
            value={setting.fb_native_ad_id}
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
            value={setting.fb_banner_ad_id}
            contentEditable
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
