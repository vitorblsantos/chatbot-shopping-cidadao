import styled from 'styled-components'

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
export const Submit = styled.button`
  background: url('https://lh3.googleusercontent.com/proxy/RVMis0a7zIE7yj78HKuFpUwuIA7zLNBXX4jFzM_V6ga6Yn1O9MOJN_d-m5GYnev7BEEA0kwALQRHbBLSgg--YmVj7cOoffeviWJCYs0ppVhe3zkUpVMvWJs') no-repeat;
  background-position: center;
  background-size: 24px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
  height: 42px;
  margin: 0 0 0 auto;
  width: 36px;

  :focus {
    outline: none;
  }
`
