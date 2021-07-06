import styled, { css } from 'styled-components'

export const Container = styled.div`
  box-shadow: 0 12px 24px 0 rgb(0 0 0 / 15%);
  background: #ffffff;
  border: 0;
  border-radius: 10px;
  bottom: 20px;
  height: 0;
  opacity: 0;
  margin: 0 0 0 auto;
  position: absolute;
  right: 12px;
  transition: height .1s, opacity .1s, visibility .1s, width .1s;
  transition-timing-function: ease-in-out;
  visibility: hidden;
  width: 0;

  ${({ active }) => active && css`
    height: 500px;
    opacity: 1;
    transition: height .3s, opacity .5s, margin .2s, visibility .5s, width .1s;
    transition-timing-function: ease-in-out;
    visibility: visible;
    width: 320px;
  `}
`
