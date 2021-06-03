import styled, { css } from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  border: 0;
  border-radius: 10px;
  bottom: 16px;
  height: 0;
  opacity: 0;
  margin: 0 0 0 auto;
  position: absolute;
  right: 24px;
  transition: height .1s, opacity .2s, margin .2s, visibility .2s, width .1s;
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
