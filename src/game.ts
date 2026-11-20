import Phaser from "phaser";

export const DEV_TESTING = false;

export const IDLE_SECONDS = 8;

export interface RunSummary {
  score: number;
  kills: number;
  hits: number;
  continues: number;
}

export function fade(
  scene: Phaser.Scene,
  target: string,
  params?: object,
): void {
  const camera = scene.cameras.main;

  camera.fadeOut(450, 4, 2, 12);

  camera.once("camerafadeoutcomplete", () => {
    scene.scene.start(target, params);
  });
}
