import styled, { css } from 'styled-components'
import Bot from '../../images/bot.png'

export const Button = styled.div`
  align-items: center;
  background: #ffffff;
  border: 2px solid #2f94d0;
  border-radius: 36px;
  bottom: 28px;
  box-shadow: rgba(0, 0, 0, .25) 0px .0625em .0625em, rgba(0, 0, 0, .25) 0px 0.125em .5em, rgba(255, 255, 255, .1) 0px 0px 0px 1px inset;
  cursor: pointer;
  height: 76px;
  margin: 0 0 0 auto;
  padding: 12px;
  position: absolute;
  right: 24px;
  width: 76px;
`

export const Container = styled.div`
  height: 100%;
  position: relative;
  right: 0;
  transition: all .3s;
  transition-timing-function: ease-in-out;
  width: 100%;
  ${({ chatVisible }) => chatVisible && css`
    right: -200px;
    opacity: 0;
    visibility: hidden;
  `}
`

export const Interaction = styled.div`
  border: 2px solid #2f94d0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  bottom: 48px;
  box-shadow: rgba(0, 0, 0, .25) 0px .0625em .0625em, rgba(0, 0, 0, .25) 0px 0.125em .5em, rgba(255, 255, 255, .1) 0px 0px 0px 1px inset;
  height: 36px;
  line-height: 1;
  max-width: 200px;
  opacity: 0;
  padding: 8px 16px 8px 12px;
  position: absolute;
  right: 90px;
  transition: all .2s;
  transition-timing-function: ease-in-out;
  visibility: hidden;
  width: 0;
  z-index: -1;
  
  ${({ chatVisible }) => chatVisible && css`
    right: -200px;
  `}

  ${({ message }) => message && message.active && css`
    opacity: 1;
    transition: opacity .3s, visibility .3s, width .3s;
    visibility: visible;
    width: 100%;
  `}
`

export const Logo = styled.img.attrs(() => ({
  alt: 'Chatbot - Portal UAI',
  src: Bot
}))`
  height: auto;
  width: 100%;
`
