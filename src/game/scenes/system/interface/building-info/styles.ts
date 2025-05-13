import styled, { css } from 'styled-components';

import { INTERFACE_MOBILE_BREAKPOINT, INTERFACE_DESKTOP_BREAKPOINT } from '~const/interface';
import {
  InterfaceFont,
  InterfaceTextColor,
  InterfaceBackgroundColor,
} from '~type/interface';

export const Wrapper = styled.div`
  @media ${INTERFACE_DESKTOP_BREAKPOINT} {
    width: 250px;
    position: absolute;
    transform: translate(-50%, -100%);
    margin-top: -15px;
    &::after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 100%);
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-top: 15px solid ${InterfaceBackgroundColor.BLACK_TRANSPARENT_50};
    }
  }
  @media ${INTERFACE_MOBILE_BREAKPOINT} {
    pointer-events: all;
    width: 200px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: ${InterfaceBackgroundColor.BLACK_TRANSPARENT_75};
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Container = styled.div`
  overflow: hidden;
  /* backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transform: translateZ(0);
  -webkit-transform: translateZ(0); */
  @media ${INTERFACE_DESKTOP_BREAKPOINT} {
    border-radius: 10px;
  }
`;

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background: ${InterfaceBackgroundColor.BLACK};
`;

export const Body = styled.div`
  padding: 16px;
  @media ${INTERFACE_DESKTOP_BREAKPOINT} {
    background: ${InterfaceBackgroundColor.BLACK_TRANSPARENT_50};
  }
`;

export const Name = styled.div`
  font-family: ${InterfaceFont.PIXEL_LABEL};
  color: ${InterfaceTextColor.SUCCESS};
  font-size: 14px;
  line-height: 14px;
`;

export const Level: any = styled.div`
  display: flex;
  gap: 5px;
`;

Level.Progress = styled.div<{
  $active?: boolean
}>`
  flex: 1;
  height: 12px;
  transition: all 0.2s ease-out;
  background: ${InterfaceBackgroundColor.BLACK};
  box-shadow: 0 6px 0 #222 inset;
  ${(props) => props.$active && css`
    background: ${InterfaceBackgroundColor.SUCCESS};
    box-shadow: 0 6px 0 ${InterfaceBackgroundColor.WHITE_TRANSPARENT_15} inset;
  `}
`;

export const Health: any = styled.div`
  background: ${InterfaceBackgroundColor.BLACK};
  position: relative;
  margin-bottom: 6px;
`;

Health.Progress = styled.div`
  height: 14px;
  background: ${InterfaceBackgroundColor.ERROR};
  box-shadow: 0 7px 0 ${InterfaceBackgroundColor.WHITE_TRANSPARENT_15} inset;
  transition: width 0.3s ease-out;
`;

Health.Value = styled.div`
  position: absolute;
  font-family: ${InterfaceFont.PIXEL_LABEL};
  color: #fff;
  font-size: 10px;
  line-height: 10px;
  text-shadow: 1px 1px 0 #000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  padding-bottom: 2px;
`;
