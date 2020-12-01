import React,{useContextm} from 'react';
import ReactModal from 'react-modal-resizable-draggable';
import {AnimatePresence,motion } from "framer-motion";
import RadioPanel from './RadioPanel';
import styled from 'styled-components';
import { fonts } from '../../styles/appStyles';







const RadioTitle=styled.div`
display: flex;
align-items: center;
justify-content: center;
text-align: center;
font-family: ${fonts.headerFont};
font-size: 1.7rem;
position: relative:
z-index: 400;
pointer-events: auto;
h4 {
  margin-top: .2rem;
}
`;

const CloseIcon = styled.span`
  position: absolute;
  right: 1.3rem;
  top: .2rem;
  font-size: 1.7rem;
  cursor: pointer;
  color: ${(props) => props.theme.style.buttonFontColor};

  .fas {
    position: relative;
    z-index: 500;
    &:hover {
      top: 1.5px;
    }
  }
`;

const Radio = ({radio, toggleRadio}) => {

   
    return (
      <ReactModal
        isOpen={radio}
        onRequestClose={toggleRadio}
        className={"draggable-radio"}
        initWidth={325} 
        initHeight={100}
        top={0}
        left={0}
        disableResize={true}
        >
        <RadioTitle>
          <h4>harvest radio</h4>
          <CloseIcon onClick={toggleRadio} ><i className="fas fa-times-circle "></i></CloseIcon>
        </RadioTitle>
        <RadioPanel toggleRadio={toggleRadio} />
      </ReactModal>

      
    );
}

export default Radio;
