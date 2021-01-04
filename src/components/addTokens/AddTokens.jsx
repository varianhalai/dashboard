import React, { useEffect, useContext } from "react";
import HarvestContext from "../../Context/HarvestContext";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import { tokens, tokens2 } from "./AvailableTokens";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.style.lightBackground};
  color: ${(props) => props.theme.style.primaryFontColor};
  font-size: 1.7rem;
  font-family: ${fonts.contentFont};
  padding:  1rem 1.5rem 0rem; 1.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
 
  

  .inner {
    
    overflow-x: scroll;
    height: 16rem;
    scrollbar-color: ${(props) => props.theme.style.scrollBarColor} ${(props) =>
  props.theme.style.lightBackground} ;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 100%;
      height: .8rem;
      margin-top: -1.8rem
      
    }
    ::-webkit-scrollbar-track:no-button { 
      width: 100%;
      border-radius: .5rem;
      background-color: ${(props) => props.theme.style.lightBackground};
    }
    ::-webkit-scrollbar-button {
      color: ${(props) => props.theme.style.primaryFontColor};
      
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: black;
      background-color: ${(props) => props.theme.style.scrollBarColor};
   }

    .token-container {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      &.first {
        margin-bottom: 2rem;
      }
      
     
      @media(max-width: 1105px) {
        width: 90rem;
        margin: 0 auto;
      }
    
    }
  }
    

  h1 {
    font-family: ${fonts.headerFont};
    margin-bottom: 2.2rem;
    font-size: 2rem;
    text-align: center;
    position: relative;
  }

  @media(max-width: 1105px) {
    margin-bottom: 1.5rem;
    height: 32rem;
  }
 
  
`;

const StyledToken = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 20%;

  &:hover {
    top: 0.2rem;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont};
  }

  img {
    height: 3.7rem;
    width: 3.7rem;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 1.5rem;
  }
`;

const AddTokens = (props) => {
  const { tokenAddedMessage, setTokenAddedMessage } = useContext(
    HarvestContext,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTokenAddedMessage("");
    }, 1500);
    return () => clearTimeout(timer);
  }, [tokenAddedMessage]);

  const addTokenToWallet = (t) => {
    setTokenAddedMessage("");

    props.state.provider.sendAsync(
      {
        method: "metamask_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: t.address,
            symbol: t.symbol,
            decimals: t.decimals,
            image: t.tokenImage,
          },
        },
        id: Math.round(Math.random() * 100000),
      },
      (err, result) => {
        if (err) {
          setTokenAddedMessage(
            `An error has occurred, ${t.name} could not be added.`,
          );
        } else {
          if (result.result) {
            setTokenAddedMessage(`${t.name} was added to wallet!`);
          } else {
            setTokenAddedMessage(`${t.name} has not been added to wallet.`);
          }
        }
      },
    );
  };

  return (
    <ThemeProvider
      theme={props.state.theme === "dark" ? darkTheme : lightTheme}
    >
      <Panel>
        <h1>Add assets to wallet</h1>
        <div className="inner">
          <div className="token-container first">
            {tokens.map((t) => (
              <StyledToken
                onClick={() => addTokenToWallet(t)}
                key={t.name}
                {...t}
              >
                <img alt={t.name} src={t.image}></img>
                <span>{t.name}</span>
              </StyledToken>
            ))}
          </div>
          <div className="token-container">
            {tokens2.map((t) => (
              <StyledToken
                onClick={() => addTokenToWallet(t)}
                key={t.name}
                {...t}
              >
                <img alt={t.name} src={t.image}></img>
                <span>{t.name}</span>
              </StyledToken>
            ))}
          </div>
        </div>
      </Panel>
    </ThemeProvider>
  );
};

export default AddTokens;
