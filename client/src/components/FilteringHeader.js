import React, { useState } from "react";
import styled from "styled-components";

const FilteringHeader = () => {
  return (
    <>
      <Wrapper>
        <Container>Filters</Container>
      </Wrapper>
    </>
  );
};

export default FilteringHeader;

const Wrapper = styled.div`
  height: 100%;
  max-width: 190px;
  width: 160px;
  position: absolute;
  margin-right: 30px;
  left: 0px;
  color: white;
  background-color: var(--color-headers-background);
  font-family: var(--font-family-jost);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
