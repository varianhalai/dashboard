import React,{useContext} from 'react';
import HarvestContext from '../../../Context/HarvestContext';
import {BluePanel} from './GasSavedStyles';
import {ThemeProvider} from 'styled-components';
import { darkTheme, lightTheme } from "../../../styles/appStyles";
import GasSavedSkeleton from './GasSavedSkeleton';


const GasSaved = () => {
    const {state, totalGasSaved , convertStandardNumber, currentExchangeRate} = useContext(HarvestContext);
    return (
        <ThemeProvider theme={state.theme === "dark" ? darkTheme : lightTheme}>
      {state.display ? (
        <BluePanel>
          <h1>{convertStandardNumber(totalGasSaved * currentExchangeRate)}M</h1>
          <span>Saved Gas</span>
        </BluePanel>
      ) : (
         <GasSavedSkeleton />
      )}
    </ThemeProvider>
    );
}

export default GasSaved;
