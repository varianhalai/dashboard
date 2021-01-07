import React, { useContext } from "react";
import HarvestContext from "../../../Context/HarvestContext";
import styled from "styled-components";
import { font } from "../../../styles/appStyles";

const AnalyticsModal = ({ showAnalytics, setShowAnalytics }) => {
  const { state } = useContext(HarvestContext);
  return (
    <Modal className={showAnalytics ? "show" : "hidden"}>
      <CloseIcon onClick={() => setShowAnalytics(false)}>
        <i className="fas fa-times-circle fa-2x"></i>
      </CloseIcon>
      <a
        className="analyti-link first"
        href="https://farmdashboard.xyz/"
        target="_blank"
        rel="noopener noreferrer"
      >
        FARM statistics
      </a>

      <a
        className="analyti-link"
        href="https://duneanalytics.com/0xBoxer/-grain"
        target="_blank"
        rel="noopener noreferrer"
      >
        GRAIN analytics
      </a>
    </Modal>
  );
};

export default AnalyticsModal;

const Modal = styled.div`
  &.show {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: ${(state) => state.theme.style.mainBorder};
    background-color: ${(state) => state.theme.style.highlight};
    position: absolute;
    z-index: 500;
    width: max-content;
    left: 8rem;
    top: -0.8rem;
    border-radius: 0.8rem;
    padding: 1.5rem;
    transition: all 0.3s ease-out;

    .analyti-link {
      font-size: 1.9rem;
      position: relative;
      background-color: ${(state) => state.theme.style.wikiTabBackground};
      border-radius: 0.8rem;
      margin: 1.5rem 0;
      padding: 1rem;
      transition: all 0.25s ease;
      &.first {
        @media (max-width: 768px) {
          top: 2rem;
        }
      }

      &:hover {
        transform: scale(1.05);
        border: ${(state) => state.theme.style.mainBorder};
      }
    }

    @media (max-width: 500px) {
      left: 0;
      right: 8rem;
      margin: auto;
    }
  }

  &.hidden {
    display: none;
    transition: all 0.3s ease-out;
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  .fas {
    position: relative;
    &:hover {
      top: 1.5px;
    }
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
