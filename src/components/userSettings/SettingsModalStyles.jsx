import styled from "styled-components";
import { fonts } from "../../styles/appStyles";

export const UserSettings = styled.div`
  z-index: 200;
  position: absolute;
  right: 6rem;
  top: 3rem;
  border: ${(props) => props.theme.style.mainBorder};
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.style.lightBackground};
  font-family: ${fonts.contentFont};
  padding: 1%;
  .title {
    font-size: 2rem;
  }
  .currency-options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      font-size: 1.7rem;
      margin: 1rem 0;
    }
    #currencies {
      font-family: ${fonts.headerFont};
      background-color: ${(props) => props.theme.style.blueBackground};
      display: flex;
      width: max-content;
      scrollbar-color: ${(props) => props.theme.style.scrollBarColor};
      scrollbar-width: thin;
      ::-webkit-scrollbar {
        width: 0.5rem;
        height: 100%;
        margin-top: -1.8rem;
      }
      ::-webkit-scrollbar-track:no-button {
        width: 0.5rem;
        border-radius: 0.5rem;
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

      option {
        font-family: ${fonts.contentFont};
        &:hover {
            font-family: ${fonts.headerFont};
        }
      }
    }
  }
`;

export const CloseIcon = styled.span`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  .fas {
    font-size: 1.4rem;
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
`;
