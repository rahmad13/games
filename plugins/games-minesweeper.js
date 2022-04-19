import minesweeper from '../lib/mwgrip.js'

global.mines = {}
var game = false

let handler = async (m, { conn, command, args, usedPrefix }) => {
        const orgs = args[0]
	const oX = args[1]
	const oY = args[2]
	const F = args[3]
	const x = 10
        //kyk Kordinat
	const y = 10
	const bomb = 15
	if (!orgs) return m.reply(`*👾 Minesweeper Game👾*
*▶️ start* - <Start The Game/Memulai Permainan>
*🔓 open* - <to open/Untuk Membuka>
*🔽Surend/Nyerah* - <to give up/menyerah>

*example:* .Minesweeper start


Jika menang Anda dapat *9000 exp🧬* / if you win you get *9000 exp🧬*`)
   
    switch (orgs.toLowerCase()) {

case "start": 
if (game) return m.reply("sedang ada sesi permainan/there is a game session")
var map = minesweeper.generate(x, y, bomb)
var empty = await minesweeper.generate_empty(x, y)
conn.sendButton(m.chat, minesweeper.generate_string(empty)+ '\n' + 'if you win you can get *exp🧬*', author, null, [['Giveup🖐️', usedPrefix + 'mw nyerah']], m)
                 
game = true
return mines[m.chat] = { 'map': map, 'current': empty }

case "nyerah": case "surrend":
game = false
mines[m.chat] = {}
global.db.data.users[m.sender].exp -= 10
return conn.sendButton(m.chat, `You GiveUp❕\nAnda menyerah❕\n\nExp Anda dikurangi *10 exp🧬* / your exp minus *10 exp🧬*`, author, null, [['Ok', 'ok'], ['Play Again', usedPrefix + 'mw start']], m)

case "open" : 
if (game == false) return m.reply("tidak ada sesi permainan/No session Game")
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
                         global.db.data.users[m.sender].exp += 99999
                        conn.sendButton(m.chat, 'YOU WIN🎊🎉\n\n *🎁Hadiah/gift:* 9999Exp🧬', author, null, [['Play Again', usedPrefix + 'mw start']], m)
                        mines[m.chat] = {}
                        game = false
                      global.db.data.users[m.sender].exp -= 100
                     
                      return conn.sendButton(m.chat, await minesweeper.generate_string(g.map) + '\n' + '*You Lose😔* Exp -100', author, null, [['Again', usedPrefix + 'mw start']], m)
                    }
                }
              conn.sendButton(m.chat, await minesweeper.generate_string(g.current) + '\n' + 'if you win you can get *exp🧬*', author, null, [['Giveup🖐️', usedPrefix + 'mw nyerah']], m)
           }
        }
     /**
    MADE BY FAUZAN REKODE OR FIX BY RIZXYU
    **/
handler.help = ['mw', 'minesweeper'].map(v => v + ' <select>' + '<number>'+ '<number>')
handler.tags = ['game']
handler.command = /^(minesweeper|mw)$/i

// LO TAU GAK UDH CAPEK CAPEK BIKIN MALAH DI COMOT ORANG
export default handler
