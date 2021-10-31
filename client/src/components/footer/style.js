import styled from 'styled-components'
import SendImage from '../../images/icon-submit.png'

export const Background = styled.div`
  background: #f9f9f9;
  border-radius: 24px;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
`

export const Button = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 15%;
  :before {
    background: #333;
    border-radius: 100%;
    content: '';
    left: -4px;
    position: absolute;
    top: 7px;
    width: 2px;
    height: 70%;
  }
  :focus {
    outline: none;
  }
`

export const Container = styled.div`
  align-items: center;
  background: #3c3c3c;
  border: 1px solid #3c3c3c;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  height: 80px;
  justify-content: center;
  padding: 16px 4px;
  position: relative;
  width: 100%;

  &:before {
    background: #3c3c3c;
    box-shadow: 0px 4px 20px #fff, 0px -4px 20px #3c3c3c;
    content: '';
    height: 1px;
    left: -2px;
    position: absolute;
    top: 0;
    width: 100%;
  }
`

export const Input = styled.input`
  background: transparent;
  border: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: #3c3c3c;
  font-size: .88rem;
  font-weight: 500;
  height: 100%;
  padding: 0 12px;
  width: 77%;
`
export const Send = styled.div`
  background: url(${SendImage}) no-repeat;
  background-position: center;
  background-size: contain;
  height: 32px;
  width: 24px;
`
