import styled from "styled-components";
import { fonts, screen } from "../../styles/appStyles";

export const FarmCardContainer = styled.div`
  width: 32%;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.innerBoxShadow};
  border-radius: .5rem;
  padding: 20px 15px;
  color: ${(props) => props.theme.style.primaryFontColor};
  background-color: ${(props) => props.theme.style.lightBackground};
  display: -ms-grid;
  display: grid;
  grid-gap: 5px;
  font-family: ${fonts.contentFont};
  margin: 10px 5px;

  @media (max-width: ${screen.lg}px) {
    width: 49%;
  }

  @media (max-width: ${screen.md}px) {
    width: 100%;
  }

  .farm_card_title {
    font-size: 1.7rem;
    font-weight: bold;
  
    margin-bottom: 20px;
  }

  .farm_card_content {
    display: grid;
    display: -ms-grid;
    -ms-grid-columns: 33% 33% 33%;
    grid-template-columns: 33% 33% 33%;
    grid-template-areas:
      "earning staked unstaked"
      "claimable pool value";

    .card_property_section {
      
      padding: 20px 0;

      .card_property_title {
        font-weight: bold;
        font-size: 1.7rem;
      }
      .card_property_value {
        font-size: 1.7rem;
        margin-top: 10px;
      }
    }

    .farm_earning {
      grid-area: earning;
    }
    .farm_staked {
      grid-area: staked;
    }
    .farm_claimable {
      grid-area: claimable;
    }
    .farm_unstaked {
      grid-area: unstaked;
    }
    .farm_pool_percentage {
      grid-area: pool;
    }
    .farm_value {
      grid-area: value;
    }
  }
`;

export const CardInputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 90%;
  .card_amount_input {
    width: 100%;
    height: 30px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
  }
  button {
    font-family: 'Open Sans' !important;
    position: relative;
    &:hover:enabled {
      top: 1.5px;
    }
    &:disabled {
      background-color: ${({ theme }) => theme.style.buttonDisabledBackground};
      color: ${({ theme }) => theme.style.buttonDisabledFontColor};
    }
  }
`;

export const FarmCardButtonsContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  .farm_card_button {
    width: 49%;
    background-color: ${(props) => props.theme.style.highlight};
    border-radius: 5px;
  }
`;

export const UnderlyingBalanceContainer = styled.div`
  text-align: center;
  width: 90%;
  margin: 10px 0;
  .underlying_balance_label {
    font-size: 1.7rem;
    font-weight: bold;
    margin: 10px 0;

  }
  .farm_underlying {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    img {
      width: 9%;
    }
  }
  .underlying_balance_value {
    font-size: 1.7rem;

    .underlying_profits{
      color: green;
      font-weight: bold;
      margin-top: 10px;
    }
  }
`;

export const FarmGroupContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 50;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-evenly;
  -ms-flex-pack: justify;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  background-color: ${(props) => props.theme.style.lightBackground};
  border-radius: .5rem;
  @media (max-width: ${screen.md}px) {
    flex-direction: column;
  }
`;

export const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PanelTabContainerLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const PanelTabContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const PanelTab = styled.div`
  margin-right: 0.75rem;
  border-radius: 1.2rem;
  border-top: ${(props) => props.theme.style.mainBorder};
  border-left: ${(props) => props.theme.style.mainBorder};
  border-right: ${(props) => props.theme.style.mainBorder};
  padding: 0.75rem 2rem 2rem 2rem;
  background-color: ${(props) => props.theme.style.highlight};
  box-shadow: ${(props) => props.theme.style.panelTabBoxShadow};
  position: relative;
  top: 1.2rem;
  color: ${(props) => props.theme.style.buttonFontColor};

  p {
    color: ${(props) => props.theme.style.panelTabLinkColor};
    text-decoration: none;
    font-family: ${fonts.contentFont};
    font-size: 2rem;
    position: relative;
    top: 0.1rem;
    @media (max-width: 500px) {
      font-size: 1.5rem;
      top: 0.3rem;
    }
  }
  &.refresh-button {
    cursor: pointer;
    top: 1.7rem;
    .fas {
      font-size: 1.7rem;
    }
    &:hover {
      top: 1.9rem;
    }
    &:active {
      color: ${(props) => props.theme.style.blueBackground};
      transform: scale(1.1);
      transition: all 0.1s ease;
    }
  }
  &.refresh-disabled {
    cursor: none;
    pointer-events: none;
    top: 1.7rem;
    .fas {
      font-size: 1.7rem;
    }
    
  }

  
 
  @media (max-width: 605px) {
    font-size: 1.9rem;
    padding: 0.75rem 1rem 2.2rem 1rem;
    position: relative;
    top: 1rem;
  }
  @media (max-width: 550px) {
    margin-right: 0.5rem;
  }
  @media (max-width: 380px) {
    font-size: 1.5rem;
    padding: 0.75rem 0.75rem 2rem 0.75rem;
    position: relative;
    margin-right: 0.5rem;
    top: 0.5rem;
    p {
      top: 0.4rem;
    }
  }
  @media (max-width: 333px) {
    margin-right: 0.3rem;
  }
`;

export const StakedAssetsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${(props) => props.theme.style.mainBorder};
  padding: 10px;
  margin-top: 25px;
  .fas {
    font-size: 1.7rem;
    position: relative;
    cursor: pointer;
    &:hover {
      top: .2rem;
    }
    &:active {
      color: ${(props) => props.theme.style.blueBackground};
      transform: scale(1.1);
      transition: all 0.1s ease;
    }
  }
  h2 {
    font-size: 1.7rem;
    font-weight: bold;
    font-family: ${fonts.headerFont};
  }
`;

export const NoFarmSummariesFound = styled.div`
  position: relative;
  z-index: 50;
  font-family: ${fonts.headerFont};
  font-size: 1.7rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: .5rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  padding: 10px;
  text-align: center;
`;
