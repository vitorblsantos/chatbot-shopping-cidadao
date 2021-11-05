import styled, { css } from 'styled-components'
import iconArrow from '../../images/icon-arrow.png'
import iconCalendar from '../../images/icon-calendar.png'

const arrow = styled.div`
  background: url(${iconArrow}) no-repeat;
  background-color: #fff;
  background-position: center;
  background-size: 10px;
  border: 1px solid #f7921e;
  border-radius: 20px;
  height: 28px;
  position: absolute;
  top: 80px;
  width: 28px;
  z-index: 10;
`

export const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  margin: 4px 0 0;
`

export const Bold = styled.span`
  font-weight: 600;
`

export const Container = styled.div`
  display: inline-block;
  margin: 12px 0 0;
  padding: 8px 4px;
  position: relative;
  width: 100%;
`

export const Calendar = styled.img.attrs(() => ({
  alt: '',
  src: iconCalendar
}))`
  height: 32px;
  width: auto;
`

export const Header = styled.div`
  align-items: center;
  display: flex;
`

export const Item = styled.div`
  align-items: center;
  display: inline-flex !important;
  flex-flow: column nowrap;
  justify-content: center;
`

export const NextArrow = styled(arrow)`
  right: 8px;
`

export const Option = styled.div`
  background: #f8f6f2;
  border: 1px solid #f7921e;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-size: .7rem;
  font-weight: bold;
  height: 172px;
  margin: 0 4px;
  padding: 8px 12px;
  width: 264px;
`

export const PrevArrow = styled(arrow)`
  background-position-x: 9px;
  left: 10px;
  transform: rotate(180deg);
`

export const Row = styled.div`
  align-items: center;
  color: #333;
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  font-weight: 500;

  ${({ end }) => end && css`
    justify-content: flex-end;
    margin: 8px 0 0;
  `}
`

export const Text = styled.label`
  color: #333;
  ${({ body }) => body && css`
    font-size: 12px;
    margin: 0 0 0 4px;
  `}

  ${({ title }) => title && css`
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 4px 8px;
    text-transform: capitalize;
  `}
`
