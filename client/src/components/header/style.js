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
  border: 1px solid #000000;
  border-bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #3c3c3c;
  display: flex;
  height: 52px;
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

export const Status = styled.div`
  align-items: center;
  background: #f7921e;
  border: 1px solid #000;
  border-bottom: 0;
  border-top: 0;
  color: #ffffff;
  display: flex;
  font-size: .8rem;
  height: 8px;
  justify-content: center;
  width: 100%;
`
