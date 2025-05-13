import { CONTROL_KEY } from '~const/controls';
import { Scene } from '~game/scenes';
import { Assets } from '~lib/assets';
import { removeLoading, setLoadingStatus } from '~lib/state';
import { Storage } from '~lib/storage';
import { GameScene, GameState } from '~type/game';
import { InterfaceFont } from '~type/interface';
import { MenuPage } from '~type/menu';

export class System extends Scene {
  constructor() {
    super(GameScene.SYSTEM);
  }

  public async preload() {
    this.load.on('progress', (value: number) => {
      setLoadingStatus(`LOADING\n${Math.round(value * 100)}%`);
    });

    this.load.addPack([{
      files: Assets.Files,
    }]);

    Assets.Clear();

    await Promise.all([
      Assets.ImportFontFace(InterfaceFont.PIXEL_LABEL, 'pixel_label.ttf'),
      Assets.ImportFontFace(InterfaceFont.PIXEL_TEXT, 'pixel_text.ttf'),
    ]);
  }

  public async create() {
    setLoadingStatus('LOADING\nDONE');

    await Storage.Register()
      .then(() => Storage.LoadSaves());

    this.scene.launch(GameScene.WORLD);
    this.scene.launch(GameScene.MENU, {
      defaultPage: MenuPage.NEW_GAME,
    });

    this.scene.bringToTop();

    removeLoading();

    if (!this.game.isDesktop()) {
      this.input.addPointer(1);
    }

    this.input.keyboard?.on(CONTROL_KEY.PAUSE, () => {
      if (this.game.isPaused) {
        // System pause
        return;
      }

      switch (this.game.state) {
        case GameState.FINISHED: {
          this.game.stopGame();
          break;
        }
        case GameState.PAUSED: {
          this.game.resumeGame();
          break;
        }
        case GameState.STARTED: {
          this.game.pauseGame();
          break;
        }
      }
    });
  }
}
