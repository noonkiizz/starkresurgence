import Phaser from 'phaser';

import { LangPhrase } from '~type/lang';
import { IScene } from '~type/scene';

export interface IScreen extends IScene {
  /**
   * Joystick active pointer.
   */
  readonly joystickActivePointer: Nullable<Phaser.Input.Pointer>

  /**
   * Get state of using virtual joystick.
   */
  isJoystickUsing(): boolean

  /**
   * Send failure message.
   * @param text - Phrase key
   * @param format - Values for format
   */
  failure(text?: LangPhrase, format?: any[]): void
}

export enum ScreenAudio {
  ERROR = 'interface/error',
}

export enum ScreenEvents {
  NOTICE = 'notice',
}

export type Notice = {
  text: LangPhrase
  format?: any[]
  timer: NodeJS.Timeout
};
