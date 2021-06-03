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
  transition: all .3s ease-in-out;
  width: 100%;
`

export const Overflow = styled.div`
  overflow-y: scroll;
  padding: 20px 24px 0px 8px;
  width: 105%;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 20px;
`
