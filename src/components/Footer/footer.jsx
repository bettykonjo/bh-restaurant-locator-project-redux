import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #333;
  color: #fefefe;
  padding: 1rem 0;
  text-align: center;
  position:fixed;
  bottom:0;
  width: 100%; 
`;

const Footer = () => {
  return (
    <FooterWrapper>
      Betelihem A Hayle and Frankie Avina © 2022
    </FooterWrapper>
  );
};

export default Footer;