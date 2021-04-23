import styled, { css } from 'styled-components'

export const Container = styled.div`
  bottom: 20px;
  overflow: hidden;
  height: 84px;
  position: fixed;
  right: 20px;
  width: 120px;

  ${({ active }) => active && css`
    height: 600px;
    width: 400px;
  `}
`
