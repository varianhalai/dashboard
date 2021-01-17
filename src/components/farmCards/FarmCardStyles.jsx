import styled from "styled-components";
import { fonts, screen } from "../../styles/appStyles";

export const FarmCardContainer = styled.div`
  width: 33%;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 25px;
  padding: 20px;
  color: ${(props) => props.theme.style.primaryFontColor};
  background-color: ${(props) => props.theme.style.lightBackground};
  display: -ms-grid;
  display: grid;
  font-family: ${fonts.contentFont};
  margin: 10px 0;

  @media (max-width: ${screen.lg}px) {
    width: 49%;
  }

  @media (max-width: ${screen.md}px) {
    width: 100%;
  }

  .farm_card_title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
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
      text-align: left;
      padding: 20px;

      .card_property_title {
        font-weight: bold;
        font-size: 16px;
      }
      .card_property_value {
        font-size: 14px;
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
  width: 100%;
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
    border-radius: 8px;
  }
`;

export const UnderlyingBalanceContainer = styled.div`
  text-align: left;
  margin: 10px 0;
  .underlying_balance_label {
    font-size: 16px;
    font-weight: bold;
  }
  .underlying_balance_value {
    font-size: 16px;
  }
`;

export const FarmGroupContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -ms-flex-pack: justify;

  @media (max-width: ${screen.md}px) {
    flex-direction: column;
  }
`;

export const StakedAssetsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${(props) => props.theme.style.mainBorder};
  box-shadow: ${(props) => props.theme.style.panelBoxShadow};
  padding: 10px;
  margin-top: 25px;
  background-color: ${(props) => props.theme.style.highlight};
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
  font-family: ${fonts.headerFont};
  font-size: 18px;
  border: ${(props) => props.theme.style.mainBorder};
  padding: 10px;
  text-align: center;
`;
