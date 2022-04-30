let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0]) throw `.setchattime 62823283033324 2022-04-30 15:30 hola`
if (!args[1]) throw `.setchattime 62823283033324 2022-04-30 15:30 hola`
if (!args[2]) throw `.setchattime 62823283033324 2022-04-30 15:30 hola`
if (!args[3]) throw `.setchattime 62823283033324 2022-04-30 15:30 hola`

let obj
obj = { tanggal: `${args[1]}`, jam: `${args[2]` }

let date1 = + new Date()
let date2 = +new Date(obj.tanggal + " " + obj.jam)
let teks = args[3]
setTimeout(() => conn.reply( args[0] + "@s.whatsapp.net", text, m), date2 - date1)

}

handler.help = ['setchattime'].map(v => v + ' <nomeryg mau dikirim chat|tanggal|jam|text>')
handler.tags = ['baileys']

handler.command = /^(set(chat)?(time)?)$/i
handler.limit = false
export default handler
