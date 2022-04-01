import EventEmitter from "events"


import fs from "fs"
import Game from "chess-node"
import Games from Game.Game
import { genRealMove } from Game
import CIG from 'chess-image-generator-ts'
import { MessageType } from "@adiwajshing/baileys"
import games from new Map()
 import challenges from new Map()
 import ongoing from new Set()const EventEmitter from "events"

let handler = async (m, { conn, args, usedPrefix, command }) => {

        import chess from "../lib/chess"
        var Chess = new chess()
        const { parseBoard } = Chess
        
        const end = async(winner) => {
            var game = games.get(m.chat)
            var challenge = challenges.get(m.chat)
             if (!game || !challenge) return null
            var w = (winner === null || winner === void 0 ? void 0 : winner.endsWith('.net')) ? winner
                : winner === 'White'
                    ? challenge.challenger
                    : winner === 'Black'
                        ? challenge.who
                        : null;
                   challenges.set(m.chat, undefined)
                   games.set(m.chat, undefined)
                   ongoing.delete(m.chat)
                 if (!w) return conn.sendMessage(m.chat, 'Permainan Selesai Dengan hasil Seri!', MessageType.text)
               if (w) 
               return m.reply(`@${w.split('@')[0]} menang! 🎊`)
                }
               const print = (m = String) => {
                        if (m === 'Invalid Move' || m.reply === 'Bukan Giliran mu') return m.reply(m)
                      
                        if (m.includes('stalemate')) return end()
                        if (m.includes('wins')) {
                            const winner = m.includes('Black wins') ? 'Black' (): 'White'
                            return end(winner)
                        }
                    }
            if (!args[0]) return m.reply(`♟️ *Chess(catur) Commands* ♟️\n\n🎗️ *${userbot.prefix}chess challenge* - Memulai permainan Dengan mereply Orang yg ingin kamu ajak\n\n🎀 *${userbot.prefix}chess accept* - Menyetujui ajakan seseorang\n\n🔰 *${userbot.prefix}chess reject* - Menolak ajakan challenge\n\n💝 *${userbot.prefix}chess move [fromTile | 'castle'] [toTile]* - untuk menjalankan Pion Catur (refer to the image)\n\n🎋 *${userbot.prefix}chess ff* - until menyerah/meninggalkan match\n\n*💬${userbot.prefix}chess tutorial* - untuk mengetahui Bagaimana cara memainkan catur`
            )
            switch (args[0].toLowerCase()) {
              case "c":
                case "challenge":
                  let who = m.quoted.sender
                 if (!who) return m.reply(`reply Orang yang mau diajak Bermain Catur`)
                  if ( challenges.get(m.chat)) return m.reply('Sesi Chess kamu Masih Ada')
                  challenges.set(m.chat, { challenger: m.sender, 
                  who})
                  return conn.sendMessage(m.chat,
                                `@${m.sender.split('@')[0]} telah mengajak @${
                                    who.split('@')[0]
                                } untuk bermain catur. gunakan *${userbot.prefix}chess accept* untuk memulai ajakan`,
                 MessageType.text, { contextInfo: {mentionedJid: [m.sender,who] }})
                 break
                  case "a":
                    case "accept":
                      const challenge = await challenges.get(m.chat)
                      if ( challenge.who !== m.sender) return m.reply('Tidak ada seseorang yang mengajakmu bermain catur!')
                       ongoing.add(m.chat)
                      const game = new Games(new EventEmitter(), m.chat)
                     await conn.sendMessage(m.chat,
                              `*Game Catur Dimulai!*\n\n⬜ *Putih:* @${challenge.challenger.split('@')[0]}\n⬛ *Hitam:* @${
                                    challenge.who.split('@')[0]
                    }`, MessageType.text, { contextInfo: {mentionedJid: [m.sender, challenge.challenger]}})
                    game.start(print, challenge.challenger, challenge.who, async () => {
                        const cig = new CIG()
                        cig.loadArray(parseBoard(game.board.getPieces(game.white, game.black)))
                        let sent = false
                        if (!sent) {
                            try {
                               var buff = await cig
                                    .generateBuffer()
                            await conn.sendMessage(m.chat, buff, MessageType.image)
                                sent = true
                            } catch (err) {
                                m.reply(err)
                            }
                        }
                    })
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
              return games.set(m.chat, game)
              break
              case "move":
                case "m":
                    const g = games.get(m.chat)
                    if (!g) return m.reply('Tidak ada Sesi Catur!')
                    if (args.length > 3 || args.length < 2) return m.reply(`The move command must be formatted like:\n${userbot.prefix}#chess move fromTile toTile` )
                    if (args[1] == 'castle') {
                                        const to = args[2]
                                        if (to.length != 2 || !(typeof to[0] == 'string') || isNaN(parseInt(to[1])))
                                            return m.reply(
                                                "A move's fromTile and toTile must be of the from 'XZ', where X is a letter A-H, and Z is a number 1-8."
                                            )
                                        const move = {
                                            piece: genRealMove(to)
                                        }
                                        return g.eventEmitter.emit(m.chat, move, print, m.sender, () => async () => {
                                            const cig = new CIG()
                                            cig.loadArray(parseBoard(g.board.getPieces(g.white, g.black)))
                                            let sent = false
                                            if (!sent) {
                                                try {
                                                    await cig.generateBuffer().then(async (data) => await client.sendMessage(m.chat, data, MessageType.image))
                                                    sent = true
                                                } catch (err) {
                                                    m.reply(err)
                                                }
                                            }
                                        })
                                    }
                      const from = args[1]
                      const to = args[2]
                      if (
                                        from.length != 2 ||
                                        !(typeof from[0] == 'string') ||
                                        isNaN(parseInt(from[1])) ||
                                        to.length != 2 ||
                                        !(typeof to[0] == 'string') ||
                                        isNaN(parseInt(to[1]))
                                    )
                         return m.reply(
                                            "A move's fromTile and toTile must be of the from 'XZ', where X is a letter A-H, and Z is a number 1-8."
                                        )
                                    const toMove = genRealMove(to)
                                    const fromMove = genRealMove(from)
                                    if (toMove == null || fromMove == null)
                                        return m.reply(
                                            "A move's fromTile and toTile must be of the from 'XZ', where X is a letter A-H, and Z is a number 1-8."
                                        )
                                    const move = {
                                        from: fromMove,
                                        to: toMove
                                    }
                                    return g.eventEmitter.emit(m.chat, move, print, m.sender, async () => {
                                        const cig = new CIG()
                                        cig.loadArray(parseBoard(g.board.getPieces(g.white, g.black)))
                                        let sent = false
                                        if (!sent) {
                                            try {
                                                await cig.generateBuffer().then(async (data) => await conn.sendMessage(m.chat, data, MessageType.image))
                                                sent = true
                                            } catch (err) {
                                                m.reply(err)
                                            }
                                        }
                                    })
                                    break
                    case "reject":
                        const ch = challenges.get(m.chat)
                        if ((ch === null || ch === void 0 ? void 0 : ch.who) !== m.sender && (ch === null || ch === void 0 ? void 0 : ch.challenger) !== m.sender)if ((ch === null || ch === void 0 ? void 0 : ch.who) !== m.sender && (ch === null || ch === void 0 ? void 0 : ch.challenger) !== m.sender)
                     return m.reply('tidak ada yang mengajak mu bermain catur😪')
                        challenges.set(m.chat, undefined)
                        return m.reply(
                            ch.challenger === m.sender
                                ? `You rejected your challenge`
                                : `You Rejected @${ch.challenger.split('@')[0]}'s Challenge`,
                        )
                        break
                      case "tutorial":
                      const alok = fs.readFileSync("./Lib/tutor.jpg")
                      return conn.sendFile(m.chat, alok, null, `cara jalan contoh:\n ${userbot.prefix}chess move a2 a3\n\nUntuk jalan Silang ${userbot.prefix}chess move a2 b3 `, m)
                      break
                        case 'ff':
                            const ga = challenges.get(m.chat)
                            if (!ga) return m.reply('Tidak ada Sesi Game')
                            const players = Object.values(ga)
                            if (players.includes(m.sender)) {
                                await m.reply('kamu keluar permainan!')
                                return end(players.filter((player) => m.sender !== player)[0])
                            }
                            return m.reply('You are not participating in any games')
                        default:
                            return m.reply(`Invalid Usage Format. Use *#chess* for more info`)
                                                                                                                                                                                 return m.reply(`Invalid Usage Format. Use *#chess* for more info`)
                                                                                                                                                                                 break
            }
}

handler.help = ['chess <pionkode>', 'ch <pionkode>']
handler.tags = ['games']
handler.command = /^(chess|ch)$/i

export default handler
