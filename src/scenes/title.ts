import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../actors.ts";
import type { Hud } from "../hud.ts";
import type { LaunchOptions } from "../main.ts";
import { DEV_TESTING, IDLE_SECONDS } from "../game.ts";
import { Backdrop } from "./backdrop.ts";

export class TitleScene extends Phaser.Scene {
  private backdrop!: Backdrop;
  private idle = 0;
  private leaving = false;
  private countdown!: Phaser.GameObjects.Text;

  constructor(
    private readonly hud: Hud,
    private readonly options: LaunchOptions,
  ) {
    super("title");
  }

  create(): void {
    this.backdrop = new Backdrop(this);
    this.hud.setMode("title");
    this.hud.setRoute([
      "Outer Drift",
      "Shatter Belt",
      "Gun Lanes",
      "Lancer Gate",
      "Last Approach",
      "The Warden",
    ]);

    this.hud.setSector(-1);
    this.hud.setBoss(null);
    this.hud.say("");

    this.input.keyboard?.on("keydown-SPACE", () => this.onSpace());

    const title = this.add.text(WIDTH / 2, HEIGHT * 0.34, "NEON\nWARDEN", {
      fontFamily: "Orbitron, Trebuchet MS, sans-serif",
      fontSize: "64px",
      fontStyle: "bold",
      align: "center",
      color: "#e8fdff",
    }).setOrigin(0.5).setLineSpacing(-6);
    title.enableFilters();
    title.filters?.internal.addGlow(0x5ef2ff, 6, 0, 1);
    this.tweens.add({
      targets: title,
      scale: 1.04,
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    this.add.text(WIDTH / 2, HEIGHT * 0.62, "SPACE  launch", {
      fontFamily: "monospace",
      fontSize: "20px",
      color: "#ffe066",
    }).setOrigin(0.5);
    this.countdown = this.add.text(WIDTH / 2, HEIGHT * 0.68, "", {
      fontFamily: "monospace",
      fontSize: "14px",
      color: "#8aa4c8",
    }).setOrigin(0.5);

    this.cameras.main.fadeIn(400, 4, 2, 12);
  }

  override update(_time: number, delta: number): void {
    this.backdrop.scroll(delta);
    if (this.leaving) return;
    this.idle += delta / 1000;
    const left = DEV_TESTING ? 0 : Math.ceil(IDLE_SECONDS - this.idle);
    this.countdown.setText(`self-play demo in ${left}`);
    if (left <= 0) this.launch("attract");
  }

  private onSpace(): void {
    if (this.leaving) return;
    this.launch("play");
  }

  private launch(mode: string): void {
    if (this.leaving) return;

    this.leaving = true;
    fade(this, "play", { mode });
  }
}

function fade(scene: Phaser.Scene, target: string, params?: object) {
  const camera = scene.cameras.main;

  camera.fadeOut(450, 4, 2, 12);
  camera.once("camerafadeoutcomplete", () => {
    scene.scene.start(target, params);
  });
}
