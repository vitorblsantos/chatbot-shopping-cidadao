import styled from 'styled-components'

export const Button = styled.button`
  background: transparent;
  border: 0px;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 2rem;
  margin: 0 16px 0 auto; 
  transform: rotate(45deg);
  transition: all .3s ease-in-out;
  :focus {
    outline:0;
  }
  :hover {
    color: #333333;
  }
`

export const Container = styled.div`
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #2f94d0;
  display: flex;
  height: 52px;
  justify-content: center;
  line-height: 1;
  position: relative;
  top: 0;
  width: 100%;
  :after {
    background: #0179c0;
    bottom: 0;
    content: '';
    height: 8px;
    position: absolute;
    width: 100%;
  }
`
