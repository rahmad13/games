const {
  useSingleFileAuthState,
  default: _makeWaSocket,
    makeWALegacySocket,
    proto,
    downloadContentFromMessage,
    jidDecode,
    areJidsSameUser,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    WAMessageStubType,
    extractMessageContent,
  DisconnectReason
} = await import('@adiwajshing/baileys')
import { is } from 'cheerio/lib/api/traversing'
import qrcode 'qrcode'
import fs from 'fs'
import path from'path'
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'


let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  
    const { state, saveState } = useSingleFileAuthState('jadibot')
    const connectionOptions = {
     printQRInTerminal: true,
     auth: state,
  // logger: pino({ level: 'trace' })
     }
    const login = makeWASocket(connectionOptions)

conn.on('qr', async qr => {
    conn.sendFile(m.chat, connectionOptions.printQRInTerminal, 'qr.jpg', 'Scan qr ini', m)
    })
 }
handler.help = ['jadibot']
handler.tags = ['jadibot']

handler.command = /^jadibot$/i

handler.limit = true

export default handler
