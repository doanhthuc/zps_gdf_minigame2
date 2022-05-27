const MonsterType = {
    GOLEM: {
        name: 'Golem',
        hp: 100,
        attack: 10,
        moveType: MAP_CONST.MOVE_TYPE.WALK,
        moveSpeed: MAP_CONST.MOVED_SPEED.SLOW,
        imagePathPrefix: './res/images/monster/golem/monster_golem_run_',
        imageIndexByDirection: {
            DOWN: {
                startIndex: 0,
                endIndex: 19,
            },
            RIGHT: {
                startIndex: 40,
                endIndex: 59,
            },
            UP: {
                startIndex: 80,
                endIndex: 99,
            },
        },
    },
    NINJA: {
        name: 'Ninja',
        hp: 50,
        attack: 5,
        moveType: MAP_CONST.MOVE_TYPE.RUN,
        moveSpeed: MAP_CONST.MOVED_SPEED.MEDIUM,
        imagePathPrefix: './res/images/monster/ninja/monster_ninja_run_',
        imageIndexByDirection: {
            DOWN: {
                startIndex: 0,
                endIndex: 9,
            },
            RIGHT: {
                startIndex: 20,
                endIndex: 29,
            },
            UP: {
                startIndex: 40,
                endIndex: 49,
            },
        },
    },
    DARK_GIANT: {
        name: 'Dark Giant',
        hp: 200,
        attack: 20,
        moveType: MAP_CONST.MOVE_TYPE.NORMAL,
        moveSpeed: MAP_CONST.MOVED_SPEED.FAST,
        imagePathPrefix:
            './res/images/monster/dark_giant/monster_dark_giant_run_',
        imageIndexByDirection: {
            DOWN: {
                startIndex: 0,
                endIndex: 13,
            },
            RIGHT: {
                startIndex: 28,
                endIndex: 41,
            },
            UP: {
                startIndex: 56,
                endIndex: 69,
            },
        },
    },
    DESERT_KING: {
        name: 'Desert King',
        hp: 300,
        attack: 30,
        moveType: MAP_CONST.MOVE_TYPE.NORMAL,
        moveSpeed: MAP_CONST.MOVED_SPEED.FAST,
        imagePathPrefix: './res/images/monster/desert_king/monster_desert_king_run_',
        imageIndexByDirection: {
            DOWN: {
                startIndex: 0,
                endIndex: 24,
            },
            RIGHT: {
                startIndex: 50,
                endIndex: 74,
            },
            UP: {
                startIndex: 100,
                endIndex: 124,
            },
        }
    },
    DRAGON: {
        name: 'Dragon',
        hp: 500,
        attack: 50,
        moveType: MAP_CONST.MOVE_TYPE.FLY,
        moveSpeed: MAP_CONST.MOVED_SPEED.FAST,
        imagePathPrefix: './res/images/monster/dragon/monster_dragon_run_',
        imageIndexByDirection: {
            DOWN: {
                startIndex: 0,
                endIndex: 9,
            },
            RIGHT: {
                startIndex: 20,
                endIndex: 29,
            },
            UP: {
                startIndex: 40,
                endIndex: 49,
            },
        },
    }
};
