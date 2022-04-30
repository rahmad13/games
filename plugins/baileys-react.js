let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0]) throw `example: ${usedPrefix +command} 😎`
conn.sendMessage(m.chat, { react: { text: args[0], key: m.key }})
m.reply(m.key)
m.reply('done')
}

handler.help = ['react'].map(v => v + ' <emoji>')
handler.tags = ['baileys']
handler.command = /^(react|reac|reak)$/i

export default handler
