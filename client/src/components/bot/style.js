import styled from 'styled-components'
import ImageBalloon from '../../images/balloon.svg'

export const Balloon = styled.div`
  background: #fff7ef;
  border: 1px solid #f7921e;
  border-radius: 16px;
  border-top-left-radius: 4px;
  margin: 20px 0 0;
  padding: 8px 12px;
`

export const Image = styled(ImageBalloon)`
  height: 40px;
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
  margin: 0;
`
