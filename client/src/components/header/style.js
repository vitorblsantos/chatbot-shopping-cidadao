import styled from 'styled-components'
import ImageBot from '../../images/bot.png'

export const Bot = styled.img.attrs(() => ({
  src: ImageBot
}))`
  margin: 0 8px;
  position: relative;
  top: -2px;
  width: 32px;
`

export const Button = styled.button`
  align-items: center;
  background: transparent;
  border: 0px;
  border-radius: 20px;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  font-size: 2.1rem;
  height: 32px; 
  justify-content: center;
  margin: 0 8px 0 auto;
  position: relative;
  top: -2px;
  transform: rotate(45deg);
  text-align: center;
  transition: all .3s ease-in-out;
  width: 32px;

  :focus {
    outline: 0;
  }

  :hover {
    color: #d4d4d4;
  }
`

export const Container = styled.div`
  align-items: center;
  border-bottom: 0;
  display: flex;
  height: 48px;
  justify-content: center;
  line-height: 1;
  position: relative;
  top: 0;
  width: 100%;
`

export const Span = styled.span`
  color: #ffffff;
  font-weight: 600;
  position: relative;
`

export const Wrapper = styled.div`
  background: #3c3c3c;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: rgba(247, 146, 30, .4) 0px 5px, rgba(247, 146, 30, .3) 0px 10px, rgba(247, 146, 30, .2) 0px 15px;
  position: relative;
  z-index: 3;
`
