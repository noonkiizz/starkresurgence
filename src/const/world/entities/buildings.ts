import { BuildingAmmunition } from '~entity/building/variants/ammunition';
import { BuildingBooster } from '~entity/building/variants/booster';
import { BuildingGenerator } from '~entity/building/variants/generator';
import { BuildingRadar } from '~entity/building/variants/radar';
import { BuildingTowerElectro } from '~entity/building/variants/tower/variants/electro';
import { BuildingTowerFire } from '~entity/building/variants/tower/variants/fire';
import { BuildingTowerFrozen } from '~entity/building/variants/tower/variants/frozen';
import { BuildingTowerLazer } from '~entity/building/variants/tower/variants/lazer';
import { BuildingWall } from '~entity/building/variants/wall';
import { BuildingVariant, IBuildingFactory } from '~type/world/entities/building';

export const BUILDINGS: Record<BuildingVariant, IBuildingFactory> = {
  [BuildingVariant.WALL]: BuildingWall,
  [BuildingVariant.TOWER_FROZEN]: BuildingTowerFrozen,
  [BuildingVariant.TOWER_FIRE]: BuildingTowerFire,
  [BuildingVariant.TOWER_LAZER]: BuildingTowerLazer,
  [BuildingVariant.TOWER_ELECTRO]: BuildingTowerElectro,
  [BuildingVariant.GENERATOR]: BuildingGenerator,
  [BuildingVariant.AMMUNITION]: BuildingAmmunition,
  [BuildingVariant.BOOSTER]: BuildingBooster,
  [BuildingVariant.RADAR]: BuildingRadar,
};
