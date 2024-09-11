import { system } from '@minecraft/server';

const requests = [];

export function runAfterChunksLoading(dimension, begin, end, callback) {
  dimension.runCommand(`tickingarea add ${begin.x} ${begin.y} ${begin.z} ${end.x} ${end.y} ${end.z} player_system`);
  dimension.runCommand(`schedule on_area_loaded add tickingarea player_system chunks_loaded`);

  requests.push({ callback: callback, dimension: dimension });
}

system.afterEvents.scriptEventReceive.subscribe((ev) => {
  if (ev.id !== 'player_system:chunks_loaded') return;

  const request = requests.shift();

  request.callback();
  request.dimension.runCommand(`tickingarea remove player_system`);
});
