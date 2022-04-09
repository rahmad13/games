let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `_Example:_ ${usedPrefix + command} 10`
let user = global.db.data.users[m.sender]

let caption = `
Kamu Menukarkan 🎑Exp kamu dengan money senilai Rp${text}💵`


if ( user.exp >= text) {
    user.exp -= text
    user.money += text
 m.reply(caption)
} else m.reply('ngadi Ngadi lu duit abis mau ditukerin apa')

}
handler.help = ['tukaruang <jumlah>']
handler.tags = ['xp']

handler.command = /^(tukarmoney|tukaruang)$/i

export default handler
