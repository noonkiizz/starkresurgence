import { useGame } from 'phaser-react-ui';
import React, { useMemo, useState } from 'react';

import { phrase } from '~lib/lang';
import { Tutorial } from '~lib/tutorial';
import { Confirm } from '~scene/system/interface/confirm';
import { GameState, IGame } from '~type/game';
import { LangPhrase } from '~type/lang';
import { MenuItem, MenuPage } from '~type/menu';

import { Wrapper, Item, Space } from './styles';

type Props = {
  page?: MenuPage
  onSelect: (page: MenuPage) => void
};

export const Navigation: React.FC<Props> = ({ page, onSelect }) => {
  const game = useGame<IGame>();

  const [confirmation, setConfirmation] = useState<Nullable<{
    message: LangPhrase
    onConfirm:() => void
  }>>(null);

  const menuItems = useMemo(() => {
    const items: (MenuItem | null)[] = [];

    if (game.state === GameState.IDLE) {
      items.push({
        label: 'NEW_GAME',
        page: MenuPage.NEW_GAME,
      }, {
        label: 'LOAD_GAME',
        page: MenuPage.LOAD_GAME,
      });
    } else {
      items.push({
        label: 'CONTINUE_GAME',
        onClick: () => game.resumeGame(),
      }, {
        label: 'SAVE_GAME',
        page: MenuPage.SAVE_GAME,
        disabled: (
          game.world.wave.isGoing
          || (game.world.wave.number === 1 && Tutorial.IsEnabled)
        ),
      }, null, {
        label: 'RESTART_GAME',
        onClick: () => {
          setConfirmation({
            message: 'CONFIRM_RESTART_GAME',
            onConfirm: () => {
              game.restartGame();
            },
          });
        },
      }, {
        label: 'MAIN_MENU',
        onClick: () => {
          setConfirmation({
            message: 'CONFIRM_STOP_GAME',
            onConfirm: () => {
              game.stopGame();
            },
          });
        },
      });
    }

    items.push(null, {
      label: 'SETTINGS',
      page: MenuPage.SETTINGS,
    }, {
      label: 'ABOUT_GAME',
      page: MenuPage.ABOUT_GAME,
    });

    if (game.isDesktop()) {
      items.push({
        label: 'CONTROLS',
        page: MenuPage.CONTROLS,
      });
    }

    return items;
  }, []);

  const onConfirmationClose = () => {
    setConfirmation(null);
  };

  return (
    <Wrapper>
      {confirmation && (
        <Confirm {...confirmation} onClose={onConfirmationClose} />
      )}
      {menuItems.map((item, index) => (item ? (
        <Item
          key={item.label}
          onClick={item.onClick ?? (() => item.page && onSelect(item.page))}
          $active={item.page === page}
          $disabled={item.disabled}
        >
          {phrase(item.label)}
        </Item>
      ) : (
        <Space key={index} />
      )))}
    </Wrapper>
  );
};
