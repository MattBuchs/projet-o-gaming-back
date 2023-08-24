-- Verify o-gaming:add_game_tag_relation on pg

BEGIN;

SELECT * FROM "game_has_tag" WHERE false;

ROLLBACK;
