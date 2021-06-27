import styled, { css, keyframes } from 'styled-components'

const MessageAnimation = keyframes`
  0% {
    opacity: 0;
    visibility: hidden;
  } 30% {
    opacity: 1;
    visibility: visible;
  }
`

export const Container = styled.div`
  background: #f7f7f7;
  border: 1px solid #272525;
  border-bottom: 0;
  border-top: 0;
  display: flex;
  flex-flow: column nowrap;
  height: 74%;
  overflow: hidden;
  width: 100%;
`

export const Overflow = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px 0;
  position: relative;
  width: 332px;
`

export const Row = styled.div`
  animation: ${MessageAnimation} .5s ease-in-out;
  display: flex;
  position: relative;
  :nth-of-type(even) {
    margin: 12px 0;
  }

  ${({ user }) => user && css`
    margin: 12px 0 0 !important;
  `}

`
