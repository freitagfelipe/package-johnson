# Package Johnson - Discord

- Initially, Package Johnson was an inside joke, caused by my confusion around the name package.json, which I misread as "package johnson". But then I saw an opportunity: what if I could make a Bot that would help me learn more about programming and that could honor that joke? With all that in mind, I decided to transform Package Johnson, that was just an inside joke, into a real thing!

### How Package Johnson - Discord was made

- Package Johnson is written in NodeJS, using [Discord.Js](https://discord.js.org/#/) lib to communicate with Discord API and other libs like:
	- [Discord.js-pagination](https://www.npmjs.com/package/discord.js-pagination)
	- [Dotenv](https://www.npmjs.com/package/dotenv)
	- [Ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static)
	- [Jikan-node](https://www.npmjs.com/package/jikan-node)
	- [Lyrics-finder](https://www.npmjs.com/package/lyrics-finder)
	- [Node-fetch](https://www.npmjs.com/package/node-fetch)
	- [Opusscript](https://www.npmjs.com/package/opusscript)
	- [Ytdl-core](https://www.npmjs.com/package/ytdl-core)
	- [Ytsr](https://www.npmjs.com/package/ytsr)

### Command list

| Page one                              | Page two                  | Page three                 | Page four                       | 
| --------------------------------------| --------------------------| ---------------------------| --------------------------------|
| [anime-endings](#anime-endings)       | [grab-music](#grab-music) | [netx](#next)              | [quiz-scores](#quiz-scores)     |
| [anime-openings](#anime-openings)     | [help](#help)             | [next-play](#next-play)    | [remove](#remove-section)       |
| [avatar](#avatar)                     | [join](#join)             | [now-playing](#now-playing)| [resume](#resume)               |
| [ban](#ban)                           | [jump](#jump)             | [pause](#pause)            | [search](#search)               |
| [clear](#clear-section)               | [kick](#kick)             | [ping](#ping)              | [search-anime](#search-anime)   |
| [clear-queue](#clear-queue)           | [leave](#leave)           | [play](#play)              | [shuffle-queue](#shuffle-queue) |
| [commands](#commands)                 | [link](#link)             | [play-top](#play-top)      | [status](#status)               |
| [even-or-odd](#even-or-odd)           | [loop-music](#loop-music) | [playlist](#playlist)      | [volume](#volume)               |
| [fortnite-store](#fortnite-store)     | [loop-queue](#loop-queue) | [queue](#queue)            |
| [fortnite-tracker](#fortnite-tracker) | [lyrics](#lyrics)         | [quiz](#quiz)              |

### Interaction list
| Page one                              |
| --------------------------------------|
| [good afternoon](#good-afternoon)     |
| [good moorning](#good-morning)        |
| [good night](#good-night)             |
| [greeting message](#greeting-message) |

### How to host

1. Go in [Discord applications](https://discord.com/developers/applications).
2. Create a new application and save the bot token.
3. Go in [Tracker](https://tracker.gg/developers/apps).
4. Create a new application and save the API Key.
5. Create a link to your bot in [Permissions Calculator](https://discordapi.com/permissions.html) with administrator permissions.
5. Download this repository.
6. In your repository folder open a terminal and type npm install.
7. Create a .env file and paste it inside:
	1. TOKEN = < YOUR-DISCORD-BOT-TOKEN >
	2. TRN = < YOUR-TRN-API-KEY >
	3. LINK = < YOUR-DICORD-BOT-LINK >
8. Create a [Heroku](https://heroku.com) account.
9. Create a new app in Heroku.
10. Deploy this repository using Github or Heroku CLI.
11. Set the bot token in Heroku's eviroment variables.

**Don't share your keys with anyone!**

### Commands help

#### anime-endings
- Description: searches the anime that you requested and send his endings musics
- Aliases: animeendings, ae
- Usage: .pj anime-endings < anime name >

#### anime-openings
- Description: searches the anime that you requested and send his openings musics
- Aliases: animeopenings, ao
- Usage: .pj anime-openings <anime name\>

#### avatar
- Description: shows your avatar or the avatar of who you have tagged
- Usage: .pj avatar or .pj avatar <user mention\>

#### ban
- Description: ban a user from your discord server
- Usage: .pj ban <user mention> or .pj ban <user mention\> <reason\>

#### <a name="clear-section"></a>clear
- Description: clear messages in the channel
- Aliase: c
- Usage: .pj clear <number of messages\>

#### clear-queue
- Description: clear the current server music queue
- Aliases: cq, clearqueue
- Usage: .pj clear-queue

#### commands
- Description: shows the name of all commands
- Usage: .pj commands

#### even-or-odd
- Description: Package Johnson will play even or odd with you
- Aliases: eo, evenorodd
- Usage: .pj even-or-odd <even or odd\> <number\>

#### fortnite-store
- Description: shows the current fortnite store
- Aliases: fnstore, fn-store, store
- Usage: .pj fortnite-store

#### fortnite-tracker
- Description: shows the status of a player on fortnite
- Aliases: fntracker, fn-tracker
- .pj fortnite-tracker <platform\> <fortnite nickname\>

#### grab-music
- Description: send the current music in your private chat
- Aliase: grab
- Usage: .pj grab-music

#### help
- Description: teaches you how to use a command
- Aliase: h
- Usage: .pj help <command name\>

#### join
- Description: Package Johnson will join in your current voice channel
- Aliases: connect, summon
- Usage: .pj join

#### jump
- Description: jump to a specific song in the queue and start playing it
- Aliase: j
- .pj jump <music number\>

#### kick
- Description: kick a member from your discord server
- Usage: .pj kick <user mention\> or .pj kick <user mention\> <reason\>

#### leave
- Description: forces Package Johnson to leave the voice channel
- Aliases: disconnect, dc, lv
- Usage: .pj leave

#### link
- Description: shows the link to add Package Johnson in your discord server
- Usage: .pj link

#### loop-music
- Description: loop the actual music
- Aliases: lm, loopmusic
- Usage: .pj loop-music

#### loop-queue
- Description: loop the actual queue
- Aliases: lq, loopqueue
- Usage: .pj loop-queue

#### lyrics
- Description: shows the lyrics of a music
- Aliase: l
- Usage: .pj lyrics <music name\> | <author name\>

#### next
- Description: skip to the next song
- Aliase: skip
- Usage: .pj next

#### next-play
- Description: add a song on the top of the queue and skip the current song
- Aliases: skip-play, sp
- Usage: .pj next-play <music name or music link\>

#### now-playing
- Description: show informations about the song that is currently playing
- Aliases: np, nowplaying
- Usage: .pj now-playing

#### pause
- Description: pauses the current song
- Aliase: stop
- Usage: .pj pause

#### ping
- Description: shows your ping and the latency ping
- Usage: .pj ping

#### play
- Description: play a song in your current voice channel
- Aliase: p
- Usage: .pj play <music name or music link\>

#### playlist
- Description: shows my favorite lofi playlist
- Aliase: pl
- Usage: .pj playlist

#### play-top
- Description: add a song on the top of the queue
- Aliases: pt, playtop
- Usage: .pj play-top <music name or music link\>

#### queue
- Description: shows the current music queue
- Aliases: q, musics
- Usage: .pj queue

#### quiz
- Description: Package Johnson will send a question in the channel
- Usage: .pj quiz

#### quiz-scores
- Description: shows the top 10 quiz scores
- Aliases: qs, quizscores
- Usage: .pj quiz-scores

#### <a name="remove-section"></a>remove
- Description: removes the selected song from the queue
- Aliases: delete, del, rm
- Usage: .pj remove <music number\>

#### resume
- Description: continues playing the song that is paused
- Aliases: continue, r
- Usage: .pj resume

#### search
- Description: searches for a music name and send a list to you choose wich one will play
- Usage: .pj search

#### search-anime
- Description: searches the anime that you requested and send it's information
- Aliases: searchanime, sa
- Usage: .pj search-anime <anime name\>

#### shuffle-queue
- Description: shuffle your current queue
- Aliases: random, shuffle, random-queue
- Usage: .pj shuffle-queue

#### status
- Description: shows your user stats or the user stats of who you have tagged
- Aliases: userinfo, user-info
- Usage: .pj status or .pj status <user mention\>

#### volume
- Description: shows the current volume level or changes volume to a provided value
- Aliases: vol, v
- Usage: .pj volume or .pj volume <volume number\>

### Interactions help

#### <a name="good-afternoon"></a>good afternoon
- good afternoon @Package Johnson

#### <a name="good-morning"></a>good morning
- good morning @Package Johnson
#### <a name="good-night"></a>good night
- good night @Package Johnson

#### <a name="greeting-message"></a>greeting message
- hi @Package Johnson