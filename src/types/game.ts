import { IScreen } from '~type/screen';
import { StorageSave } from '~type/storage';
import { TutorialStep, TutorialStepState } from '~type/tutorial';
import { IWorld } from '~type/world';

export interface IGame extends Phaser.Game {
  /**
   * World scene.
   */
  readonly world: IWorld

  /**
   * Screen scene.
   */
  readonly screen: IScreen

  /**
   * Game state.
   */
  readonly state: GameState

  /**
   * Game settings.
   */
  readonly settings: Record<GameSettings, boolean>

  /**
   * Used save data.
   */
  readonly usedSave: Nullable<StorageSave>

  /**
   * Game difficulty.
   */
  difficulty: GameDifficulty

  /**
   * Save game.
   * @param name - Save name
   */
  saveGame(name: string): Promise<Nullable<StorageSave>>

  /**
   * Pause game.
   */
  pauseGame(): void

  /**
   * Resume game.
   */
  resumeGame(): void

  /**
   * Continue game.
   * @param save - Save data.
   */
  continueGame(save: StorageSave): void

  /**
   * Start new game.
   */
  startNewGame(): void

  /**
   * Stop game.
   */
  stopGame(): void

  /**
   * Restart game.
   */
  restartGame(): void

  /**
   * Finish game.
   */
  finishGame(): void

  /**
   * Get record stat from storage
   */
  getRecordStat(): Nullable<GameStat>

  /**
   * Get difficylty multiplier by settings.
   */
  getDifficultyMultiplier(): number

  /**
   * Set game settings value.
   * @param key - Settings key
   * @param value - New value
   */
  updateSetting(key: GameSettings, value: boolean): void

  /**
   * Check is setting enabled.
   * @param key - Settings key
   */
  isSettingEnabled(key: GameSettings): boolean

  /**
   * Change system pause state.
   * @param state - Paused
   */
  toggleSystemPause(state: boolean): void

  /**
   * Check platform is desktop.
   */
  isDesktop(): boolean

  /**
   * Get data for saving.
   */
  getSavePayload(): GameSavePayload
}

export enum GameScene {
  SYSTEM = 'SYSTEM',
  GAMEOVER = 'GAMEOVER',
  WORLD = 'WORLD',
  SCREEN = 'SCREEN',
  MENU = 'MENU',
}

export enum GameEvents {
  START = 'start',
  FINISH = 'finish',
  UPDATE_SETTINGS = 'update_settings',
  TOGGLE_PAUSE = 'toggle_pause',
}

export enum GameState {
  IDLE = 'IDLE',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  PAUSED = 'PAUSED',
}

export enum GameSettings {
  AUDIO = 'AUDIO',
  SHOW_DAMAGE = 'SHOW_DAMAGE',
  EFFECTS = 'EFFECTS',
  TUTORIAL = 'TUTORIAL',
}

export enum GameDifficulty {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
}

export enum GamePlatform {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export type GameSavePayload = {
  difficulty: GameDifficulty
  tutorial: Partial<Record<TutorialStep, TutorialStepState>>
};

export type GameStat = {
  score: number
  waves: number
  kills: number
  lived: number
};

declare global {
  const ENV_MODE: GamePlatform;

  interface Window {
    GAME?: IGame
  }
}
