import styled, { css } from 'styled-components'
import iconCalendar from '../../images/icon-calendar.png'

export const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  margin: 4px 0 0;
`

export const Bold = styled.span`
  font-weight: 600;
`

export const Button = styled.button`
  border: 0;
  border-radius: 20px;
  color: #FFF;
  cursor: pointer;
  font-weight: 600;
  padding: 4px 8px;

  ${({ success }) => success && css`
    background: #26B16D;
    margin: 0 0 0 8px;
  `}

  ${({ error }) => error && css`
    background: #e96658;
  `}
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
  `}
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
  width: 280px;
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
