import styled from '@emotion/styled'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  -webkit-touch-callout: none;
`;

export const TimerBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  flex: 0 0 4px;
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
`

export const ImagesWrapper = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`

export const ImageWrapperDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const ImageWrapperA = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`