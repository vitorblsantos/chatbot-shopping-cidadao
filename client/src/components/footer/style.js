import styled from 'styled-components'
import SendImage from '../../images/send.svg'

export const Button = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 12px;
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
  background: #0179c0;
  border: 1px solid #0179c0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  bottom: 0;
  display: flex;
  height: 68px;
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
    top: 0;
    width: 100%;
  }
`
export const Input = styled.input`
  background: transparent;
  border: 0;
  border-radius: 8px;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  color: #FFFFFF;
  font-size: 1rem;
  height: 32px;
  padding: 4px 8px;
  width: 79%;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #FFFFFF;
  }
`
export const Send = styled(SendImage)`
`
