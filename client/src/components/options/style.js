import styled from 'styled-components'
import ImageBalloon from '../../images/balloon.svg'

export const Balloon = styled.div`
  background: #fff7ef;
  border: 1px solid #f7921e;
  border-radius: 16px;
  height: fit-content;
  margin: 4px 0 0 0;
  padding: 4px 8px;
`

export const Image = styled(ImageBalloon)`
    height: 36px;
    width: auto;
`

export const Content = styled.div`
  align-items: flex-start;
  display: flex;
`
export const Icon = styled.div`
  height: 44px;
  margin: 0 4px 0 0;
  width: 44px;
`

export const Option = styled.button`
  background: #f7921e;
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

export const Container = styled.div`
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
  margin: 0 0 20px 0;
  padding: 0 20px 0 8px;
`
