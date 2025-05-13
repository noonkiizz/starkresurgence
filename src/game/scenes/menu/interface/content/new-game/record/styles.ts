import styled from 'styled-components';

import { InterfaceFont } from '~type/interface';

export const Wrapper = styled.div`
  margin-bottom: 40px;
`;

export const Label = styled.div`
  color: #fff;
  margin-bottom: 10px;
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 14px;
  line-height: 14px;
  opacity: 0.5;
`;

export const Value = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  margin-right: 10px;
  width: 20px;
`;

export const Amount = styled.div`
  margin-top: -3px;
  color: #fff;
  font-family: ${InterfaceFont.PIXEL_LABEL};
  font-size: 26px;
  line-height: 26px;
`;
