import styled from 'styled-components'
import ImagePortalDesk from '../../images/background-desktop.png'
import ImagePortalMobi from '../../images/background-mobile.png'

export const Background = styled.div`
  background: url(${ImagePortalDesk}) no-repeat;
  background-size: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  @media(max-width: 992px) {
    background: url(${ImagePortalMobi}) no-repeat;
    background-size: 100% 100%;
  }
`

export const Container = styled.div`
  bottom: 0;
  height: 600px;
  overflow: hidden;
  position: fixed;
  right: 0;
  width: 364px;
`
export const Relative = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`
