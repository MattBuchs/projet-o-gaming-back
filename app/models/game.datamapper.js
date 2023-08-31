import CoreDatamapper from './core.datamapper.js';

export default class GameDatamapper extends CoreDatamapper {
    tableName = 'game';

    async getGamesWithDetails() {
        const result = await this.client.query(
            `
        SELECT
            "game".*,
            "user"."username" AS "author",
            CASE
                WHEN COUNT(DISTINCT "category"."name") = 0 THEN ARRAY[]::TEXT[]
                ELSE ARRAY_AGG(DISTINCT "category"."name")
            END AS categories,
            COUNT(DISTINCT "issue"."id") AS issue_count,
            COUNT(DISTINCT "suggestion"."id") AS suggestion_count
        FROM "game"
        JOIN "user" ON "user"."id" = "game"."user_id"
        LEFT JOIN "issue" ON "issue"."game_id" = "game"."id"
        LEFT JOIN "suggestion" ON "suggestion"."game_id" = "game"."id"
        LEFT JOIN "category_has_game" ON "category_has_game"."game_id" = "game"."id"
        LEFT JOIN "category" ON "category"."id" = "category_has_game"."category_id"
        GROUP BY
            "game"."id",
            "game"."name",
            "game"."description",
            "game"."picture",
            "game"."external_link",
            "game"."release_date",
            "game"."user_id",
            "user"."username"
        `,
        );

        return result.rows;
    }

    async findOneGameWithDetails(id) {
        const result = await this.client.query(`
            SELECT
            "game".*,
            "user"."username" AS "author",
            CASE
                WHEN COUNT(DISTINCT "category"."name") = 0 THEN ARRAY[]::TEXT[]
                ELSE ARRAY_AGG(DISTINCT "category"."name")
            END AS categories
        FROM "game"
        JOIN "user" ON "user"."id" = "game"."user_id"
        LEFT JOIN "category_has_game" ON "category_has_game"."game_id" = "game"."id"
        LEFT JOIN "category" ON "category"."id" = "category_has_game"."category_id"
        WHERE "game"."id" = $1
        GROUP BY
            "game"."id",
            "user"."username"
        `, [id]);

        return result.rows;
    }
}
