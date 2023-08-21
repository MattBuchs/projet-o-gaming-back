-- Revert o-gaming:init from pg

BEGIN;

DROP TABLE 
    "role", 
    "platform", 
    "user", 
    "game", 
    "issue", 
    "suggestion", 
    "comment",
    "category", 
    "tag", 
    "category_has_game", 
    "issue_has_tag";

COMMIT;
