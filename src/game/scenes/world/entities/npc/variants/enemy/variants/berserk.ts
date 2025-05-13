import { ENEMY_HEAL_MULTIPLIER, ENEMY_HEAL_TIMESTAMP_PAUSE } from '~const/world/entities/enemy';
import { IWorld } from '~type/world';
import { EnemyVariantData, EnemyTexture } from '~type/world/entities/npc/enemy';

import { Enemy } from '../enemy';

export class EnemyBerserk extends Enemy {
  static SpawnWaveRange = [16];

  private healTimestamp: number = 0;

  private healAmount: number = 0;

  constructor(scene: IWorld, data: EnemyVariantData) {
    super(scene, {
      ...data,
      texture: EnemyTexture.BERSERK,
      multipliers: {
        health: 2.0,
        damage: 1.0,
        speed: 0.7,
        might: 1.7,
      },
    });

    this.healAmount = Math.ceil(this.live.maxHealth * ENEMY_HEAL_MULTIPLIER);
  }

  public update() {
    super.update();

    try {
      this.heal();
    } catch (error) {
      console.warn('Failed to update berserk enemy', error as TypeError);
    }
  }

  private heal() {
    if (
      this.scene.player.live.isDead()
      || this.live.isDead()
      || this.live.isMaxHealth()
    ) {
      return;
    }

    const now = this.scene.getTime();

    if (now >= this.healTimestamp) {
      this.healTimestamp = now + ENEMY_HEAL_TIMESTAMP_PAUSE;

      this.live.heal(this.healAmount);
    }
  }
}
