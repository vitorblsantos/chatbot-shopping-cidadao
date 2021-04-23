import styled, { css } from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background: #ffffff;
  border: 2px solid #2f94d0;
  border-radius: 36px;
  bottom: 0;
  cursor: pointer;
  display: flex;
  height: 80px;
  justify-content: center;
  margin: 0 0 0 auto;
  opacity: 1;
  position: absolute;
  right: 0;
  transition: all .3s;
  transition-timing-function: ease-in-out;
  visibility: visible;
  width: 100px;
  ${({ active }) => active && css`
    right: -200px;
    opacity: 0;
    visibility: hidden;
  `}

`
