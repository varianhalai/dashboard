import React, { useContext } from "react";
import HarvestContext from "../../Context/HarvestContext";
import { UserSettings, CloseIcon } from "./SettingsModalStyles";

const SettingsModal = () => {
  const {
    exchangeRates,
    baseCurrency,
    setBaseCurrency,
    setCurrentExchangeRate,
    settingsOpen,
    toggleUserSettings
  } = useContext(HarvestContext);

  const changeHandler = (e) => {
    setBaseCurrency(e.target.value);
    setCurrentExchangeRate(exchangeRates[e.target.value]);
    window.localStorage.setItem("HarvestFinance:currency", e.target.value)
  };

  return (
    <UserSettings>
      
      
      <CloseIcon onClick={toggleUserSettings}><i className="fas fa-times-circle"></i></CloseIcon>
      <div className="currency-options">
        <h3>Display currency in:</h3>
        <select
          onChange={changeHandler}
          value={baseCurrency}
          name="currency"
          id="currencies"
        >
          <option value="1">{baseCurrency}</option>

          {exchangeRates
            ? Object.entries(exchangeRates).map(([key, value]) => {
                return <option value={key}>{key}</option>;
              })
            : ""}
        </select>
      </div>
    </UserSettings>
  );
};

export default SettingsModal;
