const MonsterType = {
    Golem: {
        name: 'Golem',
        hp: 100,
        attack: 10,
        moveType: MAP_CONST.MOVE_TYPE.WALK,
        moveSpeed: MAP_CONST.MOVED_SPEED.SLOW,
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
    Ninja: {
        name: 'Ninja',
        hp: 50,
        attack: 5,
        moveType: MAP_CONST.MOVE_TYPE.RUN,
        moveSpeed: MAP_CONST.MOVED_SPEED.MEDIUM,
    },
};
