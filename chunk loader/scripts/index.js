import { world, system, EntityComponentTypes } from '@minecraft/server';
import { runAfterChunksLoading } from './common/chunk';

world.beforeEvents.playerLeave.subscribe((ev) => {
    const dimension = ev.player.dimension;
    const location = ev.player.location;

    system.runTimeout(() => {
        runAfterChunksLoading(dimension, location, location, () => {
            // 好きな処理
        });
    });
});
