import styled, { keyframes } from 'styled-components'
import ImageBalloon from '../../images/icon-chat-bubble.png'

const animation = keyframes`
  0% { transform: scaleY(.25) }
  20% { transform: scaleY(.5) }
  40%, 100% { transform: scaleY(.25) } 
`

export const Bot = styled.div`
  background: url(${ImageBalloon}) no-repeat;
  background-size: contain;
  height: 36px;
  width: 36px;
`

export const Container = styled.div`
  display: block;
  height: 44px;
  margin: 0;
  div {
    animation: ${animation} 1.2s infinite ease-in-out;
    background: #f7921e;
    border-radius: 24%;
    display: inline-block;
    height: 44px;
    margin-left: 3px;
    width: 3px;

    :nth-of-type(2) {
      animation-delay:-1.1s;
    }

    :nth-of-type(3) {
      animation-delay:-1s;
    }

    :nth-of-type(4) {
      animation-delay:-.9s;
    }

    :nth-of-type(5) {
      animation-delay:-.8s;
    }
  }
`

export const Icon = styled.div`
  height: 32px;
  margin: 0 8px 0 0;
  width: auto;
`

export const NoWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

export const Row = styled.div`
  display: flex;
  margin: 4px 0 0;
  padding: 0 20px 0 8px;
`
