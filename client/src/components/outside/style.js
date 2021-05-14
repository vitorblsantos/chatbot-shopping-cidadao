import styled from 'styled-components'

export const Container = styled.div`
  bottom: 0;
  overflow: hidden;
  height: ${({ active }) => active ? '500px' : '132px'};
  position: fixed;
  right: 0;
  width: 352px;

`
