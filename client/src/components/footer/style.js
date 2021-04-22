import styled from 'styled-components'
import SendImage from '../../images/send.svg'

export const Button = styled.button`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  height: 42px;
  justify-content: center;
  margin: 0 0 0 auto;
  width: 40px;

  :focus {
    outline: none;
  }
`

export const Container = styled.div`
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  bottom: 0;
  display: flex;
  height: 60px;
  justify-content: flex-start;
  padding: 0 12px;
  position: relative;
  width: 100%;
  :before {
    background: #ccc;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    top: -4px;
    width: 100%;
  }
`
export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  height: 32px;
  padding: 4px 8px;
  width: 79%;
  :focus {
    outline: none;
  } 
`
export const Send = styled(SendImage)`
  height: 24px;
  width: auto;
`
