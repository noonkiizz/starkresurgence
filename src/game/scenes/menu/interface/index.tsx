import React, { useEffect, useState } from 'react';

import { Tutorial } from '~lib/tutorial';
import { Overlay } from '~scene/system/interface/overlay';
import { MenuPage } from '~type/menu';

import { Content } from './content';
import { Copyright } from './copyright';
import { Navigation } from './navigation';
import {
  Wrapper, Logotype, Sidebar, Main,
} from './styles';

type Props = {
  defaultPage?: MenuPage
};

export const MenuUI: React.FC<Props> = ({ defaultPage }) => {
  const [page, setPage] = useState(defaultPage);

  useEffect(() => {
    Tutorial.ToggleHintsVisible(false);

    return () => {
      Tutorial.ToggleHintsVisible(true);
    };
  }, []);

  return (
    <Overlay>
      <Wrapper>
        <Sidebar>
          <Logotype src="assets/logotype.png" />
          <Navigation page={page} onSelect={setPage} />
          <Copyright />
        </Sidebar>
        <Main>
          <Content page={page} />
        </Main>
      </Wrapper>
    </Overlay>
  );
};

MenuUI.displayName = 'MenuUI';
