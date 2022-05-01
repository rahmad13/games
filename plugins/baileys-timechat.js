let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[1]) throw `.setchattime 2022-04-30 15:30 hola`
if (!args[2]) throw `.setchattime 2022-04-30 15:30 hola`
if (!args[3]) throw `.setchattime 2022-04-30 15:30 hola`

let obj = { tanggal: `${args[0]}`, jam: `${args[1]}` }

let date1 = + new Date()

let date2 = + new Date(obj.tanggal + " " + obj.jam)

let teks = args[2]

setTimeout(() => conn.reply(m.chat, text, m), date2 - date1)

}

handler.help = ['setchattime'].map(v => v + ' <tanggal|jam|text>')
handler.tags = ['Baileys']

handler.command = /^(set(chat)?(time)?)$/i
handler.limit = false
export default handler
