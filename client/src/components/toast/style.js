import styled, { css } from 'styled-components'
import Bot from '../../images/bot.png'

export const Button = styled.div`
  align-items: center;
  background: #ffffff;
  border: 2px solid #2f94d0;
  border-radius: 36px;
  bottom: 0;
  box-shadow: rgba(0, 0, 0, .25) 0px .0625em .0625em, rgba(0, 0, 0, .25) 0px 0.125em .5em, rgba(255, 255, 255, .1) 0px 0px 0px 1px inset;
  cursor: pointer;
  height: 76px;
  margin: 0 0 0 auto;
  padding: 12px;
  position: relative;
  right: 24px;
  width: 76px;
`

export const Container = styled.div`
  align-items: center;
  bottom: 20px;
  display: flex;
  height: 80px;
  position: absolute;
  right: 0;
  transition: all .2s;
  transition-timing-function: ease-in-out;
  width: 100%;
  ${({ active }) => !active && css`
    right: -312px;
    opacity: 0;
    visibility: hidden;
  `}
`

export const Logo = styled.img.attrs(() => ({
  alt: 'Chatbot - Portal UAI',
  src: Bot
}))`
  height: auto;
  width: 100%;
`
