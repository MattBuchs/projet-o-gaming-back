-- Deploy o-gaming:add_game_tag_relation to pg

BEGIN;

-- CONNECTION TABLES --
CREATE TABLE "game_has_tag" (
    "game_id" int NOT NULL REFERENCES "game"("id"),
    "tag_id" int NOT NULL REFERENCES "tag"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

COMMIT;
