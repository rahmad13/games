
import utils from "../lib/utils"
utils.default()
import { chunk } from utils

class Chess {
  games = new Map()
  challenges = new Map()
  ongoing = new Set()
  parseBoard = function (board) {
    return chunk(board.map(function (tile) {
        if (tile === 'bK')
            return 'k';
        if (tile === 'wK')
            return 'K';
        if (tile === 'wk')
            return 'N';
        if (tile === 'bk')
            return 'n';
        if (tile[0] === 'w')
            return tile[1].toUpperCase();
        return tile[1].toLowerCase();
    }), 8)
        .reverse();
   };
}
export default Chess
