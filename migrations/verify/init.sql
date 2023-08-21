-- Verify o-gaming:init on pg

BEGIN;

SELECT * FROM "role" WHERE false;
SELECT * FROM "platform" WHERE false;
SELECT * FROM "user" WHERE false;
SELECT * FROM "game" WHERE false;
SELECT * FROM "issue" WHERE false;
SELECT * FROM "suggestion" WHERE false;
SELECT * FROM "comment" WHERE false;
SELECT * FROM "category" WHERE false;
SELECT * FROM "tag" WHERE false;
SELECT * FROM "category_has_game" WHERE false;
SELECT * FROM "issue_has_tag" WHERE false;

ROLLBACK;
