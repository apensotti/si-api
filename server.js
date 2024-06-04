import express from 'express'
import cors from 'cors'
import { getPlayerCareer, getSeasons,getAllTeamInfo,getTeamRecentGames,getGamePlayers ,getPlayerImages,paginateBoxscores, getTeamInfo, getGameInfo, getTeamGames, getCoachRoster, getPlayerRoster, getTeamSeasonTotals, getOppSeasonTotals} from './database.js'

const app = express()

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

app.get('/api/player-career/:player_id', async (req,res) => {
    const player_id = req.params.player_id
    const player_career = await getPlayerCareer(player_id)
    res.send(player_career)
})

app.get('/api/basicboxscores/pages/:page/:limit', async (req,res) => {
    const page = Number(req.params.page)
    const limit = Number(req.params.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const data = await paginateBoxscores(startIndex,endIndex)
    const nextCursor = endIndex + 1
    const nextPage = page + 1
    const previousPage = page - 1

    res.send({data, nextCursor, nextPage, previousPage})
})

app.get('/api/team/team-info/', async (req,res) => {
    const team = await getAllTeamInfo()
    res.send(team)
})

app.get('/api/seasons/', async (req,res) => {
    const seasons = await getSeasons()
    res.send(seasons)
})

app.get('/api/team/team-info/:team_id', async (req,res) => {
    const team_id = req.params.team_id
    const team = await getTeamInfo(team_id)
    res.send(team)
})

app.get('/api/basicboxscores/team-games/:team_id', async (req,res) => {
    const team_id = req.params.team_id
    const games = await getTeamGames(team_id)
    res.send(games)
})

// useFindGame.ts hook
app.get('/api/basicboxscores/game-info/:game_id/:team_id', async (req,res) => {
    const game_id = req.params.game_id
    const team_id = req.params.team_id
    const game = await getGameInfo(game_id, team_id)
    res.send(game)
})

app.get('/api/players/game-info/:game_id/:team_id', async (req,res) => {
    const game_id = req.params.game_id
    const team_id = req.params.team_id
    const game = await getGamePlayers(game_id,team_id)
    res.send(game)
})

app.get('/api/players/images/:player_id', async (req,res) => {
    const player_id = req.params.player_id
    const image_data = await getPlayerImages(player_id)
    res.send(image_data)
})

app.get('/api/team/games/:team_id/:count', async (req,res) => {
    const team_id = req.params.team_id
    const count = req.params.count
    const recent_games = await getTeamRecentGames(team_id,count)
    res.send(recent_games)
})

app.get('/api/team/team-info/staff/:team_id/:season', async (req,res) => {
    const team_id = req.params.team_id
    const season = req.params.season
    const recent_games = await getCoachRoster(team_id,season)
    res.send(recent_games)
})

app.get('/api/team/team-info/players/:team_id/:season', async (req,res) => {
    const team_id = req.params.team_id
    const season = req.params.season
    const recent_games = await getPlayerRoster(team_id,season)
    res.send(recent_games)
})

app.get('/api/team/team-info/team-season-total/:team_id/:season', async (req,res) => {
    const team_id = req.params.team_id
    const season = req.params.season
    const recent_games = await getTeamSeasonTotals(team_id,season)
    res.send(recent_games)
})

app.get('/api/team/team-info/opp-season-total/:team_id/:season', async (req,res) => {
    const team_id = req.params.team_id
    const season = req.params.season
    const recent_games = await getOppSeasonTotals(team_id,season)
    res.send(recent_games)
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})