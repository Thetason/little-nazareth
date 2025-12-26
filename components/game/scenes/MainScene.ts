import * as Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Container;
  private npcs: Phaser.GameObjects.Container[] = [];
  private targetX: number = 0;
  private targetY: number = 0;
  private isMoving: boolean = false;
  private clickMarker!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // 배경 그라데이션
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0x87CEEB, 0x87CEEB, 0x90EE90, 0x90EE90, 1);
    graphics.fillRect(0, 0, 1200, 700);

    // 나자렛 광장 타이틀
    this.add.text(600, 50, '🏘️ 리틀 나자렛 광장', {
      fontSize: '40px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#4A3828',
      strokeThickness: 6
    }).setOrigin(0.5);

    // 바닥 (간단한 isometric 느낌)
    this.createGround();

    // NPC 캐릭터들 배치
    this.createNPC(300, 300, '🐑', '루루', '#FFE5E5');
    this.createNPC(500, 250, '🦁', '아리', '#FFD89B');
    this.createNPC(700, 300, '🐿️', '포코', '#FFDAB9');
    this.createNPC(900, 250, '🐻', '코코', '#D2B48C');
    this.createNPC(600, 400, '🕊️', '비둘기', '#D4E8F5');

    // 플레이어 캐릭터 (사용자 아바타)
    this.player = this.createPlayer(600, 500);

    // 클릭 마커
    this.clickMarker = this.add.graphics();

    // 환경 요소
    this.createEnvironment();

    // 클릭 이벤트
    this.input.on('pointerdown', this.handleClick, this);

    // 안내 텍스트
    this.add.text(600, 650, '💡 화면을 클릭해서 이동하세요! 캐릭터를 클릭하면 이야기를 들을 수 있어요.', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 16, y: 8 }
    }).setOrigin(0.5);
  }

  createGround() {
    // 간단한 타일 바닥
    const tileSize = 50;
    const graphics = this.add.graphics();

    for (let x = 0; x < 24; x++) {
      for (let y = 0; y < 14; y++) {
        const posX = x * tileSize;
        const posY = y * tileSize;
        const shade = (x + y) % 2 === 0 ? 0.8 : 1;

        graphics.fillStyle(Phaser.Display.Color.GetColor(
          100 * shade,
          150 * shade,
          100 * shade
        ));
        graphics.fillRect(posX, posY, tileSize, tileSize);
        graphics.lineStyle(1, 0x88aa88);
        graphics.strokeRect(posX, posY, tileSize, tileSize);
      }
    }
  }

  createNPC(x: number, y: number, emoji: string, name: string, color: string) {
    const container = this.add.container(x, y);

    // 그림자
    const shadow = this.add.ellipse(0, 25, 40, 20, 0x000000, 0.3);
    container.add(shadow);

    // NPC 원형 배경
    const circle = this.add.circle(0, 0, 35, Phaser.Display.Color.HexStringToColor(color).color);
    container.add(circle);

    // 이모지
    const emojiText = this.add.text(0, -5, emoji, {
      fontSize: '48px'
    }).setOrigin(0.5);
    container.add(emojiText);

    // 이름표
    const nameTag = this.add.text(0, 50, name, {
      fontSize: '14px',
      color: '#ffffff',
      backgroundColor: color,
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);
    container.add(nameTag);

    // 호버 반짝임 효과
    const sparkle = this.add.text(0, -50, '✨', {
      fontSize: '24px'
    }).setOrigin(0.5).setAlpha(0);
    container.add(sparkle);

    // 인터랙티브 설정
    circle.setInteractive({ useHandCursor: true });

    circle.on('pointerover', () => {
      this.tweens.add({
        targets: sparkle,
        alpha: 1,
        duration: 300,
        yoyo: true,
        repeat: -1
      });
      this.tweens.add({
        targets: circle,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 200
      });
    });

    circle.on('pointerout', () => {
      sparkle.setAlpha(0);
      this.tweens.add({
        targets: circle,
        scaleX: 1,
        scaleY: 1,
        duration: 200
      });
    });

    circle.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      pointer.event.stopPropagation();
      this.showNPCDialog(name, emoji, color);
    });

    // NPC 목록에 추가
    this.npcs.push(container);

    // 부드러운 idle 애니메이션
    this.tweens.add({
      targets: container,
      y: y - 10,
      duration: 2000 + Math.random() * 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    return container;
  }

  createPlayer(x: number, y: number) {
    const container = this.add.container(x, y);

    // 그림자
    const shadow = this.add.ellipse(0, 20, 30, 15, 0x000000, 0.3);
    container.add(shadow);

    // 플레이어 원형
    const circle = this.add.circle(0, 0, 25, 0x7C6FFF);
    container.add(circle);

    // 플레이어 아이콘 (사용자 선택 가능하게 나중에 변경)
    const playerIcon = this.add.text(0, -3, '🙂', {
      fontSize: '36px'
    }).setOrigin(0.5);
    container.add(playerIcon);

    // 이름표
    const nameTag = this.add.text(0, 40, '나', {
      fontSize: '12px',
      color: '#ffffff',
      backgroundColor: '#7C6FFF',
      padding: { x: 6, y: 3 }
    }).setOrigin(0.5);
    container.add(nameTag);

    return container;
  }

  createEnvironment() {
    // 나무들
    this.createTree(150, 150);
    this.createTree(1000, 150);
    this.createTree(150, 550);
    this.createTree(1000, 550);

    // 꽃들
    for (let i = 0; i < 10; i++) {
      const x = 100 + Math.random() * 1000;
      const y = 100 + Math.random() * 500;
      this.add.text(x, y, '🌸', {
        fontSize: '20px'
      }).setAlpha(0.8);
    }

    // 구름들
    for (let i = 0; i < 5; i++) {
      const cloud = this.add.text(
        Math.random() * 1200,
        Math.random() * 100,
        '☁️',
        { fontSize: '40px' }
      ).setAlpha(0.6);

      this.tweens.add({
        targets: cloud,
        x: cloud.x + 1200,
        duration: 20000 + Math.random() * 10000,
        repeat: -1,
        onRepeat: () => {
          cloud.x = -100;
        }
      });
    }
  }

  createTree(x: number, y: number) {
    const container = this.add.container(x, y);

    // 나무 그림자
    const shadow = this.add.ellipse(0, 60, 60, 30, 0x000000, 0.2);
    container.add(shadow);

    // 나무 줄기
    const trunk = this.add.rectangle(0, 20, 20, 60, 0x8B4513);
    container.add(trunk);

    // 나무 잎
    const leaves = this.add.text(0, -20, '🌳', {
      fontSize: '80px'
    }).setOrigin(0.5);
    container.add(leaves);

    // 흔들림 효과
    this.tweens.add({
      targets: leaves,
      rotation: -0.1,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  handleClick(pointer: Phaser.Input.Pointer) {
    this.targetX = pointer.x;
    this.targetY = pointer.y;
    this.isMoving = true;

    // 클릭 마커 표시
    this.clickMarker.clear();
    this.clickMarker.lineStyle(3, 0xFFFFFF, 1);
    this.clickMarker.strokeCircle(this.targetX, this.targetY, 20);

    this.tweens.add({
      targets: this.clickMarker,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.clickMarker.clear();
        this.clickMarker.setAlpha(1);
      }
    });
  }

  showNPCDialog(name: string, emoji: string, color: string) {
    // 간단한 대화창 (나중에 풍부하게 확장)
    const dialogBg = this.add.rectangle(600, 350, 600, 200, 0xffffff, 0.95);
    dialogBg.setStrokeStyle(4, Phaser.Display.Color.HexStringToColor(color).color);

    const emojiIcon = this.add.text(400, 300, emoji, {
      fontSize: '60px'
    });

    const nameText = this.add.text(500, 290, name, {
      fontSize: '28px',
      color: color,
      fontStyle: 'bold'
    });

    const message = this.add.text(600, 340, `안녕하세요! 저는 ${name}이에요.\n클릭해서 제 이야기를 들어보세요!`, {
      fontSize: '18px',
      color: '#333333',
      align: 'center',
      wordWrap: { width: 500 }
    }).setOrigin(0.5);

    const closeButton = this.add.text(600, 420, '닫기', {
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: color,
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    const dialogContainer = this.add.container(0, 0, [
      dialogBg,
      emojiIcon,
      nameText,
      message,
      closeButton
    ]);

    closeButton.on('pointerdown', () => {
      dialogContainer.destroy();
    });

    // 3초 후 자동 닫기
    this.time.delayedCall(3000, () => {
      if (dialogContainer.active) {
        this.tweens.add({
          targets: dialogContainer,
          alpha: 0,
          duration: 300,
          onComplete: () => dialogContainer.destroy()
        });
      }
    });
  }

  update() {
    if (this.isMoving) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.targetX,
        this.targetY
      );

      if (distance > 5) {
        const angle = Phaser.Math.Angle.Between(
          this.player.x,
          this.player.y,
          this.targetX,
          this.targetY
        );

        const speed = 3;
        this.player.x += Math.cos(angle) * speed;
        this.player.y += Math.sin(angle) * speed;

        // 걷는 애니메이션 (약간의 흔들림)
        const walkCycle = Math.sin(Date.now() / 100) * 3;
        this.player.setScale(1 + walkCycle / 100, 1 - walkCycle / 100);
      } else {
        this.isMoving = false;
        this.player.setScale(1, 1);
      }
    }
  }
}
