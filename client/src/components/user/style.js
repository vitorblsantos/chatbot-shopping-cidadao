import styled from 'styled-components'

export const Balloon = styled.div`
  background: #2222220a;
  border: 1px solid #222;
  border-radius: 20px;
  border-top-right-radius: 4px;
  display: flex;
  font-size: .9rem;
  height: fit-content;
  justify-content: flex-end;
  line-height: 1.2;
  margin: 0 0 0 auto;
  padding: 8px 12px;
  position: relative;
  text-align: left;
  width: auto;
`
export const Hour = styled.div`
  bottom: -16px;
  color: #333;
  font-size: .53rem;
  position: absolute;
  right: 4px;
`

export const Row = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  padding: 0 20px 0 52px;
`
