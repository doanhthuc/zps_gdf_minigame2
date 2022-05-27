const resources = {
    Map_background: './res/images/map_background.png',
    Map_background_1: './res/images/map_background_0001.png',
    Map_cell_0: './res/images/map_cell_0000.png',
    Map_cell_1: './res/images/map_cell_0001.png',
    Map_cell_2: './res/images/map_cell_0002.png',
    Map_cell_3: './res/images/map_cell_0003.png',
    Map_border_up: './res/images/map_background_0002.png',
    Map_border_down: './res/images/map_background_0003.png',
    Map_forest_obstacle_1: './res/images/map_forest_obstacle_1.png',
    Map_forest_obstacle_2: './res/images/map_forest_obstacle_2.png',
    Map_forest_obstacle_3: './res/images/map_forest_obstacle_3.png',
    Map_house: './res/images/map_house.png',
    Map_monster_gate: './res/images/map_monster_gate_player.png',
    Monster_golem_run: './res/images/monster/golem/monster_golem_run_',
};

// const golem_resource = {
//     Monster_golem_run: './res/images/monster/golem/monster_golem_run',
//     // _0000.png
// };

const g_resources = [];

for (let i in resources) {
    g_resources.push(resources[i]);
}
