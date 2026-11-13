export type EnemyKind = "drone" | "dart" | "turret" | "lancer";

export interface EnemyInfo {
  hp: number;
  score: number;
  radius: number;
  dropChance: number;
  canShoot: boolean;
}

export const enemiesData: Record<EnemyKind, EnemyInfo> = {
  drone: {
    hp: 2,
    score: 100,
    radius: 13,
    dropChance: 0.015,
    canShoot: true,
  },
  dart: {
    hp: 1,
    score: 150,
    radius: 12,
    dropChance: 0.015,
    canShoot: false,
  },
  turret: {
    hp: 12,
    score: 400,
    radius: 19,
    dropChance: 0.3,
    canShoot: true,
  },
  lancer: {
    hp: 4,
    score: 250,
    radius: 15,
    dropChance: 0.06,
    canShoot: true,
  },
};

export type FormationTypes = "line" | "column" | "vee" | "pincer";

export interface Wave {
  formation: FormationTypes;
  count: number;
  type: EnemyKind;
  tick: number;
  center?: number;
}

export const RouteDataMap: Wave[][] = [
  [
    { formation: "line", count: 4, type: "drone", tick: 60 },
    { formation: "vee", count: 5, type: "drone", tick: 360, center: 168 },
    { formation: "vee", count: 5, type: "drone", tick: 660, center: 312 },
    { formation: "line", count: 6, type: "drone", tick: 960 },
    { formation: "column", count: 4, type: "drone", tick: 1200, center: 120 },
    { formation: "column", count: 4, type: "drone", tick: 1260, center: 360 },
  ],
  [
    { formation: "vee", count: 6, type: "drone", tick: 60 },
    { formation: "line", count: 4, type: "dart", tick: 300 },
    { formation: "column", count: 5, type: "dart", tick: 600, center: 144 },
    { formation: "column", count: 5, type: "dart", tick: 720, center: 336 },
    { formation: "line", count: 7, type: "drone", tick: 1020 },
    { formation: "vee", count: 5, type: "dart", tick: 1140 },
    { formation: "line", count: 6, type: "dart", tick: 1440 },
  ],
  [
    { formation: "line", count: 1, type: "turret", tick: 60 },
    { formation: "vee", count: 6, type: "drone", tick: 240 },
    { formation: "line", count: 2, type: "turret", tick: 540 },
    { formation: "column", count: 6, type: "dart", tick: 840, center: 240 },
    { formation: "line", count: 2, type: "turret", tick: 1080 },
    { formation: "line", count: 6, type: "drone", tick: 1140 },
    { formation: "line", count: 3, type: "turret", tick: 1500 },
  ],
  [
    { formation: "pincer", count: 4, type: "lancer", tick: 60 },
    { formation: "vee", count: 6, type: "dart", tick: 360 },
    { formation: "pincer", count: 6, type: "lancer", tick: 600 },
    { formation: "line", count: 2, type: "turret", tick: 780 },
    { formation: "pincer", count: 6, type: "lancer", tick: 1140 },
    { formation: "vee", count: 8, type: "drone", tick: 1260 },
    { formation: "line", count: 8, type: "dart", tick: 1560 },
  ],
  [
    { formation: "line", count: 3, type: "turret", tick: 60 },
    { formation: "pincer", count: 6, type: "lancer", tick: 180 },
    { formation: "column", count: 6, type: "dart", tick: 540, center: 120 },
    { formation: "column", count: 6, type: "dart", tick: 540, center: 360 },
    { formation: "vee", count: 9, type: "drone", tick: 900 },
    { formation: "line", count: 2, type: "turret", tick: 1020 },
    { formation: "pincer", count: 8, type: "lancer", tick: 1320 },
    { formation: "vee", count: 8, type: "dart", tick: 1560 },
  ],
];
