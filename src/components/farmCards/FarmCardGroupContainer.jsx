import React, { useEffect, useContext } from "react";
import harvest from "../../lib/index";
import HarvestContext from "../../Context/HarvestContext";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../styles/appStyles";
import FarmCard from "./FarmCard";
import {
  FarmGroupContainerWrapper,
  StakedAssetsTitle,
  NoFarmSummariesFound,
} from "./FarmCardStyles";
const { utils } = harvest;

function FarmCardGroupContainer({ showAsTables }) {
  const { state, setState } = useContext(HarvestContext);

  function getTotalFarmEarned() {
    let total = 0;
    if (state.summaries.length) {
      state.summaries.map(utils.prettyPosition).map((summary) => {
        total += parseFloat(summary.historicalRewards);
        setState({
          ...state,
          totalFarmEarned: (state.totalFarmEarned = total),
        });
        return;
      });
    }
  }

  useEffect(() => {
    if (!state.totalFarmEarned) {
      getTotalFarmEarned();
    }
    return;
  }, [state.summaries]);

  useEffect(() => {
    const timer = setTimeout(() => {
      getTotalFarmEarned();
    }, 60000);
    return () => clearTimeout(timer);
  });

  return (
    <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      <StakedAssetsTitle>
        <h2>Your Staked Assets</h2>
        <i className="fas fa-table" onClick={showAsTables}></i>
      </StakedAssetsTitle>
      {state.summaries.length ? (
        <FarmGroupContainerWrapper>
          {state.summaries.map(utils.prettyPosition).map((summary) => {
            return (
              <FarmCard key={summary.address} summary_information={summary} />
            );
          })}
        </FarmGroupContainerWrapper>
      ) : (
          <NoFarmSummariesFound>
            You currently are not staking any assets 🏜️
          </NoFarmSummariesFound>
        )}
    </ThemeProvider>
  );
}

export default FarmCardGroupContainer;
