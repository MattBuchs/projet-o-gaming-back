-- Deploy o-gaming:init to pg

BEGIN;


-- TABLES --

CREATE TABLE "role" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "platform" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" text NOT NULL,
    "email" text NOT NULL UNIQUE CHECK (
      "email" ~ '^([a-zA-Z0-9_\-]+\.)*[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+(com|org|edu|net|ca|au|coop|de|ee|es|fm|fr|gr|ie|in|it|jp|me|nl|nu|ru|uk|us|za)$'
        -- "email" ~ '^(?:[a-zA-Z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$'
    ),
    "password" text NOT NULL,
    "avatar" text,
    "role_id" int NOT NULL REFERENCES "role"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "game" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    "description" text NOT NULL,
    "picture" text NOT NULL,
    "external_link" text NOT NULL,
    "release_date" timestamptz NOT NULL DEFAULT now(),
    "user_id" int NOT NULL REFERENCES "user"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "issue" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "status" text,
    "is_minor" boolean NOT NULL,
    "assign_to" text,
    "is_public" boolean NOT NULL,
    "is_online" boolean NOT NULL,
    "frequency" text NOT NULL,
    "replication" text NOT NULL,
    "published_at" timestamptz NOT NULL DEFAULT now(),
    "user_id" int NOT NULL REFERENCES "user" ("id"),
    "game_id" int NOT NULL REFERENCES "game" ("id"),
    "platform_id" int NOT NULL REFERENCES "platform" ("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "suggestion" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "published_at" timestamptz NOT NULL DEFAULT now(),
    "user_id" int NOT NULL REFERENCES "user" ("id"),
    "game_id" int NOT NULL REFERENCES "game" ("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "comment" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "description" text NOT NULL,
    "user_id" int NOT NULL REFERENCES "user" ("id"),
    "issue_id" int NOT NULL REFERENCES "issue" ("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "category" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "color" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "tag" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);


-- CONNECTION TABLES --
CREATE TABLE "category_has_game" (
    "category_id" int NOT NULL REFERENCES "category"("id"),
    "game_id" int NOT NULL REFERENCES "game"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

CREATE TABLE "issue_has_tag" (
    "issue_id" int NOT NULL REFERENCES "issue"("id"),
    "tag_id" int NOT NULL REFERENCES "tag"("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz
);

COMMIT;
