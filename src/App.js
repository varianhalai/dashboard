import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Row, Col } from "styled-bootstrap-grid";
import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import harvest from "./lib/index.js";
import ErrorModal from "./components/ErrorModal.jsx";

import { darkTheme, lightTheme, fonts } from "./styles/appStyles.js";

// images
import logo from "./assets/logo.png";


// components
import Wallet from "./components/Wallet.jsx";
import FarmingTable from "./components/farmingTable/FarmingTable.jsx";
import AssetTable from "./components/assetTable/AssetTable.jsx";
import Harvest from "./components/harvest/Harvest.jsx";
import StakePanel from "./components/stakePanel/StakePanel.jsx";
import Balance from "./components/balance/Balance.jsx";
import APY from "./components/apy/APY.jsx";
import AddTokens from "./components/addTokens/AddTokens.jsx";
import WelcomeText from './components/WelcomeText.jsx';

const { ethers } = harvest;
const GlobalStyle = createGlobalStyle`
  ${reset}
 
  
  html {
    /* 1rem = 10px */
    font-size: 62.5%;
    height: 100%;
  }



  body {
    height: 100%;
    background-color: ${(props) => props.theme.style.bodyBackground};
  }


  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 6rem;
    height: 2.6rem;
    @media(max-width: 500px) {
      height: 2.4rem;
      width: 5.5rem;
    }
    
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.style.blueBackground};
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.9rem;
    width: 1.9rem;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    @media(max-width: 500px) {
      height: 1.7rem;
      width: 1.7rem;
    }
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.style.blueBackground};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${(props) => props.theme.style.blueBackground};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(3.3rem);
    -ms-transform: translateX(3.3rem);
    transform: translateX(3.3rem);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: .5rem;
  }

  .slider.round:before {
    border-radius: .5rem;
  }

  input[type="button"]:focus, button:focus {
      outline: none;
  }


  input[type="number"] {
    -moz-appearance: textfield;
    background-color: ${(props) => props.theme.style.lightBackground};
    border: 0.2rem solid #363636;
    font-size: 1.4rem;
    color: ${(props) => props.theme.style.primaryFontColor};
    width: 60px;
    text-align: center;
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  .button {
    background: ${(props) => props.theme.style.highlight};
    border: ${(props) => props.theme.style.smallBorder};
    box-shadow: ${(props) => props.theme.style.buttonBoxShadow};
    box-sizing: border-box;
    border-radius: 0.8rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-family: TechnaSans;
    color: ${(props) => props.theme.style.buttonFontColor};
    font-size: 1.2rem;

    &.ghost {
      background: transparent;
      border: 0px;
      box-shadow: none;
      color: ${(props) => props.theme.style.linkColor};
      font-family: ${fonts.headerFont};
      padding: 0px;
    }

    &.alert {
      background-color: ${(props) => props.theme.style.alertColor}
    }
  }

  .spread-row {
    justify-content: space-between;
  }

  div[data-name="row"] {
    margin-bottom: 1.5rem;
  }
`;

// App
const Brand = styled.div`
  padding-top: 1.5rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    margin-left: .5rem;
  }

  span {
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont};
    font-size: 2.5rem;
  }

  @media(min-width: 1500px) {
    margin: 2.5rem 0;
  }
`;

const Panel = styled.div`
  position: relative;
  padding: 2.5rem 2.5rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 1rem;
  border-top-left-radius: 0rem;
  margin-top: -1.5rem;
  background-color: ${(props) => props.theme.style.panelBackground};
  z-index: 1;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  

  &.four-corner {
    border-top-left-radius: 1rem;
    background-color: #1d1d1d;
    color: ${(props) => props.theme.style.primaryFontColor};
    font-size: 1.6rem;
    font-family: TechnaSans;
  }


  

  
  
`;

const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 2.25rem 2rem;
  background-color: ${(props) => props.theme.style.highlight};
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.style.panelTabBoxShadow};
  
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  
  

  a {
    color: ${(props) => props.theme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.contentFont};
    font-size: 2.4rem;
    position: relative;
    top: .1rem;
    @media(max-width: 500px) {
      font-size: 1.8rem;
    }
   
  }
  @media(max-width: 500px) {
    font-size: 1.9rem;
    padding: 0.75rem 1rem 2.4rem 1rem;
    position: relative;
    top: .1rem;
    a {
      top: .4rem;
    }
  }
  @media(max-width: 330px) {
    font-size: 1.7rem;
    padding: 0.75rem .75rem 2.4rem .75rem;
    position: relative;
    top: .1rem;
    a {
      top: .4rem;
    }
  }

  &.wiki-tab {
    position: relative;
    background-color: ${(props) => props.theme.style.wikiTabBackground};
    top: 0.4rem;
    

    &:hover {
      top: 0rem;
    }

    a {
      color: ${(props) => props.theme.style.primaryFontColor};
      font-size: 1.9rem;
      position: relative;
      top: .1rem;
    }
    @media(max-width: 500px) {
      top: 0.9rem;
      a {
        font-size: 1.7rem;
      }
      
    }
  }
    &.switch-panel {
      margin-right: 1.2rem;
      position: relative;
      top: .6rem;
      padding: 0.4rem .5rem 1rem .5rem;

      @media(max-width: 500px) {
        top: 1.2rem;
        padding: 0.4rem .5rem 3rem .5rem;
      }
      
    }
  
`;

const PanelTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PanelTabContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
 
  @media(min-width: 1800px) {
    width: 75%;
  }
  @media(max-width: 1300px) {
    width: 85%;
  }
  @media(max-width: 1250px) {
    width: 90%;
  }
  
`;

function App() {
  const [state, setState] = useState({
    provider: undefined,
    signer: undefined,
    manager: undefined,
    address: "",
    summaries: [],
    underlyings: [],
    usdValue: 0,
    error: { message: null, type: null, display: false },
    theme: window.localStorage.getItem("HarvestFinance:Theme") || "light",
    display: false,
    minimumHarvestAmount: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      state.manager && refresh();
    }, 60000);
    return () => clearTimeout(timer);
  });
  useEffect(() => {
    if (state.address !== "") {
      refresh();
      
    }
   
  }, [state.address]);
  useEffect(() => {
    if(state.usdValue) {
      setState({...state,display: true})
      console.log(state.summaries)
    }
  },[state.usdValue])

  const disconnect = () => {
    setState({
      provider: undefined,
      signer: undefined,
      manager: undefined,
      address: "",
      summaries: [],
      underlyings: [],
      usdValue: 0,
      apy: 0,
      error: { message: null, type: null, display: false },
      theme: window.localStorage.getItem("HarvestFinance:Theme") || "light",
      
      
    });
  };

  const closeErrorModal = () => {
    setState({
      ...state,
      error: { message: null, type: null, display: false },
    });
  };

  const openModal = (message, type) => {
    setState({
      ...state,
      error: { message: message, type: type, display: true },
    });
  };

  const setConnection = (provider, signer, manager) => {
    setState({
      ...state,
      provider: provider,
      signer: signer,
      manager: manager,
    });
  };

  const setAddress = (address) => {
    setState((state) => ({ ...state, address: address }));
  };

  const refresh = () => {
    state.manager
      .aggregateUnderlyings(state.address)
      .then((underlying) => {
        return underlying.toList().filter((u) => !u.balance.isZero());
      })
      .then((underlyings) => {
        setState({ ...state, underlyings: underlyings });
      }).catch(err => {
        console.log(err)
      });

    state.manager
      .summary(state.address)
      .then((summaries) =>
        summaries.filter(
          (p) =>
            !p.summary.earnedRewards.isZero() ||
            !p.summary.stakedBalance.isZero() ||
            (p.summary.isActive && !p.summary.unstakedBalance.isZero()),
        ),
      )
      .then((summaries) => {
        let total = ethers.BigNumber.from(0);
        summaries.forEach((pos) => {
          total = total.add(pos.summary.usdValueOf);
        });
        setState((state) => ({
          ...state,
          summaries: summaries,
          usdValue: total,
        }));
        
        return summaries;
      }).catch(err => {
        console.log(err)
      });
  };

  const toggleTheme = (theme) => {
    setState({ ...state, theme: theme });
    window.localStorage.setItem("HarvestFinance:Theme", theme);
  };

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
        <Container>
          <Row>
            <Col col>
              <Brand>
                <img src={logo} alt="harvest finance logo" />{" "}
                <span>harvest.dashboard</span>
              </Brand>
            </Col>
          </Row>

          <Row>
            <Col>
              <PanelTabContainer>
                <PanelTabContainerLeft>
                  <PanelTab>
                    <a
                      href="https://harvest.finance"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      harvest.finance
                    </a>
                  </PanelTab>
                  <PanelTab className="wiki-tab">
                    <a
                      href="https://farm.chainwiki.dev/en/home"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      wiki
                    </a>
                  </PanelTab>
                </PanelTabContainerLeft>

                <PanelTabContainerRight>
                  <PanelTab className='switch-panel'>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={state.theme === "dark" ? true : false}
                        onChange={() =>
                          toggleTheme(state.theme === "dark" ? "light" : "dark")
                        }
                      />
                      <span className="slider round"></span>
                    </label>
                  </PanelTab>
                  
                </PanelTabContainerRight>
              </PanelTabContainer>

              <Panel>
                 {state.usdValue? <Row>
                  <Col>
                    <Wallet
                      state={state}
                      openModal={openModal}
                      disconnect={disconnect}
                      setConnection={setConnection}
                      setAddress={setAddress}
                      refresh={refresh}
                    />
                  </Col>
                </Row> : null}
                

                 
                
                {state.provider ? (
                  <div className='main-content'>
                    <Row >
                      <Col >
                        <FarmingTable state={state} setState={setState} />
                      </Col>
                    </Row>

                    <Row style={{marginTop:"15px"}}>
                      {/* Git hub pages would not recognize the margin from the bootstrap grid */}
                      <Col lg="6">
                        <Harvest state={state} setState={setState} />
                      </Col>
                      <Col lg="4">
                        <StakePanel state={state} openModal={openModal} />
                      </Col>
                      <Col lg="2">
                        <Balance state={state}/>  
                      </Col>
                      
                      
                      </Row>
                      <Row style={{marginTop:"15px"}}>
                        {/* Git hub pages would not recognize the margin from the bootstrap grid */}
                      <Col lg ="6">
                        <AddTokens state={state} />
                      </Col>
                      <Col lg="4">
                        <AssetTable state={state} />
                      </Col>
                      <Col lg="2">
                        <APY state={state} setState={setState} />
                      </Col>
                      </Row>
                      
                    
                  </div>
                ) :
                <Row >
                  <Col >
                    <WelcomeText 
                      state={state}
                      openModal={openModal}
                      disconnect={disconnect}
                      setConnection={setConnection}
                      setAddress={setAddress}
                      refresh={refresh}
                     />
                  </Col>
                  
                  </Row>} 
              </Panel>
            </Col>
          </Row>
        </Container>
        <ErrorModal state={state} onClose={() => closeErrorModal()} />
    </ThemeProvider>
  );
}

export default App;
