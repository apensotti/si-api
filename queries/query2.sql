use nbaDB;

SELECT bb.season_id,
bb.team_id,
COUNT(bb.game_id) as `G`,
IF(LEFT(bb.season_id, 1) = '4', 0, 1) as `playoff_indicator`,
SUM(bb.MIN) as `MIN`,
SUM(bb.FGM) as `FGM`,
SUM(bb.FGA) as `FGA`,
SUM(bb.FG3M) as `FG3M`,
SUM(bb.FG3A) as `FG3A`,
SUM(bb.FTM) as `FTM`,
SUM(bb.FTA) as `FTA`,
SUM(bb.OREB) as `OREB`,
SUM(bb.DREB) as `DREB`,
SUM(bb.AST) as `AST`,
SUM(bb.STL) as `STL`,
SUM(bb.BLK) as `BLK`,
SUM(bb.TOV) as `TOV`,
SUM(bb.PF) as `PF`,
SUM(bb.PTS) as `PTS`,
SUM(bb.FGM)/SUM(bb.FGA) as `FG%`,
SUM(bb.FG3M)/SUM(bb.FG3A) as `FG3%`,
SUM(bb.FTM)/SUM(bb.FTA) as `FT%`
FROM `BasicBoxscores` as bb
WHERE bb.team_id = 1610612760
GROUP BY bb.season_id
LIMIT 100;

SELECT bb.season_id,
ds.SEASON_YEAR,
ds.year,
bb.t1_team_id,
COUNT(bb.game_id) as `G`,
IF(LEFT(bb.season_id, 1) = '4', 0, 1) as `playoff_indicator`,
CAST(SUM(bb.t1_MIN) as UNSIGNED) as `t1_MIN`,
CAST(SUM(bb.t1_FGM) as UNSIGNED) as `t1_FGM`,
CAST(SUM(bb.t1_FGA) as UNSIGNED) as `t1_FGA`,
CAST(SUM(bb.t1_FG3M) as UNSIGNED) as `t1_FG3M`,
CAST(SUM(bb.t1_FG3A) as UNSIGNED) as `t1_FG3A`,
CAST(SUM(bb.t1_FTM) as UNSIGNED) as `t1_FTM`,
CAST(SUM(bb.t1_FTA) as UNSIGNED) as `t1_FTA`,
CAST(SUM(bb.t1_OREB) as UNSIGNED) as `t1_OREB`,
CAST(SUM(bb.t1_DREB) as UNSIGNED) as `t1_DREB`,
CAST(SUM(bb.t1_AST) as UNSIGNED) as `t1_AST`,
CAST(SUM(bb.t1_STL) as UNSIGNED) as `t1_STL`,
CAST(SUM(bb.t1_BLK) as UNSIGNED) as `t1_BLK`,
CAST(SUM(bb.t1_TOV) as UNSIGNED) as `t1_TOV`,
CAST(SUM(bb.t1_PF) as UNSIGNED) as `t1_PF`,
CAST(SUM(bb.t1_PTS) as UNSIGNED) as `t1_PTS`,
CAST(SUM(bb.t1_FGM)/SUM(bb.t1_FGA) as FLOAT) as `t1_FG%`,
CAST(SUM(bb.t1_FG3M)/SUM(bb.t1_FG3A) as FLOAT) as `t1_FG3%`,
CAST(SUM(bb.t1_FTM)/SUM(bb.t1_FTA) as FLOAT) as `t1_FT%`,
bb.t2_team_id,
CAST(SUM(bb.t2_MIN) as UNSIGNED) as `t2_MIN`,
CAST(SUM(bb.t2_FGM) as UNSIGNED) as `t2_FGM`,
CAST(SUM(bb.t2_FGA) as UNSIGNED) as `t2_FGA`,
CAST(SUM(bb.t2_FG3M) as UNSIGNED) as `t2_FG3M`,
CAST(SUM(bb.t2_FG3A) as UNSIGNED) as `t2_FG3A`,
CAST(SUM(bb.t2_FTM) as UNSIGNED) as `t2_FTM`,
CAST(SUM(bb.t2_FTA) as UNSIGNED) as `t2_FTA`,
CAST(SUM(bb.t2_OREB) as UNSIGNED) as `t2_OREB`,
CAST(SUM(bb.t2_DREB) as UNSIGNED) as `t2_DREB`,
CAST(SUM(bb.t2_AST) as UNSIGNED) as `t2_AST`,
CAST(SUM(bb.t2_STL) as UNSIGNED) as `t2_STL`,
CAST(SUM(bb.t2_BLK) as UNSIGNED) as `t2_BLK`,
CAST(SUM(bb.t2_TOV) as UNSIGNED) as `t2_TOV`,
CAST(SUM(bb.t2_PF) as UNSIGNED) as `t2_PF`,
CAST(SUM(bb.t2_PTS) as UNSIGNED) as `t2_PTS`,
CAST(SUM(bb.t2_FGM)/SUM(bb.t2_FGA) as FLOAT) as `t2_FG%`,
CAST(SUM(bb.t2_FG3M)/SUM(bb.t2_FG3A) as FLOAT) as `t2_FG3%`,
CAST(SUM(bb.t2_FTM)/SUM(bb.t2_FTA) as FLOAT) as `t2_FT%`
FROM `BasicBoxscoresMatchups` as bb
JOIN `DimSeason` as ds ON bb.season_id = ds.season_id
WHERE (bb.t1_team_id = 1610612760 OR bb.t2_team_id = 1610612760)
GROUP BY bb.season_id
LIMIT 100;

SELECT *
FROM `BasicBoxscoresMatchups`
WHERE t1_team_id = 1610612760 OR t2_team_id = 1610612760
LIMIT 100;

SELECT bb.season_id,
bb.team_id,
COUNT(bb.game_id) as `G`,
CAST(SUM(bb.MIN) as UNSIGNED) as `MIN`,
CAST(SUM(bb.FGM) as UNSIGNED) as `FGM`,
CAST(SUM(bb.FGA) as UNSIGNED) as `FGA`,
CAST(SUM(bb.FG3M) as UNSIGNED) as `FG3M`,
CAST(SUM(bb.FG3A) as UNSIGNED) as `FG3A`,
CAST(SUM(bb.FTM) as UNSIGNED) as `FTM`,
CAST(SUM(bb.FTA) as UNSIGNED) as `FTA`,
CAST(SUM(bb.OREB) as UNSIGNED) as `OREB`,
CAST(SUM(bb.DREB) as UNSIGNED) as `DREB`,
CAST(SUM(bb.AST) as UNSIGNED) as `AST`,
CAST(SUM(bb.STL) as UNSIGNED) as `STL`,
CAST(SUM(bb.BLK) as UNSIGNED) as `BLK`,
CAST(SUM(bb.TOV) as UNSIGNED) as `TOV`,
CAST(SUM(bb.PF) as UNSIGNED) as `PF`,
CAST(SUM(bb.PTS) as UNSIGNED) as `PTS`,
CAST(SUM(bb.FGM)/SUM(bb.FGA) as FLOAT) as `FG%`,
CAST(SUM(bb.FG3M)/SUM(bb.FG3A) as FLOAT) as `FG3%`,
CAST(SUM(bb.FTM)/SUM(bb.FTA) as FLOAT) as `FT%`
FROM `BasicBoxscores` as bb
WHERE game_id = ANY (SELECT game_id FROM `BasicBoxscores` WHERE team_id = 1610612760) and team_id = 1610612760 and LEFT(bb.season_id, 1) != '4'
GROUP BY bb.season_id

SELECT bb.season_id,
bb.team_id,
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
CAST(SUM(bb.FGM)/SUM(bb.FGA) as FLOAT) as 'FG%',
CAST(SUM(bb.FG3M)/SUM(bb.FG3A) as FLOAT) as 'FG3%',
CAST(SUM(bb.FTM)/SUM(bb.FTA) as FLOAT) as 'FT%'
FROM BasicBoxscores as bb
JOIN DimSeason as ds ON bb.season_id = ds.season_id
WHERE game_id = ANY (SELECT game_id FROM BasicBoxscores WHERE team_id = 1610612760) 
and team_id = 1610612760 
and LEFT(bb.season_id, 1) != '4' 
and ds.year = 2019
GROUP BY bb.season_id

SELECT bb.season_id,
(SELECT DISTINCT team_id FROM BasicBoxscores WHERE team_id = 1610612760) as team_id,
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
FROM BasicBoxscores as bb
JOIN DimSeason as ds ON bb.season_id = ds.season_id
WHERE game_id = ANY (SELECT game_id FROM BasicBoxscores WHERE team_id = 1610612760) 
and team_id = 1610612760
and LEFT(bb.season_id, 1) != '4' 
and ds.year = 2019
GROUP BY bb.season_id

SELECT DISTINCT team_id
FROM BasicBoxscores
WHERE team_id = 1610612760