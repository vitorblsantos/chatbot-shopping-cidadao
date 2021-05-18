import styled from 'styled-components'

export const Container = styled.div`
  background: #f7f7f7;
  border: 1px solid #0179c0;
  border-bottom: 0;
  border-top: 0;
  display: flex;
  flex-flow: column nowrap;
  height: 76%;
  overflow-y: scroll;
  padding: 20px 12px;
  transition: all .3s ease-in-out;
  width: 100%;
`

export const Icon = styled.div`
  height: 44px;
  margin: 0 8px 0 0;
  width: 44px;
`

export const Option = styled.button`
  background: #e8c33b;
  border: 0;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  font-size: .75rem;
  font-weight: bold;
  padding: 8px 2px;
  width: 48%;
  :nth-of-type(odd){
    margin-right: auto;
  }
  :nth-of-type(-n + 2){
    margin-bottom: 8px;
  }
`

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 8px 0 0;
  padding: 0 0 0 52px;
  width: 100%;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 20px;
`
