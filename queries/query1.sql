USE nbaDB;

select DISTINCT 
game_id,
GAME_DATE, 
team_id,
PTS
from BasicBoxscores
ORDER BY GAME_DATE
DESC LIMIT 40;