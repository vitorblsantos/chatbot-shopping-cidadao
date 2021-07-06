import styled from 'styled-components'
import ImageBalloon from '../../images/balloon.svg'

export const Balloon = styled.div`
  align-items: center;
  background: #fff7ef;
  border: 1px solid #f7921e;
  border-radius: 16px;
  display: flex;
  font-size: .95rem;
  height: fit-content;
  line-height: 1.2;
  margin: 4px 0 0 0;
  padding: 8px 12px;
`

export const Image = styled(ImageBalloon)`
  height: 36px;
  width: auto;
`

export const Icon = styled.div`
  height: 44px;
  margin: 0 4px 0 0;
  width: 44px;
`

export const Row = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: nowrap;
  padding: 0 20px 0 8px;
`
