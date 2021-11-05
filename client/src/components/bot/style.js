import styled from 'styled-components'
import ImageBalloon from '../../images/icon-chat-bubble.png'

export const Balloon = styled.div`
  align-items: center;
  background: #fff7ef;
  border: 1px solid #f7921e;
  border-radius: 8px;
  border-top-left-radius: 4px;
  display: flex;
  font-size: .9rem;
  height: fit-content;
  line-height: 1.2;
  margin: 8px 0 0;
  padding: 8px 12px;
  position: relative;
  max-width: 248px;
`

export const Hour = styled.div`
  bottom: -16px;
  color: #333;
  font-size: .53rem;
  position: absolute;
  right: 4px;
`

export const Image = styled.div`
  background: url(${ImageBalloon}) no-repeat;
  background-position: center;
  background-size: 32px;
  height: 32px;
`

export const Icon = styled.div`
  height: 40px;
  margin: 0 8px 0 0;
  width: 36px;
`

export const Row = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: nowrap;
  padding: 0 12px 0 8px;

  @media (max-width: 992px) {
    padding-right: 28px;
  }
`
