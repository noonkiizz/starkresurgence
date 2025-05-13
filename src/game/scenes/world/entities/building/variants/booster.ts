import { DIFFICULTY } from '~const/world/difficulty';
import { progressionLinear } from '~lib/progression';
import { IWorld } from '~type/world';
import {
  BuildingVariant,
  BuildingTexture,
  BuildingParam,
  BuildingVariantData,
  BuildingIcon,
  BuildingEvents,
  IBuildingBooster,
  BuildingCategory,
} from '~type/world/entities/building';

import { Building } from '../building';

export class BuildingBooster extends Building implements IBuildingBooster {
  static Category = BuildingCategory.OTHER;

  static Texture = BuildingTexture.BOOSTER;

  static Cost = DIFFICULTY.BUILDING_BOOSTER_COST;

  static Radius = DIFFICULTY.BUILDING_BOOSTER_RADIUS;

  static AllowByWave = DIFFICULTY.BUILDING_BOOSTER_ALLOW_BY_WAVE;

  static MaxLevel = 3;

  private _power: number = DIFFICULTY.BUILDING_BOOSTER_POWER;

  public get power() { return this._power; }

  private set power(v) { this._power = v; }

  constructor(scene: IWorld, data: BuildingVariantData) {
    super(scene, {
      ...data,
      variant: BuildingVariant.BOOSTER,
      health: DIFFICULTY.BUILDING_BOOSTER_HEALTH,
      texture: BuildingBooster.Texture,
      radius: {
        default: DIFFICULTY.BUILDING_BOOSTER_RADIUS,
        growth: DIFFICULTY.BUILDING_BOOSTER_RADIUS_GROWTH,
      },
    });

    this.on(BuildingEvents.UPGRADE, this.onUpgrade.bind(this));
  }

  public getInfo() {
    const info: BuildingParam[] = [{
      label: 'BUILDING_POWER',
      icon: BuildingIcon.POWER,
      value: `+${this.power * 100}%`,
    }];

    return super.getInfo().concat(info);
  }

  public getTopEdgePosition() {
    const position = super.getTopEdgePosition();

    position.y -= 6;

    return position;
  }

  private onUpgrade() {
    this.power = progressionLinear({
      defaultValue: DIFFICULTY.BUILDING_BOOSTER_POWER * 100,
      scale: DIFFICULTY.BUILDING_BOOSTER_POWER_GROWTH,
      level: this.upgradeLevel,
    }) / 100;
  }
}
