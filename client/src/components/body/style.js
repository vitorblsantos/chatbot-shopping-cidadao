import styled, { css, keyframes } from 'styled-components'
import WarningImage from '../../images/icon-warning.png'

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
  background: #f5f5f5;
  border: 1px solid #272525;
  border-bottom: 0;
  border-top: 0;
  display: flex;
  flex-flow: column nowrap;
  height: 75%;
  overflow: hidden;
  width: 100%;
`

export const Overflow = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px 0 32px;
  position: relative;
  width: 332px;
`

export const Row = styled.div`
  animation: ${MessageAnimation} .5s ease-in-out;
  display: flex;
  position: relative;

  ${({ user }) => !user
    ? css`
      &:not(:first-of-type) {
        margin: 16px 0 0;
      }
    `
    : css`
      margin: 24px 0 0;
    `
}
`

export const Status = styled.div`
  align-items: center;
  background: rgb(28 24 24 / 46%);
  color: #ffffff;
  display: flex;
  font-size: .75rem;
  font-weight: 700;
  height: 24px;
  justify-content: center;
  letter-spacing: .8px;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
`
export const Warning = styled.img.attrs(() => ({
  src: WarningImage
}))`
  margin: 0 4px 0 0;
  height: 10px;
  width: auto;
`
