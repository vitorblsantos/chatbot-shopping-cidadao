import styled, { css } from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background: #ffffff;
  border: 2px solid #2f94d0;
  border-radius: 32px;
  bottom: 0;
  cursor: pointer;
  display: flex;
  height: 80px;
  justify-content: center;
  left: 0;
  margin: 0 0 0 auto;
  opacity: 1;
  position: relative;
  transition: all .3s ease-in-out;
  visibility: visible;
  width: 112px;
  ${({ active }) => active && css`
    left: 112px;
    opacity: 0;
    visibility: hidden;
  `}

`
