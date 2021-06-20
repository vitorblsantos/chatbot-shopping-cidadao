import styled from 'styled-components'

export const Option = styled.button`
  background: #f7921e;
  border: 0;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  font-size: .75rem;
  font-weight: bold;
  height: 32px;
  margin: 4px 0 0 auto;
  padding: 8px 2px;
  width: 48%;
  :nth-child(n+3) {
    margin: 8px 0 0 auto;
  }
`

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 20px 0 52px;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  flex: 1;
  margin: 0;
`
