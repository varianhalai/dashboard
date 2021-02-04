import React, { useState, useEffect } from "react";
import HarvestContext from "./Context/HarvestContext";
import { ThemeProvider } from "styled-components";
import { Row, Col } from "styled-bootstrap-grid";
import {ERC20_ABI, AUTO_REWARDS_ABI} from './lib/data/ABIs';
import harvest from "./lib/index.js";
import Loadable from "react-loadable";
import { darkTheme, lightTheme} from "./styles/appStyles.js";
import axios from "axios";

// images
import logo from "./assets/gif_tractor.gif";
//styles
import {Topbar, GlobalStyle, Brand, Panel, Container} from './styles/AppJsStyles';

// components
import TabContainer from "./components/tabContainer/TabContainer";
import SettingsModal from "./components/userSettings/SettingsModal";
import Radio from "./components/radio/Radio";
import MainContent from "./components/MainContent";
import WelcomeText from "./components/WelcomeText";
import CheckBalance from "./components/checkBalance/CheckBalance";
import TokenMessage from "./components/statusMessages/TokenMessage";
import HarvestAndStakeMessage from "./components/statusMessages/HarvestAndStakeMessage";
import Sidedrawer from './components/userSettings/sidedrawer/Sidedrawer';

const { ethers,utils } = harvest;




const ErrorModal = Loadable({
  loader: () => import("./components/ErrorModal"),
  loading() {
    return null;
  },
});

function App() {
  //for currency conversion
  const [baseCurrency, setBaseCurrency] = useState(window.localStorage.getItem("HarvestFinance:currency") || "USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [currentExchangeRate, setCurrentExchangeRate] = useState(1);
  //for currency conversion
  const [openDrawer, setOpenDrawer] = useState(false);
  const [settingsOpen, setSettingsOpen] =useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isCheckingBalance, setCheckingBalance] = useState(false);
  const [tokenAddedMessage, setTokenAddedMessage] = useState("");
  const [harvestAndStakeMessage, setHarvestAndStakeMessage] = useState({
    first: "",
    second: "",
  });
  const [state, setState] = useState({
    provider: undefined,
    signer: undefined,
    manager: undefined,
    address: "",
    summaries: [],
    underlyings: [],
    usdValue: 0,
    error: { message: null, type: null, display: false },
    theme: window.localStorage.getItem("HarvestFinance:Theme"),
    display: false,
    minimumHarvestAmount: "0",
    apy: 0,
    farmPrice: 0,
    totalFarmEarned: 0,
  });

  const getPools = async () => {
    await axios
      .get(
        `https://api-ui.harvest.finance/pools?key=${process.env.REACT_APP_HARVEST_KEY}`,
      )
      .then((res) => {
        let currentAPY = res.data[0].rewardAPY;
        let currentPrice = res.data[0].lpTokenData.price;

        setState({ ...state, apy: currentAPY, farmPrice: currentPrice });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      state.manager && refresh();
    }, 60000);
    return () => clearTimeout(timer);
  });

 
  useEffect(() => {
    getPools();
    memoizeExchangeRates();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      memoizeExchangeRates();
    }, 600000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (state.address !== "") {
      refresh();
    }
    // eslint-disable-next-line
  }, [state.address]);
  useEffect(() => {
    if (state.usdValue) {
      setState({ ...state, display: true });
    }
    // eslint-disable-next-line
  }, [state.usdValue]);

  const memoizeExchangeRates = () => {
    axios
      .get("https://api.ratesapi.io/api/latest?base=USD")
      .then((res) => {
        setExchangeRates(res.data.rates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let contractABI = [{"inputs":[{"internalType":"address","name":"_storage","type":"address"},{"internalType":"address","name":"_vault","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"profitAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"ProfitLogInReward","type":"event"},{"anonymous":false,"inputs":[],"name":"ProfitsNotCollected","type":"event"},{"constant":true,"inputs":[],"name":"__mic","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"__mis","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"__rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"__rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"__sushiswapRouterV2","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"__underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"__usdt","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"continueInvesting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"depositArbCheck","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"doHardWork","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"emergencyExit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"investedUnderlyingBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"profitSharingDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"profitSharingNumerator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPool","outputs":[{"internalType":"contract SNXRewardInterface","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"routerV2","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"salvage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"sell","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sellFloor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_uniswapRouteToToken0","type":"address[]"},{"internalType":"address[]","name":"_uniswapRouteToToken1","type":"address[]"}],"name":"setLiquidationPaths","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bool","name":"s","type":"bool"}],"name":"setSell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"floor","type":"uint256"}],"name":"setSellFloor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_store","type":"address"}],"name":"setStorage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"store","outputs":[{"internalType":"contract Storage","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"underlying","outputs":[{"internalType":"contract ERC20Detailed","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"uniLPComponentToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"uniLPComponentToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"uniswapRoutes","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"unsalvagableTokens","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAllToVault","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawToVault","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

  let rewardPoolABI = [{"inputs":[{"internalType":"address","name":"mithShare_","type":"address"},{"internalType":"address","name":"lptoken_","type":"address"},{"internalType":"uint256","name":"starttime_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initreward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpt","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mithShare","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"starttime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  

  const getNextHardWorkReward = async () => {
    const newContract = new ethers.Contract(
      `0xa81363950847aC250A2165D9Fb2513cA0895E786`,
      contractABI,
      state.signer,
    );
    newContract
      .rewardPool()
      .then(async (res) => {
        console.log("reward pool", res);
        //   for any strategy, find rewardPool
        // 0x9d9418803f042ccd7647209b0ffd617981d5c619
        const rewardPool = new ethers.Contract(
          res,
          rewardPoolABI,
          state.signer,
        );
        const rewards = await rewardPool.earned(state.address) / 10 ** 18;
        console.log("earned for strategy", rewards );
        // call earned for strategy address and divide by 10^18
        const totalSupply = await rewardPool.totalSupply();
        console.log("total supply", ethers.utils.formatUnits(totalSupply.toString(), 10));
        // divide on the total supply of vault
        if(rewards!== 0) {
          console.log(rewards / totalSupply)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

//   for any strategy, find rewardPool
// fo ex [https://etherscan.io/address/0xa81363950847aC250A2165D9Fb2513cA0895E786#readContract](https://etherscan.io/address/0xa81363950847aC250A2165D9Fb2513cA0895E786#readContract)
// it will be mith stake contract
// [https://etherscan.io/address/0x9d9418803f042ccd7647209b0ffd617981d5c619#readContract](https://etherscan.io/address/0x9d9418803f042ccd7647209b0ffd617981d5c619#readContract)
// call earned for strategy address and divide by 10^18

// for your amount need to know a percent of your staked amount

// divide on the total supply of vault
// [https://etherscan.io/address/0x6f14165c6d529ea3bfe1814d0998449e9c8d157d#readProxyContract](https://etherscan.io/address/0x6f14165c6d529ea3bfe1814d0998449e9c8d157d#readProxyContract)

// but need manual adjusting for each strategy

// it will be show only next doHardWork

// previous earned rewards you can easily calculate with SharePrice

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
      theme: window.localStorage.getItem("HarvestFinance:Theme"),
    });
    setIsConnecting(false);
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

  const toggleUserSettings = () => {
    setSettingsOpen(!settingsOpen)
  }
  const toggleSideDrawer = () => {
    setOpenDrawer(!openDrawer)
  }
  

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
    setRefreshing(true);
    getPools();
    state.manager
      .aggregateUnderlyings(state.address)
      .then((underlying) => {
        return underlying.toList().filter((u) => !u.balance.isZero());
      })
      .then((underlyings) => {
        setState({ ...state, underlyings: underlyings });
      })
      .catch((err) => {
        console.log(err);
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
        setRefreshing(false);
        
        return summaries;
      })
      .catch((err) => {
        refresh();
      });
  };

  useEffect(() => {
    if(state.summaries.length > 0 && state.provider) {
      getNextHardWorkReward()
    }
  },[state.summaries])

  //Radio Modal
  const [radio, setRadio] = useState(false);

  const toggleRadio = () => {
    setRadio(!radio);
  };

  //currency conversion helpers
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: baseCurrency,
  });

  const prettyBalance = (balance) => {
    return currencyFormatter.format(balance / 1000000);
  };
  const convertStandardNumber = (num) => {
    return currencyFormatter.format(num)
  }

  return (
    <HarvestContext.Provider
      value={{
        state,
        setState,
        radio,
        setRadio,
        toggleRadio,
        tokenAddedMessage,
        setTokenAddedMessage,
        isRefreshing,
        setIsConnecting,
        isCheckingBalance,
        setCheckingBalance,
        setConnection,
        disconnect,
        refresh,
        harvestAndStakeMessage,
        setHarvestAndStakeMessage,
        exchangeRates,
        baseCurrency,
        setBaseCurrency,
        currentExchangeRate,
        setCurrentExchangeRate,
        currencyFormatter,
        prettyBalance,
        convertStandardNumber,
        settingsOpen,
        toggleUserSettings,
        openDrawer,
        toggleSideDrawer
        
      }}
    >
      <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        {openDrawer ? <Sidedrawer /> : null}
        
        <Container>
          <Row>
            <Col col>
              <Topbar>
                <Brand>
                  <img src={logo} alt="harvest finance logo" />{" "}
                  {openDrawer ? "" : <span>harvest.dashboard</span>}
                </Brand>
                <i onClick={toggleUserSettings} className="fas fa-user-cog"></i>
                {settingsOpen ? <SettingsModal /> : ''}
                <i className="fas fa-bars" onClick={toggleSideDrawer}></i>
                
              </Topbar>
            </Col>
          </Row>

          <Row>
            <Col>
              <>
                {isCheckingBalance ? (
                  ""
                ) : (
                  <>
                    <TabContainer />
                    <Panel>
                      <Radio />

                      <TokenMessage />
                      <HarvestAndStakeMessage />

                      {/* MOVED MAIN COMPONENTS INTO ITS OWN COMPONENT */}
                      {/* The welcome text display on intial load and when a wallet is connected the main content renders */}
                      {state.provider ? (
                        <MainContent
                          state={state}
                          setState={setState}
                          openModal={openModal}
                        />
                      ) : (
                        <Row>
                          <Col>
                            <WelcomeText
                              state={state}
                              openModal={openModal}
                              disconnect={disconnect}
                              setConnection={setConnection}
                              setAddress={setAddress}
                              refresh={refresh}
                            />
                          </Col>
                        </Row>
                      )}
                    </Panel>
                  </>
                )}
              </>
            </Col>
          </Row>
          {isConnecting ? (
            ""
          ) : (
            <Row>
              <Col style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                {isCheckingBalance ? <TabContainer /> : ""}
                <Panel>
                  <CheckBalance state={state} />
                </Panel>
              </Col>
            </Row>
          )}
        </Container>
        <ErrorModal state={state} onClose={() => closeErrorModal()} />
      </ThemeProvider>
    </HarvestContext.Provider>
  );
}

export default App;
