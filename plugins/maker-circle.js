import { Canvas } = require("canvacord")

let handler = async (m, { conn, args, usedPrefix, command }) => {


let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
Canvas.circle(await conn.profilePictureUrl(who).catch(_ => './src/avatar_contact.png')).then((p) => conn.sendFile(m.chat, p, 'pp.jpg', 'done\n Made with canvas', m))

handler.help = ['circle'].map(v => v + ' <@tag>')
handler.tags = ['maker']

handler.command = /^(cir(cle)?(le)?(cele)?(kel)?)$/i
export default handler

