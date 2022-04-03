
let { Chess } = require("chess.js")

let { upperFirst: uf } = require("../lib/function")

let handler = async(m, { conn, args, usedPrefix, command }) => {
  conn.chess = conn.chess ?? {}
  let str = `♟️ ${command} ♟️\n\nchallenge @tag || c <@tag>\naccept || a\nreject || r\nmove <from> <to> <promotion> || m <from> <to> <promotion>\nsurrender || nyerah`
  if(!args || (args && !args[0])) return m.reply(str)

  let a = args[0].toLowerCase()
  if(a == "challenge" || a == "c") {
    if(conn.chess[m.chat]) return m.reply("Masih ada sesi catur di gc ini!")
    if(Object.values(conn.chess).filter(v => v.w == m.sender || v.b == m.sender)[0]) return m.reply("Kamu masih bermain catur di grup lain!")
    let user = m.mentionedJid[0]
    if(!user) return m.reply("Tag seseorang untuk diajak bermain")
    if(Object.values(conn.chess).filter(v => v.w == user || v.b == user)[0]) return m.reply("Orang yang kamu ajak masih bermain catur di grup lain!")
    if(user == m.sender) return m.reply("Kasian gada yg ngajak main")
    conn.chess[m.chat] = {
      playing: false,
      game: null,
      w: m.sender,
      b: user
    }
    m.reply(`\nMenunggu @${user.split("@")[0]} menulis *${usedPrefix}${command} accept*\n`)
  } else if(a == "accept" || a == "a") {
    if(!conn.chess[m.chat]) return m.reply(`Tidak ada sesi catur di gc ini\nTulis "${usedPrefix}${command} c @user" untuk menantang orang`)
    if(conn.chess[m.chat].w == m.sender) return m.reply("Lawak")
    if(conn.chess[m.chat].b != m.sender) return m.reply("Tidak ada yg menantangmu bermain catur!")
    conn.chess[m.chat].playing = true
    conn.chess[m.chat].game = Chess()
    conn.chess[m.chat].turn = conn.chess[m.chat][conn.chess[m.chat].game.turn()]
    conn.sendFile(m.chat, { url: `http://www.fen-to-image.com/image/36/double/coords/${conn.chess[m.chat].game.fen().split(" ")[0]}` }, "chess.jpg", `Menunggu @${conn.chess[m.chat].turn.split("@")[0]}`, m, false, { mentions: [conn.chess[m.chat]] })
  } else if(a == "reject" || a == "r") {
    if(!conn.chess[m.chat]) return m.reply(`Tidak ada sesi catur di gc ini\nTulis "${usedPrefix}${command} c @user" untuk menantang orang`)
    if(conn.chess[m.chat].w == m.sender) return m.reply("Lawak")
    if(conn.chess[m.chat].b != m.sender) return m.reply("Tidak ada yg menantangmu bermain catur!")
    m.reply(`Tantangan @${conn.chess[m.chat].w.split("@")[0]} ditolak`)
    delete conn.chess[m.chat]
  } else if(a == "move" || a == "m") {
    if(!conn.chess[m.chat]) return m.reply(`Tidak ada sesi catur di gc ini\nTulis "${usedPrefix}${command} c @user" untuk menantang orang`)
    if(conn.chess[m.chat].turn != m.sender) return m.reply(`Giliran @${conn.chess[m.chat].turn.split("@")[0]} untuk bermain!`)
    let from = args[1]
    let to = args[2]
    let promotion = args[3]

    let code = {
      "queen": "q",
      "rook": "r",
      "bishop": "b",
      "knight": "n"
    }
    let figure = {
      "queen": "♕ ♛",
      "rook": "♖ ♜",
      "bishop": "♗ ♝",
      "knight": "♘ ♞"
    }
    let tmp = ""
    for(let i in code) tmp += uf(i) + " (" + figure[i].split(" ")[1] + ")" + " => " + code[i] + "\n"
    if(!Object.values(code).includes(promotion) && promotion) return m.reply(`Promotion\n\n\nType (figure) => type\n\n${tmp.trim()}`)

    if(!from || !to) return m.reply(`Example : ${usedPrefix}${command} move a2 a3`)
    let move = conn.chess[m.chat].game.move({ from, to, ...(promotion ? { promotion } : null) })
    if(move == null) return m.reply("Posisi tidak valid!")
    conn.chess[m.chat].turn = conn.chess[m.chat][conn.chess[m.chat].game.turn()]
    if(conn.chess[m.chat].game.in_checkmate() && conn.chess[m.chat].game.in_check() && conn.chess[m.chat].game.game_over()) {
      conn.sendFile(m.chat, { url: `http://www.fen-to-image.com/image/36/double/coords/${conn.chess[m.chat].game.fen().split(" ")[0]}` }, "chess.jpg",`@${m.sender.split("@")[0]} menang!\n\n💵 1.000`, m, false, { mentions: [conn.chess[m.chat].w, conn.chess[m.chat].b] })
      global.db.data.users[m.sender].money += 1000
      return delete conn.chess[m.chat]
    } else {
      return conn.sendFile(m.chat, { url: `http://www.fen-to-image.com/image/36/double/coords/${conn.chess[m.chat].game.fen().split(" ")[0]}` }, "chess.jpg" ,`Giliran @${conn.chess[m.chat].turn.split("@")[0]}`, m, false, { mentions: [conn.chess[m.chat].turn] })
    }
  } else if(a == "surrender" || a == "nyerah") {
    if(!conn.chess[m.chat]) return m.reply(`Tidak ada sesi catur di gc ini\nTulis "${usedPrefix}${command} c @user" untuk menantang orang`)
    if(conn.chess[m.chat].w != m.sender && conn.chess[m.chat].b != m.sender) return m.reply("Anda tidak dalam permainan!")
    m.reply(`@${m.sender.split("@")[0]} menyerah!`)
    return delete conn.chess[m.chat]
  } else {
    return m.reply(str)
  }
}

handler.help = ["chess challenge <@tag> || accept || reject || move <from> <to> (promotion) || surrender || nyerah"]
handler.tags = ["game"]
handler.group = true
handler.command = /^(chess)$/i

export default handler
