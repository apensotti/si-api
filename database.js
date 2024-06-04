import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
}).promise()

export async function getPlayerCareer(player_id) {
    const [result] = await pool.query(`SELECT * FROM ${process.env.DATABASE}.PlayerCareers as pc 
                                    LEFT JOIN ${process.env.DATABASE}.DimPlayers as dp ON pc.player_id = dp.player_id 
                                    WHERE pc.player_id = ?`, [player_id])
    return result
}

export async function getSeasons() {
    const [result] = await pool.query(`SELECT * FROM ${process.env.DATABASE}.DimSeason`)
    return result
}

export async function getPlayerDetails(player_id) {
    const [result] = await pool.query(`SELECT * FROM ${process.env.DATABASE}.PlayerCareers as pc 
                                    LEFT JOIN ${process.env.DATABASE}.DimPlayers as dp ON pc.player_id = dp.player_id 
                                    WHERE pc.player_id = ?`, [player_id])
    return result
}

export async function getGamePlayers(game_id,team_id) {
    const [result] = await pool.query(`SELECT dp.full_name,
                                        pgs.*,
                                        pi.PLAYER_IMAGE
                                        FROM ${process.env.DATABASE}.PlayerGameStats as pgs 
                                        JOIN ${process.env.DATABASE}.DimPlayers as dp on pgs.player_id=dp.player_id
                                        JOIN ${process.env.DATABASE}.DimPlayersImages as pi on pgs.player_id=pi.player_id
                                        WHERE pgs.game_id = ${game_id} and pgs.team_id=${team_id}`)
    return result
}

export async function getCoachRoster(team_id, season) {
    const [result] = await pool.query(`SELECT * 
                                        FROM ${process.env.DATABASE}.CommonCoachRoster as ccr
                                        JOIN ${process.env.DATABASE}.DimSeason ds on ccr.SEASON = ds.year
                                        WHERE ccr.team_id = ${team_id} and ds.year = ${season}`)
    return result
}

export async function getPlayerRoster(team_id, season) {
    const [result] = await pool.query(`SELECT * 
                                        FROM ${process.env.DATABASE}.CommonPlayerRoster as cpr
                                        WHERE cpr.team_id = ${team_id} and cpr.SEASON = ${season}`)
    return result
}

export async function getPlayerImages(player_id) {
    const [result] = await pool.query(`SELECT * FROM ${process.env.DATABASE}.DimPlayersImages WHERE player_id = ?`, [player_id])
    return result
}

export async function getTeamInfo(team_id) {
    const [result] = await pool.query(`SELECT * FROM ${process.env.DATABASE}.DimTeams WHERE team_id = ?`, [team_id])
    return result
}

export async function getAllTeamInfo() {
    const [result] = await pool.query(`SELECT * FROM ${process.env.DATABASE}.DimTeams`)
    return result
}

export async function getAllBasicBoxscores() {
    const [result] = await pool.query(`SELECT game_id,
                                                GAME_DATE, 
                                                team_id,
                                                PTS 
                                                FROM ${process.env.DATABASE}.BasicBoxscores
                                                ORDER BY game_id DESC`)
    return result
}

export async function paginateBoxscores(cursor, lastIndex) {
    console.log(cursor, lastIndex);

    const [result] = await pool.query(`SELECT * 
                                            FROM ${process.env.DATABASE}.Matchups 
                                            WHERE r > ${cursor} and r <= ${lastIndex}
                                            ORDER BY r ASC`)

    return result
}

export async function getTeamGames(team_id) {
    const [result] = await pool.query(`SELECT 
                                        bb.team_id,
                                        dt.team_nickname,
                                        bb.game_id,
                                        bb.WL,
                                        bb.DREB,
                                        bb.PLUS_MINUS,
                                        ab.PIE
                                        FROM ${process.env.DATABASE}.BasicBoxscores as bb
                                        LEFT JOIN ${process.env.DATABASE}.DimTeams as dt ON bb.team_id=dt.team_id
                                        LEFT JOIN ${process.env.DATABASE}.AdvancedBoxscores as ab ON bb.game_id=ab.game_id and bb.team_id=ab.team_id
                                        WHERE bb.team_id = ?`, [team_id])
    return result

}

export async function getGameInfo(game_id, team_id) {
    const [result] = await pool.query(`SELECT 
                                        b.team_id,
                                        dt.full_name,
                                        dt.team_abbreviation,
                                        dt.team_nickname,
                                        dt.team_city,
                                        b.game_id,
                                        b.GAME_DATE,
                                        b.MATCHUP,
                                        b.WL,
                                        b.PTS,
                                        b.FGM,
                                        b.FGA,
                                        b.FG_PCT,
                                        b.FG3M,
                                        b.FG3A,
                                        b.FG3_PCT,
                                        b.FTM,
                                        b.FTA,
                                        b.FT_PCT,
                                        b.OREB,
                                        b.DREB,
                                        b.REB,
                                        b.AST,
                                        b.STL,
                                        b.BLK,
                                        b.TOV,
                                        a.PIE,
                                        a.POSS,
                                        a.E_OFF_RATING,
                                        a.OFF_RATING,
                                        a.E_DEF_RATING,
                                        a.DEF_RATING,
                                        a.E_NET_RATING,
                                        a.NET_RATING,
                                        a.AST_PCT,
                                        a.AST_TOV,
                                        a.AST_RATIO,
                                        a.DREB_PCT,
                                        a.REB_PCT,
                                        a.E_TM_TOV_PCT,
                                        a.TS_PCT,
                                        a.USG_PCT,
                                        a.E_USG_PCT,
                                        a.E_PACE,
                                        a.PACE,
                                        a.PACE_PER40,
                                        tff.EFG_PCT,
                                        tff.FTA_RATE,
                                        tff.TM_TOV_PCT,
                                        tff.OREB_PCT,
                                        tff.EFG_PCT_DIFF,
                                        tff.FTA_RATE_DIFF,
                                        tff.TOV_DIFF,
                                        tff.OREB_PCT_DIFF
                                        FROM BasicBoxscores as b
                                        LEFT JOIN ${process.env.DATABASE}.AdvancedBoxscores as a ON b.game_id=a.game_id and b.team_id=a.team_id
                                        LEFT JOIN ${process.env.DATABASE}.TeamFourFactors as tff ON b.game_id=tff.game_id and b.team_id=tff.team_id
                                        JOIN ${process.env.DATABASE}.DimTeams as dt on b.team_id=dt.team_id
                                                                                WHERE b.game_id = ${game_id} and b.team_id = ${team_id}`)
    return result

}

export async function getTeamSeasonTotals(team_id, season) {
    const [result] = await pool.query(`SELECT bb.season_id,
                                        (SELECT DISTINCT team_id FROM ${process.env.DATABASE}.BasicBoxscores WHERE team_id = ${team_id}) as team_id,
                                        ds.year,
                                        COUNT(bb.game_id) as G,
                                        CAST(SUM(bb.MIN) as UNSIGNED) as MIN,
                                        CAST(SUM(bb.FGM) as UNSIGNED) as FGM,
                                        CAST(SUM(bb.FGA) as UNSIGNED) as FGA,
                                        CAST(SUM(bb.FG3M) as UNSIGNED) as FG3M,
                                        CAST(SUM(bb.FG3A) as UNSIGNED) as FG3A,
                                        CAST(SUM(bb.FTM) as UNSIGNED) as FTM,
                                        CAST(SUM(bb.FTA) as UNSIGNED) as FTA,
                                        CAST(SUM(bb.OREB) as UNSIGNED) as OREB,
                                        CAST(SUM(bb.DREB) as UNSIGNED) as DREB,
                                        CAST(SUM(bb.AST) as UNSIGNED) as AST,
                                        CAST(SUM(bb.STL) as UNSIGNED) as STL,
                                        CAST(SUM(bb.BLK) as UNSIGNED) as BLK,
                                        CAST(SUM(bb.TOV) as UNSIGNED) as TOV,
                                        CAST(SUM(bb.PF) as UNSIGNED) as PF,
                                        CAST(SUM(bb.PTS) as UNSIGNED) as PTS,
                                        CAST(SUM(bb.FGM)/SUM(bb.FGA) as FLOAT) as 'FG_PCT',
                                        CAST(SUM(bb.FG3M)/SUM(bb.FG3A) as FLOAT) as 'FG3_PCT',
                                        CAST(SUM(bb.FTM)/SUM(bb.FTA) as FLOAT) as 'FT_PCT'
                                        FROM ${process.env.DATABASE}.BasicBoxscores as bb
                                        JOIN ${process.env.DATABASE}.DimSeason as ds ON bb.season_id = ds.season_id
                                        WHERE game_id = ANY (SELECT game_id FROM ${process.env.DATABASE}.BasicBoxscores WHERE team_id = ${team_id}) 
                                        and team_id = ${team_id} 
                                        and LEFT(bb.season_id, 1) != '4' 
                                        and ds.year = ${season}
                                        GROUP BY bb.season_id`, [team_id,season])
    return result

}

export async function getOppSeasonTotals(team_id, season) {
    const [result] = await pool.query(`SELECT bb.season_id,
                                        (SELECT DISTINCT team_id FROM ${process.env.DATABASE}.BasicBoxscores WHERE team_id = ${team_id}) as team_id,
                                        ds.year,
                                        COUNT(bb.game_id) as G,
                                        CAST(SUM(bb.MIN) as UNSIGNED) as MIN,
                                        CAST(SUM(bb.FGM) as UNSIGNED) as FGM,
                                        CAST(SUM(bb.FGA) as UNSIGNED) as FGA,
                                        CAST(SUM(bb.FG3M) as UNSIGNED) as FG3M,
                                        CAST(SUM(bb.FG3A) as UNSIGNED) as FG3A,
                                        CAST(SUM(bb.FTM) as UNSIGNED) as FTM,
                                        CAST(SUM(bb.FTA) as UNSIGNED) as FTA,
                                        CAST(SUM(bb.OREB) as UNSIGNED) as OREB,
                                        CAST(SUM(bb.DREB) as UNSIGNED) as DREB,
                                        CAST(SUM(bb.AST) as UNSIGNED) as AST,
                                        CAST(SUM(bb.STL) as UNSIGNED) as STL,
                                        CAST(SUM(bb.BLK) as UNSIGNED) as BLK,
                                        CAST(SUM(bb.TOV) as UNSIGNED) as TOV,
                                        CAST(SUM(bb.PF) as UNSIGNED) as PF,
                                        CAST(SUM(bb.PTS) as UNSIGNED) as PTS,
                                        CAST(SUM(bb.FGM)/SUM(bb.FGA) as FLOAT) as 'FG_PCT',
                                        CAST(SUM(bb.FG3M)/SUM(bb.FG3A) as FLOAT) as 'FG3_PCT',
                                        CAST(SUM(bb.FTM)/SUM(bb.FTA) as FLOAT) as 'FT_PCT'
                                        FROM ${process.env.DATABASE}.BasicBoxscores as bb
                                        JOIN ${process.env.DATABASE}.DimSeason as ds ON bb.season_id = ds.season_id
                                        WHERE game_id = ANY (SELECT game_id FROM ${process.env.DATABASE}.BasicBoxscores WHERE team_id = ${team_id}) 
                                        and team_id != ${team_id} 
                                        and LEFT(bb.season_id, 1) != '4' 
                                        and ds.year = ${season}
                                        GROUP BY bb.season_id`, [team_id,season])
    return result

}

export async function getTeamRecentGames(team_id, count) {
    const [result] = await pool.query(`SELECT 
                                        dt.full_name,
                                        dt.team_abbreviation,
                                        dt.team_nickname,
                                        dt.team_city,
                                        b.* 
                                        FROM ${process.env.DATABASE}.BasicBoxscores as b
                                        JOIN ${process.env.DATABASE}.DimTeams as dt on b.team_id=dt.team_id
                                        WHERE b.team_id = ${team_id} 
                                        ORDER BY GAME_DATE desc 
                                        LIMIT ${count}`)

    return result
}