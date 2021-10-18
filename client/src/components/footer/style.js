import styled from 'styled-components'
import SendImage from '../../images/send.svg'

export const Background = styled.div`
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  width: 100%;
`

export const Button = styled.button`
  align-items: center;
  background: #ffffff;
  border: 0;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  cursor: pointer;
  display: flex;
  height: 42px;
  justify-content: center;
  width: 40px;
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
  height: 68px;
  justify-content: center;
  padding: 0 4px;
  position: relative;
  width: 100%;
`

export const Input = styled.input`
  border: 0;
  box-shadow: rgba(0, 0, 0, .16) 0px 10px 36px 0px, rgba(0, 0, 0, .06) 0px 0px 0px 1px;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
  color: #000000;
  font-size: .9rem;
  height: 32px;
  padding: 4px 12px;
  width: 100%;
`
export const Send = styled(SendImage)`
  height: 24px;
  width: auto;
`
