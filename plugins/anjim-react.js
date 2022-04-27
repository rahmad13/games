import {
ReactionMessage
} from "@adiwajshing/baileys"

let handler = async(m, { conn, usedPrefix, command, args }) => {
    if (!args[0]) throw `Masukkan emoticon nya.\n\nContoh: ${usedPrefix + command} 🇨🇳`

    const react = new proto.ReactionMessage.create({})
            react.text: args[0],
            react.key: m.quoted.key
     
    
    await conn.relayMessage(m.chat, ReactionMessage: react, m)
}
handler.command = /^(react)$/i
handler.help = ['reaact']
handler.tags = ['tools']
export default handler
