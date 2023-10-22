import CoreDatamapper from './core.datamapper.js';

export default class SuggestionDatamapper extends CoreDatamapper {
    tableName = 'suggestion';

    async findSuggestionWithDetails(suggestionId) {
        const result = await this.client.query(
            `
        SELECT 
            "suggestion"."id",
            "suggestion"."title",
            "suggestion"."description",
            "suggestion"."published_at",
            "suggestion"."user_id", 
            "user"."username" AS author,
            "game"."name" AS game 
        FROM "suggestion"
        JOIN "user" ON "user"."id" = "suggestion"."user_id"
        JOIN "game" ON "game"."id" = "suggestion"."game_id"
        WHERE "suggestion"."id" = $1`,
            [suggestionId],
        );

        return result.rows[0];
    }

    async findSuggestionsWithGame(gameId) {
        const result = await this.client.query(`
            SELECT
                "suggestion"."id",
                "suggestion"."title",
                "user"."username" AS "author"
            FROM "suggestion"
            JOIN "user" ON "user"."id" = "suggestion"."user_id"
            WHERE "suggestion"."game_id" = $1
            GROUP BY
                "suggestion"."id",
                "user"."username";
        `, [gameId]);

        return result.rows;
    }
}
