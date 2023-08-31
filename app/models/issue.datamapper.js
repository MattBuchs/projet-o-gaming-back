import CoreDatamapper from './core.datamapper.js';

export default class IssueDatamapper extends CoreDatamapper {
    tableName = 'issue';

    async findIssueWithDetails(issueId) {
        const result = await this.client.query(
            `
        SELECT 
            "issue"."id",
            "issue"."title",
            "issue"."description",
            "issue"."status",
            "issue"."is_minor",
            "issue"."assign_to",
            "issue"."is_public",
            "issue"."is_online",
            "issue"."frequency",
            "issue"."replication",
            "issue"."published_at",
            "issue"."user_id", 
            "user"."username" AS author, 
            "platform"."name" AS platform, 
            JSON_AGG("tag"."title") AS tags
        FROM "issue"
        JOIN "user" ON "user"."id" = "issue"."user_id"
        JOIN "platform" ON "platform"."id" = "issue"."platform_id"
        LEFT JOIN "issue_has_tag" ON "issue_has_tag"."issue_id" = "issue"."id"
        LEFT JOIN "tag" ON "tag"."id" = "issue_has_tag"."tag_id"
        WHERE "issue"."id" = $1
        GROUP BY
            "issue"."id",
            "user"."username",
            "platform"."name"`,
            [issueId],
        );

        return result.rows[0];
    }
}
