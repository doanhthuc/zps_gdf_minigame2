let MonsterLayer = cc.Layer.extend({
    ctor: function (scene) {
        this.scene = scene;
        this._super();

        this.init();
    },

    init: function () {
        this.monster = new MonsterSprite(this);
        // this.addChild(this.monster);
    },
});

let MonsterSprite = cc.Sprite.extend({
    speed: 100,
    shortestPathCoordinates: [],
    passedCells: 0,
    curDirection: MAP_CONST.DIRECTION.UP,
    actions: {
        UP: null,
        DOWN: null,
        LEFT: null,
        RIGHT: null,
    },

    aimFrames: {
        UP: [],
        DOWN: [],
        RIGHT: [],
    },

    ctor: function (layer) {
        this._super();
        this.initAimFrames();

        layer.addChild(this);

        this.setShortestPathCoordinates(
            layer.scene.layers.mapLayer.shortestPathCoordinates
        );

        this.init();

        this.playAnimation(this.curDirection);
    },

    init: function () {
        let [initX, initY] = this.shortestPathCoordinates[0];
        this.setPosition(
            (initX + 0.5) * MAP_CONST.CELL.WIDTH,
            (initY + 0.5) * MAP_CONST.CELL.HEIGHT
        );

        this.scheduleUpdate();
    },

    initAimFrames: function () {
        this.loadAimFramesDirection(MAP_CONST.DIRECTION.UP);

        this.loadAimFramesDirection(MAP_CONST.DIRECTION.DOWN);

        this.loadAimFramesDirection(MAP_CONST.DIRECTION.RIGHT);
    },

    loadAimFramesDirection: function (direction) {
        startIndex =
            MonsterType.Golem.imageIndexByDirection[direction].startIndex;
        endIndex = MonsterType.Golem.imageIndexByDirection[direction].endIndex;
        for (let i = startIndex; i <= endIndex; i++) {
            let frame = cc.SpriteFrame.create(
                resources.Monster_golem_run +
                    (i >= 10 ? '00' : '000') +
                    i +
                    '.png',
                cc.rect(0, 0, 168, 168)
            );
            frame.retain();
            this.aimFrames[direction].push(frame);
        }
    },

    findNextDirection: function (curX, curY, nextX, nextY, curDirection) {
        let nextDirection = curDirection;
        if (curX === nextX) {
            if (curY < nextY) {
                nextDirection = MAP_CONST.DIRECTION.UP;
            } else {
                nextDirection = MAP_CONST.DIRECTION.DOWN;
            }
        } else if (curY === nextY) {
            if (curX > nextX) {
                nextDirection = MAP_CONST.DIRECTION.LEFT;
            } else {
                nextDirection = MAP_CONST.DIRECTION.RIGHT;
            }
        }
        return nextDirection;
    },

    onDirectionChange: function (prevDirection, nextDirection) {
        // if (this.actions[prevDirection] !== null) {
        //     this.stopAction(this.actions[prevDirection]);
        //     cc.log('prev: ' + prevDirection + ' nextDirection: ' + nextDirection);
        // }
        cc.log('prev: ' + prevDirection + ' nextDirection: ' + nextDirection);

        this.stopAllActions();
        this.playAnimation(nextDirection);
    },

    playAnimation: function (curDirection) {
        // if (this.actions[curDirection] !== null) {
        //     cc.log(
        //         'onDirectionChange111111111111111111111 ' + this.curDirection
        //     );

        //     this.runAction(this.actions[curDirection]);
        // } else {
        // this.actions[curDirection] = cc
        //     .animate(new cc.Animation(this.aimFrames[curDirection], 0.05))
        //     .repeatForever();
        let animation = cc.Animation.createWithSpriteFrames(
                this.aimFrames[curDirection],
                0.05
            ),
            animate = cc.Animate.create(animation);
        this.actions[curDirection] = cc.RepeatForever.create(animate);
        cc.log(this.actions[curDirection]);
        this.runAction(this.actions[curDirection]);
        // }
    },

    setShortestPathCoordinates: function (coordinates) {
        this.shortestPathCoordinates = coordinates;
    },

    update: function (dt) {
        // cc.log(this.actions[MAP_CONST.DIRECTION.RIGHT]);
        if (this.passedCells < this.shortestPathCoordinates.length - 1) {
            let [nextXMatrix, nextYMatrix] =
                this.shortestPathCoordinates[this.passedCells + 1];

            let [curXMatrix, curYMatrix] =
                this.shortestPathCoordinates[this.passedCells];

            let nextDirection = this.findNextDirection(
                curXMatrix,
                curYMatrix,
                nextXMatrix,
                nextYMatrix,
                this.curDirection
            );

            if (nextDirection !== this.curDirection) {
                this.onDirectionChange(this.curDirection, nextDirection);
                this.curDirection = nextDirection;
            }

            let nextX = (nextXMatrix + 0.5) * MAP_CONST.CELL.WIDTH,
                nextY = (nextYMatrix + 0.5) * MAP_CONST.CELL.HEIGHT;
            let curX = this.getPositionX(),
                curY = this.getPositionY();
            // cc.log('nextX: ' + nextX + ', nextY: ' + nextY);
            // cc.log('CurX: ' + curX + ' CurY: ' + curY);
            if (nextX - curX <= 0 && nextY - curY <= 0) {
                this.passedCells++;
            } else {
                if (nextX - curX > 0) {
                    if (curX + this.speed * dt > nextX) {
                        this.setPositionX(nextX);
                    } else {
                        this.setPositionX(curX + this.speed * dt);
                    }
                }

                if (nextY - curY > 0) {
                    if (curY + this.speed * dt > nextY) {
                        this.setPositionY(nextY);
                    } else {
                        this.setPositionY(curY + this.speed * dt);
                    }
                }
            }
        } else {
            this.unscheduleUpdate();
            this.removeFromParent();
        }
    },
});
