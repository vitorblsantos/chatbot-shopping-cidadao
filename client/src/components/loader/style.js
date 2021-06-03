import styled, { keyframes } from 'styled-components'
import ImageBalloon from '../../images/balloon.svg'

const animation = keyframes`
  0% { transform: scaleY(.25) }
  20% { transform: scaleY(.5) }
  40%, 100% { transform: scaleY(.25) } 
`

export const Bot = styled(ImageBalloon)`
  height: 40px;
  width: auto;
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
    margin-top: 8px;
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
  height: 44px;
  margin: 0 4px 0 0;
  width: 44px;
`

export const NoWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

export const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 20px;
`
