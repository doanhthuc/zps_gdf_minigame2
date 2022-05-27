const CELL_TYPE = {
    EMPTY: 0,
    OBSTACLE: 1,
    HOUSE: 2,
    MONSTER_GATE: 3,
};

var MapScene = cc.Scene.extend({
    layers: {
        mapLayer: null,
        monsterLayer: null,
    },

    onEnter: function () {
        this._super();
        this.layers.mapLayer = new MapLayer();
        this.layers.monsterLayer = new MonsterLayer(this);

        this.addChild(this.layers.mapLayer);
        this.addChild(this.layers.monsterLayer);
    },
});

var MapLayer = cc.Layer.extend({
    obstacleNum: 7,
    shortestPathCoordinates: [],

    ctor: function () {
        this._super();

        this.init();
    },

    mapMatrix: new Array(MAP_CONST.NUM_OF_COL)
        .fill(CELL_TYPE.EMPTY)
        .map(() => new Array(MAP_CONST.NUM_OF_ROW).fill(CELL_TYPE.EMPTY)),

    init: function () {
        this.background = new cc.Sprite(resources.Map_background);
        this.background.setPosition(
            cc.winSize.width / 2,
            cc.winSize.height / 2
        );
        this.addChild(this.background);

        this.obstacleNum = Math.floor(Math.random() * (7 - 5) + 5);

        this.addMapHouse(0, 0);
        this.addMonsterGate(MAP_CONST.NUM_OF_COL - 1, MAP_CONST.NUM_OF_ROW - 1);
        this.generateObstacle();

        this.addLandToPath();

        // for (let i = 0; i < MAP_CONST.NUM_OF_COL; i++) {
        //     for (let j = 0; j < MAP_CONST.NUM_OF_ROW; j++) {
        //         cc.log(this.mapMatrix[i][j] + ' ');
        //     }
        //     cc.log('\n');
        // }

        // cc.log(this.mapMatrix);

        // let path1 = this.findShortestPathToGate();
        // for (let i in path1) {
        //     cc.log(i);
        // }
    },

    addLand: function (i, j) {
        z_order = MAP_CONST.ROW_Z_ORDER;
        // for (let i = 0; i < MAP_CONST.NUM_OF_COL; i++) {
        //     for (let j = 0; j < MAP_CONST.NUM_OF_ROW; j++) {
        //         let land = new cc.Sprite(resources.Map_cell_0);
        //         land.setPosition(
        //             i * land.width + land.width / 2,
        //             j * land.width + land.width / 2
        //         );
        //         this.addChild(land, z_order - j);
        //     }
        // }
        let land = new cc.Sprite(resources.Map_decoration_rock_0003);
        land.setPosition(
            i * land.width + land.width / 2,
            j * land.width + land.width / 2
        );
        this.addChild(land, z_order - j);
    },

    generateObstacle: function () {
        let obstacleNum = this.obstacleNum;
        while (obstacleNum > 0) {
            let col = Math.floor(Math.random() * MAP_CONST.NUM_OF_COL);
            let row = Math.floor(Math.random() * MAP_CONST.NUM_OF_ROW);
            if (
                col >= 0 &&
                col < MAP_CONST.NUM_OF_COL &&
                row >= 0 &&
                row < MAP_CONST.NUM_OF_ROW &&
                this.mapMatrix[col][row] === CELL_TYPE.EMPTY &&
                !this.checkObstacleAround(col, row)
            ) {
                this.mapMatrix[col][row] = CELL_TYPE.OBSTACLE;
                this.addObstacleSprite(col, row);
                obstacleNum--;
            }
        }
    },

    checkObstacleAround: function (xAxis, yAxis) {
        let direction = [-1, 0, 1, 0, -1, -1, 1, 1, -1];
        for (let i = 0; i < direction.length - 1; i++) {
            let col = xAxis + direction[i];
            let row = yAxis + direction[i + 1];
            if (
                col >= 0 &&
                col < MAP_CONST.NUM_OF_COL &&
                row >= 0 &&
                row < MAP_CONST.NUM_OF_ROW &&
                this.mapMatrix[col][row] !== CELL_TYPE.EMPTY
            ) {
                return true;
            }
        }
        return false;
    },

    addObstacleSprite: function (xAxis, yAxis) {
        let obstacle = new cc.Sprite(resources.Map_forest_obstacle_1);
        obstacle.setPosition(
            (xAxis + 0.5) * MAP_CONST.CELL.WIDTH,
            (yAxis + 0.5) * MAP_CONST.CELL.HEIGHT
        );
        this.addChild(obstacle, 1000);
    },

    addMapHouse: function (xAxis, yAxis) {
        let mapHouse = new cc.Sprite(resources.Map_house);
        mapHouse.setPosition(
            (xAxis + 0.5) * mapHouse.width,
            (yAxis + 0.5) * mapHouse.height
        );
        this.mapMatrix[xAxis][yAxis] = CELL_TYPE.HOUSE;
        this.addChild(mapHouse);
    },

    addMonsterGate: function (xAxis, yAxis) {
        let monsterGate = new cc.Sprite(resources.Map_monster_gate);
        monsterGate.setPosition(
            (xAxis + 0.5) * MAP_CONST.CELL.WIDTH,
            (yAxis + 0.5) * MAP_CONST.CELL.HEIGHT
        );
        this.mapMatrix[xAxis][yAxis] = CELL_TYPE.MONSTER_GATE;
        this.addChild(monsterGate);
    },

    findShortestPathToGate: function () {
        let start = [0, 0];
        let end = [MAP_CONST.NUM_OF_COL - 1, MAP_CONST.NUM_OF_ROW - 1];
        let queue = [];
        let visited = Array(MAP_CONST.NUM_OF_COL)
            .fill(false)
            .map(() => new Array(MAP_CONST.NUM_OF_ROW).fill(false));
        let parent = Array(MAP_CONST.NUM_OF_COL)
            .fill([-1, -1])
            .map(() => new Array(MAP_CONST.NUM_OF_ROW).fill([-1, -1]));

        const directions = [-1, 0, 1, 0, -1];
        let path = [];

        queue.push(start);
        visited[start[0]][start[1]] = true;
        while (queue.length) {
            let current = queue.shift();
            if (current[0] === end[0] && current[1] === end[1]) {
                path = this.traceBack(current, start, parent);
                return path;
            }
            for (let i = 0; i < directions.length - 1; i++) {
                let next = [
                    current[0] + directions[i],
                    current[1] + directions[i + 1],
                ];
                if (
                    next[0] >= 0 &&
                    next[0] < MAP_CONST.NUM_OF_COL &&
                    next[1] >= 0 &&
                    next[1] < MAP_CONST.NUM_OF_ROW &&
                    !visited[next[0]][next[1]] &&
                    this.mapMatrix[next[0]][next[1]] !== CELL_TYPE.OBSTACLE
                ) {
                    queue.push(next);
                    visited[next[0]][next[1]] = true;
                    parent[next[0]][next[1]] = current;
                }
            }
        }
        return path;
    },

    traceBack: function (current, start, parent) {
        let path = [];
        while (current[0] !== start[0] || current[1] !== start[1]) {
            path.push(current);
            current = parent[current[0]][current[1]];
        }
        path.push(start);
        return path.reverse();
    },

    addLandToPath: function () {
        this.shortestPathCoordinates = this.findShortestPathToGate();
        // cc.log(JSON.stringify(path));

        // for (let i = 0; i < this.shortestPathCoordinates.length; i++) {
        //     this.addLand(
        //         this.shortestPathCoordinates[i][0],
        //         this.shortestPathCoordinates[i][1]
        //     );
        // }
    },
});
