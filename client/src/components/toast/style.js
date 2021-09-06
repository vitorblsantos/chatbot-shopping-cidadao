import styled, { css } from 'styled-components'
import Bot from '../../images/bot.png'

export const Button = styled.button`
  align-items: center;
  background: #ffffff;
  border: 2px solid #3c3c3c;
  border-radius: 36px;
  bottom: 0;
  box-shadow: rgba(0, 0, 0, .25) 0px .0625em .0625em, rgba(0, 0, 0, .25) 0px 0.125em .5em, rgba(255, 255, 255, .1) 0px 0px 0px 1px inset;
  cursor: pointer;
  height: 76px;
  margin: 0 0 0 auto;
  padding: 12px;
  position: relative;
  right: 0;
  width: 76px;
`

export const Container = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`

export const Logo = styled.img.attrs(() => ({
  alt: 'Chatbot - Portal UAI',
  src: Bot
}))`
  height: auto;
  width: 100%;
`

export const Message = styled.div`
  align-items: center;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 32px;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: rgba(0, 0, 0, .25) 0px .0625em .0625em, rgba(0, 0, 0, .25) 0px 0.125em .5em, rgba(255, 255, 255, .1) 0px 0px 0px 1px inset;
  display: flex;
  font-size: 1rem;
  height: 56px;
  justify-content: center;
  opacity: 0;
  max-width: 180px;
  padding: 4px 16px 4px 12px;
  position: absolute;
  right: 64px;
  text-align: center;
  transition: all .2s ease-in-out, width .3s;
  visibility: hidden;
  width: 0;
  ${({ active }) => active && css`
    opacity: 1;
    transition: all .3s;
    visibility: visible;
    width: 100%;
  `}
`

export const Position = styled.div`
  bottom: 20px;
  position: fixed;
  height: 80px;
  opacity: 1;
  right: 12px;
  transition: all .2s;
  transition-timing-function: ease-in-out;
  visibility: visible;
  width: 320px;
  ${({ active }) => !active && css`
    opacity: 0;
    right: -320px;
    visibility: hidden;
  `}
`
