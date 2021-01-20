import React, { useEffect, useContext } from "react";
import HarvestContext from "../../Context/HarvestContext";
import styled, { ThemeProvider } from "styled-components";
import harvest from "../../lib/index";
import { darkTheme, lightTheme, fonts } from "../../styles/appStyles";
import { TableContainer, MainTableInner, MainTableRow, MainTableHeader, PanelTabContainerLeft, PanelTabContainerRight, PanelTab, Tabs } from './FarmingTableStyles';

import FarmTableSkeleton from "./FarmTableSkeleton";

const { utils } = harvest;

const columns = [
  {
    name: "Rewards Pool",
  },
  {
    name: "Earn FARM",
  },
  {
    name: "FARM to Claim",
  },
  {
    name: "Staked Asset",
  },
  {
    name: "% of Pool",
  },
  {
    name: "Value",
  },
  {
    name: "Unstaked",
  },
];

const FarmingTable = ({ showAsCards }) => {
  const {
    state,
    setState,
    refresh,
    isRefreshing,
    isCheckingBalance,
    prettyBalance,
    currentExchangeRate
  } = useContext(HarvestContext);
  const getThisReward = (reward) => {
    setState({ ...state, minimumHarvestAmount: reward });
  };

  const getTotalFarmEarned = () => {
    let total = 0;
    if (state.summaries.length !== 0) {
      // eslint-disable-next-line 
      state.summaries.map(utils.prettyPosition).map((summary, index) => {
        total += parseFloat(summary.historicalRewards);
        setState({
          ...state,
          totalFarmEarned: (state.totalFarmEarned = total),
        });

      });
    }
  };

  useEffect(() => {
    if (state.totalFarmEarned === 0) {
      getTotalFarmEarned();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.summaries]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getTotalFarmEarned();

    }, 60000);
    return () => clearTimeout(timer);
  });


  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ? (
        <Tabs>
          <PanelTabContainerLeft>
            <PanelTab>
              <p>your staked assets</p>
            </PanelTab>
          </PanelTabContainerLeft>

          <PanelTabContainerRight>
            <PanelTab className={isRefreshing ? "refresh-disabled" : "refresh-button"} onClick={showAsCards}>
              <i className="fas fa-table"></i>
            </PanelTab>
            {isCheckingBalance ? "" : <PanelTab className={isRefreshing ? "refresh-disabled" : "refresh-button"} onClick={refresh}>
              <i className="fas fa-sync-alt"></i>
            </PanelTab>}

          </PanelTabContainerRight>

        </Tabs>
      ) : null}
      {state.display ? (
        <TableContainer>
          {state.summaries.length === 0 ? (
            <NoAssetTable>
              <div className="header">
                <p>You currently are not staking any assets</p>
              </div>
              <div className="content">
                <div className="name">
                  {" "}
                  <p>Stake assets to start earning!</p>{" "}
                </div>
              </div>
            </NoAssetTable>
          ) : (
              <MainTableInner>
                <MainTableHeader>
                  {columns.map((col, i) => {
                    return (
                      <p className={col.name} key={i}>
                        {col.name}
                      </p>
                    );
                  })}
                </MainTableHeader>
                {state.summaries
                  .map(utils.prettyPosition)
                  .map((summary, index) => (
                    <MainTableRow key={summary.address}>
                      <div className="name">{summary.name}</div>
                      <div className="active">{String(summary.isActive)}</div>
                      <div
                        className="earned-rewards"
                        onClick={() => getThisReward(summary.earnedRewards)}
                      >
                        {parseFloat(summary.earnedRewards).toFixed(6)}
                      </div>
                      <div className="staked">
                        {parseFloat(summary.stakedBalance).toFixed(6)}
                      </div>
                      <div className="pool">{summary.percentOfPool}</div>
                      <div className="value">{prettyBalance(summary.usdValueOf * currentExchangeRate)}</div>
                      <div className="unstaked">
                        {parseFloat(summary.unstakedBalance).toFixed(6)}
                      </div>
                    </MainTableRow>
                  ))}
              </MainTableInner>
            )}
        </TableContainer>
      ) : (
          <FarmTableSkeleton state={state} />
        )}
    </ThemeProvider>
  );
};

export default FarmingTable;

const NoAssetTable = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    font-size: 2rem;
    font-family: ${fonts.headerFont};
    padding: 1.5rem 1rem;
    border-bottom: 2px black solid;
    width: 100%;
    p {
      text-align: center;
    }
  }
  .content {
    width: 100%;
    font-size: 1.7rem;
    font-family: ${fonts.contentFont};
    padding: 1.5rem 1rem;
    width: 100%;
    border-bottom: 1.2px solid rgba(53, 53, 53, 0.15);
    p {
      text-align: center;
    }
  }
`;
