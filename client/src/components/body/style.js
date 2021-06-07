import styled from 'styled-components'

export const Container = styled.div`
  background: #f7f7f7;
  border: 1px solid #272525;
  border-bottom: 0;
  border-top: 0;
  display: flex;
  flex-flow: column nowrap;
  height: 74%;
  overflow: hidden;
  width: 100%;
`

export const Overflow = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px 0;
  width: 332px;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 20px;
  overflow-x: hidden;
`
