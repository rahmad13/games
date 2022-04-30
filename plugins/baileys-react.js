import * as baileys from "@adiwajshing/baileys"

let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0]) throw `example: ${usedPrefix +command} 😎`
        const react = new baileys.proto.ReactionMessage.create({})

        react.key = m.quoted.id
        react.text = args[0]
        react.senderTimestampMs = {
            low: 12345678,
            high: 0,
            unsigned: false
        }

         conn.relayMessage(m.chat, {
            reactionMessage: react
        }, { messageId: baileys.generateMessageID() })
m.reply(m 
m.reply('done')
}

handler.help = ['react'].map(v => v + ' <emoji>')
handler.tags = ['baileys']
handler.command = /^(react|reac|reak)$/i

export default handler