import styled from 'styled-components'

const Icon = styled.div`
  background: #000;
  height: 32px;
  margin: 0;
  width: 28px;
`

const Row = styled.div`
  align-items: center;
  border: 1px solid #333; 
  display: flex;
  flex-flow: row nowrap;
  margin: 0 0 20px; 
`

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 76%;
  overflow-y: scroll;
  padding: 20px 12px;
  width: 100%;
`

export const Content = styled.div`
  border: 1px solid #000;
  max-width: 320px; 
`
export const IconBot = styled(Icon)`
  margin: 0 12px 0 0;
`

export const IconUser = styled(Icon)`
  margin: 0 0 0 12px;
`

export const MessageBot = styled(Row)`
  justify-content: flex-start;
`

export const MessageUser = styled(Row)`
  justify-content: flex-end;
`
