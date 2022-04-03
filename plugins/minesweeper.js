import minesweeper from '../lib/mwgrip.js'
//kelupaan
global.mines = {}


//Taruh sini lah
let handler = async (m, { conn, command, args, usedPrefix }) => {
var user = global.db.data.users[m.sender]
var player = user[m.sender].gamemines
        const orgs = args[0]
	const oX = args[1]
	const oY = args[2]
	const F = args[3]
	const x = 10
	const y = 10
	const bomb = 15
	if (!orgs) return m.reply(`*👾 Minesweeper Game👾*
*▶️ start* - <Start The Game/Memulai Permainan>
*🔓 open* - <to open/Untuk Membuka>
*🔽Surend/Nyerah* - <to give up/menyerah>
example: .Minesweeper start
Jika menang Anda dapat *9000 exp🧬* / if you win you get *9000 exp🧬*`)
   
    switch (orgs.toLowerCase()) {

case "start": 
if (player) return m.reply("sudah ada sesi permainan")
var map = minesweeper.generate(x, y, bomb)
var empty = await minesweeper.generate_empty(x, y)
m.reply(minesweeper.generate_string(empty))
player = true
return mines[m.chat] = { 'map': map, 'current': empty }

case "nyerah": case "surrend":
player = false
mines[m.chat] = {}
global.db.data.users[m.sender].exp -= 10
conn.sendButton(m.chat, `You GiveUp❕\nAnda menyerah❕\n\nExp Anda dikurangi *10 exp🧬* / your exp minus *10 exp🧬*`, author, null, [['Ok', 'ok'], ['Play Again', usedPrefix + 'mw start']], m)

case "open" : 
if (player == false) return m.reply("tidak ada sesi permainan")
var g = global.mines[m.chat]

if (!oX || !oY) return m.reply("masukkan parameter yang benar.. contoh: /minesweeper open 2 5")
//Eror keknya 
if(F){
                if(F === 'f' && g.current[oY - 1][oX - 1] === 'e'){
                    g.current[oY - 1][oX - 1] = 'f'
                }
            } 
      else {
                g.current[oY - 1][oX - 1] = g.map[oX - 1][oY - 1]
                    if(g.map[oY - 1][oX - 1] === 0){
                        let zero = minesweeper.detect_zero(g.map, oX, oY)
                        for(var i = 0; i < zero.length; i++){
                            g.current[zero[i][0]][zero[i][1]] = g.map[zero[i][0]][zero[i][1]]
                        }                       
                       } else if(g.map[oY - 1][oX - 1] === 'x'){
                        conn.sendButton(m.chat, 'GAME OVER🪦\n\n your *exp🧬* has been taken', author, null, [['Play Again', usedPrefix + 'mw start']], m)
                        mines[m.chat] = {}
                        player = false
                      return conn.sendButton(m.chat, await minesweeper.generate_string(g.map) + '\n' + 'if you win you can get *exp🧬*', author, null, [['Giveup🖐️', usedPrefix + 'mw nyerah']], m)
                    }
                }
              conn.sendButton(m.chat, await minesweeper.generate_string(g.current) + '\n' + 'if you win you can get *exp🧬*', author, null, [['Giveup🖐️', usedPrefix + 'mw nyerah']], m)
           }
        }

handler.help = ['mw', 'minesweeper'].map(v => v + ' <select>' + '<number>'+ '<number>')
handler.tags = ['game']
handler.command = /^(minesweeper|mw)$/i

// LO TAU GAK UDH CAPEK CAPEK BIKIN MALAH DI COMOT ORANG
export default handler
