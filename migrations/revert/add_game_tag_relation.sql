-- Revert o-gaming:add_game_tag_relation from pg

BEGIN;

DROP TABLE "game_has_tag";

COMMIT;
