import styled from 'styled-components'
import ImageBalloon from '../../images/balloon.svg'

export const Balloon = styled.div`
  align-items: center;
  background: #fff7ef;
  border: 1px solid #f7921e;
  border-radius: 16px;
  display: flex;
  margin: 0;
  padding: 4px 8px;
`

export const Image = styled(ImageBalloon)`
  height: 36px;
  width: auto;
`

export const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
`
export const Icon = styled.div`
  height: 44px;
  margin: 0 8px 0 0;
  width: 44px;
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 12px 0;
`
