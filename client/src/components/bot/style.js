import styled from 'styled-components'
import ImageBalloon from '../../images/balloon.svg'

export const Balloon = styled.div`
  align-items: center;
  background: #fff7ef;
  border: 1px solid #f7921e;
  border-radius: 16px;
  display: flex;
  height: fit-content;
  margin: 4px 0 0 0;
  padding: 4px 8px;
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
  margin: 0 0 20px 0;
  padding: 0 20px 0 8px;
`
