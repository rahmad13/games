import minesweeper from '../lib/mwgrip.js'

let handler = async (m, { conn, command, args }) => {
global.mines = {}
var game = false
        const orgs = args[0]
	const oX = args[1]
	const oY = args[2]
	const F = args[3]
	const x = 10
	const y = 10
	const bomb = 15
	if (!orgs) return m.reply(`*👾 Minesweeper 👾*
	
	*▶️ start* - Memulai Permainan
	*🔓 open* - Untuk Membuka 
        example: .Minesweeper start`)
switch (orgs.toLowerCase()) {
case "start":
if (game) return m.reply("sudah ada sesi permainan")
var map = minesweeper.generate(x, y, bomb)
var empty = await minesweeper.generate_empty(x, y)
m.reply(minesweeper.generate_string(empty))
game = true
return global.mines[m.chat] = { "map": map, "current": empty }
case "open" :
if (game) return m.reply("tidak ada sesi permainan")
const g = global.mines[m.chat]
return global.mines[m.chat] = { "map": map, "current": empty }
if (!oY || !oX) return m.reply("masukkan parameter yang benar.. contoh: /minesweeper open 2 5")
if(F){
                if(F === 'f' && g.current[oY - 1][oX - 1] === 'e'){
                    g.current[oY - 1][oX - 1] = 'f';
                }
            } 
      else {
                g.current[oY - 1][oX - 1] = g.map[oX - 1][oY - 1];
                    if(g.map[oY - 1][oX - 1] === 0){
                        let zero = minesweeper.detect_zero(g.map, oX, oY);
                        for(var i = 0; i < zero.length; i++){
                            g.current[zero[i][0]][zero[i][1]] = g.map[zero[i][0]][zero[i][1]];
                        }                       
                       } else if(g.map[oY - 1][oX - 1] === 'x'){
                        m.reply('GAME OVER');
                        games = {}
                        game = false
                      return m.reply(await minesweeper.generate_string(g.map))
                    }
                }
              m.reply(await minesweeper.generate_string(g.current))
           }
        }

handler.help = ['mw', 'minesweeper'].map(v => v + ' <select>')
handler.tags = ['game']
handler.command = /^(minesweeper|mw)$/i


export default handler
