import { canLevelUp } from '../lib/levelling.js'
import fetch from 'node-fetch'
import canvacord from 'canvacord'

export function before(m) {
    let user = global.db.data.users[m.sender]
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
                return { ...value, jid: key }
        })
     let pp = './src/avatar_contact.png'
     var who = m.sender
     let discriminator = who.substring(9, 13)
        let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
        let usersLevel = sortedLevel.map(enumGetKey)
      let { min, max, xp } = levelling.xpRange(user.level, user.exp, global.multiplier)
    
     try {
                pp = await this.profilePictureUrl(who, 'image')
        } catch (e) {
        } finally {
          if (!user.autolevelup) return !0
        let before = user.level * 1
          while (canLevelUp(user.level, user.exp, global.multiplier))
          user.level++
         if (before !== user.level) {
                        let rank = await new canvacord.Rank()
                                .setRank(usersLevel.indexOf(m.sender) + 1)
                                .setAvatar(pp)
                                .setLevel(user.level)
                                .setCurrentXP(user.exp)
                                .setRequiredXP(max)
                                .setProgressBar("#f2aa4c", "COLOR")
                                .setUsername(this.getName(who))
                                .setDiscriminator(discriminator);
                        rank.build()
                                .then(async data => { conn.sendFile( m.chat, buff, null, `
Selamat, anda telah naik level!
*${before}* -> *${user.level}*
gunakan *.profile* untuk mengecek
	`, m)
            })
        }
    }
}
export const disabled = true
