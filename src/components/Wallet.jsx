import React, { useContext } from "react";
import HarvestContext from "../Context/HarvestContext";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../styles/appStyles";
import { prettyEthAddress } from "../lib/utils"

const WalletConnection = styled.div`
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  border-top-right-radius: 0rem;
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  padding-bottom: 0.7rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  font-size: 2rem;
  @media (max-width: 610px) {
    width: 100%;
    font-size: 1.8rem;
  }
  @media (max-width: 580px) {
    font-size: 1.7rem;
  }

  @media (max-width: 550px) {
    font-size: 1.7rem;
  }
  @media (max-width: 540px) {
    font-size: 1.6rem;
  }
  @media (max-width: 510px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
  @media (max-width: 450px) {
    font-size: 1.3rem;
  }
  @media (max-width: 415px) {
    font-size: 1.2rem;
  }
  @media (max-width: 385px) {
    font-size: 1.1rem;
  }
  @media (max-width: 360px) {
    font-size: 1rem;
  }
  @media (max-width: 328px) {
    font-size: 0.9rem;
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: ${(props) => props.theme.style.primaryFontColor};
    text-decoration: none;
  }

  div {
    .ghost {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-size: 1.8rem;
    }
  }

  .connect-status-container {
    display: flex;
    align-items: center;

    a {
      margin-right: 10px;
    }

    .button-div {
      .clear {
        margin: 0px;
        font-size: 13px;
        padding: 3px 5px;
      }
    }
  }
`;
const WalletContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding-left: 1rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.style.primaryFontColor};
  font-family: ${fonts.headerFont};
  @media (max-width: 1107px) {
  }
`;
const WalletTab = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: -1rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  border: ${(props) => props.theme.style.mainBorder};
  padding-bottom: 1.5rem;
  font-family: ${fonts.headerFont};
  font-size: 2rem;
`;
const Wallet = ({ theme, address, provider }) => {
  const {
    isCheckingBalance,
    disconnect,
    setRadio,
    setCheckingBalance,
    setAddressToCheck
  } = useContext(HarvestContext);

  const clear = () => {
    setRadio(false);
    setCheckingBalance(false);
    setAddressToCheck("");
    disconnect();
  };

  const renderConnectStatus = (provider, address) => {
   
    return (
      <span className="connect-status-container">
        <span id="address">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={address ? "https://etherscan.io/address/" + address : "#"}
          >
            {prettyEthAddress(address) || ""}
          </a>
        </span>

        {!isCheckingBalance && (
          <div className="button-div">
            <button onClick={disconnect} className="clear button">
              Disconnect
            </button>
          </div>
        )}

        {isCheckingBalance && (
          <div className="button-div">
            <button onClick={clear} className="clear button">
              Clear
            </button>
          </div>
        )}
      </span>
    );
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <WalletContainer>
        <WalletTab>wallet</WalletTab>
        {
          address &&
          <WalletConnection>
            {renderConnectStatus(provider, address)}
          </WalletConnection>
        }
      </WalletContainer>
    </ThemeProvider>
  );
};

export default Wallet;
