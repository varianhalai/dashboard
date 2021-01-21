import styled from 'styled-components';
import {fonts} from '../../../styles/appStyles';


export const Drawer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50vw;
    height: 100%;
    position: fixed;
    z-index: 600;
    background-color: ${(props) => props.theme.style.lightBackground};
    padding: 0 2%;

    .harvest {
      font-size: 3rem;
      width: 100%;
      text-align: center;
    }

    .wiki-radio {
      padding: 2%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      
    }

    .analytics-header {
      font-size: 3rem;
      text-decoration: underline;
    }

    
    .drawer-analytics {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2rem;

    }
    @media(min-width: 1160px) {
      display: none;
    }
`;

export const DrawerLink = styled.a`
font-size: 2.2rem;
position: relative;
background-color: ${(state) => state.theme.style.highlight};
color: ${(props) => props.theme.style.primaryFontColor};
font-family: ${fonts.contentFont};
border-radius: 0.8rem;
margin: 1.5rem 0;
padding: 1rem;
transition: all 0.2s ease;
width: max-content;
text-decoration: none;
&.harvest {
  font-size: 3rem;
}



@media (max-width: 768px) {
  top: 2rem;
}
`;

export const Radio = styled.p`
font-size: 2.2rem;
position: relative;
background-color: ${(state) => state.theme.style.highlight};
color: ${(props) => props.theme.style.primaryFontColor};
font-family: ${fonts.contentFont};
border-radius: 0.8rem;
margin: 1.5rem 0;
padding: 1rem;
transition: all 0.2s ease;
width: max-content;
text-decoration: none;
&.harvest {
  font-size: 3rem;
}



@media (max-width: 768px) {
  top: 2rem;
}
`;

export const Brand = styled.div`
  padding-right: 1rem;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 4rem;
  height: 2.5rem;

  img {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    margin-left: 0.5rem;
  }

  span {
    color: ${(props) => props.theme.style.primaryFontColor};
    font-family: ${fonts.contentFont};
    font-size: 2.5rem;
  }

  @media (min-width: 1500px) {
    margin: 3rem 0;
  }
`;


