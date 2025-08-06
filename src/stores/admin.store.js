import { proxy } from 'valtio'

export const store = proxy({
  current_player: "",
  playing: false,
  deck: [],
  score: 0,
});

// {"id":"p1754355930133","name":"","store_location":"","games":[],"high_score":0,"current_score":0}