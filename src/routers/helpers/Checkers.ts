/**
 * Checkers for more secure properties
 */

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Checkers {
    const isString = (value: unknown): value is string => typeof value === "string";

    export const Bot = {
        shortDescription: (description: unknown): boolean => {
            return isString(description) && description.length > 59 && description.length < 81;
        },
        longDescription: (description: unknown): boolean => {
            return isString(description) && description.length > 199 && description.length < 501;
        },
        supportServer: (url: unknown): boolean => {
            return isString(url) && /^(https:\/\/)discord\.gg\/[a-z0-9]$/i.test(url);
        },
        sourceCode: (url: unknown): boolean => {
            return isString(url) && /^https:\/\/.+$/.test(url);
        },
        websiteURL: (url: unknown): boolean => {
            return isString(url) && /^https:\/\/.+$/.test(url);
        },
        inviteURL: (url: unknown): boolean => {
            return isString(url) && /^https:\/\/discord\.com\/oauth2\/authorize\?client_id=\d{16,21}&scope=bot&permissions=\d+$/i.test(url);
        },
        prefix: (prefixes: unknown): boolean => {
            return Array.isArray(prefixes) && prefixes.every((prefix: unknown): boolean => typeof prefix === "string" && prefix.length > 0 && prefix.length < 7);
        },
        owners: (owners: unknown): boolean => {
            return Array.isArray(owners) && owners.every((owner: unknown): boolean => typeof owner === "string" && /^\d{16,21}$/.test(owner));
        },
        tags: (tags: unknown): boolean => {
            return Array.isArray(tags) && tags.every((tag: string): boolean => typeof tag === "string" && tag.length > 0);
        },
        _id: (id: unknown): boolean => {
            return isString(id) && /^\d{16,21}$/.test(id);
        },
        validate: (value: object): boolean => {
            return Object.keys(value).length < 1 ? false : Object.keys(value).every((key: string): boolean => key in Bot && Bot[key as keyof typeof Bot](value[key as keyof typeof value]));
        },
        name: (name: unknown): boolean => {
            return isString(name) && name.length > 0;
        },
        verifiedBot: (verified: unknown): boolean => {
            return typeof verified === "boolean";
        },
        createdAt: (value: unknown): boolean => {
            return isString(value) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/.test(value);
        },
        votes: (value: unknown): boolean => {
            return Array.isArray(value) && value.every((vote: unknown): boolean => typeof vote === "object" && vote !== null && "votes" in vote && "user" in vote && "lastVote" in vote);
        }
    };
    export const Guild = {
        _id: Bot._id,
        verificationChannel: Bot._id,
        logsChannel: Bot._id,
        addBotChannel: Bot._id,
        owners: Bot.owners,
        validate: (value: object): boolean => {
            return Object.keys(value).length < 1 ? false : Object.keys(value).every((key: string): boolean => key in Guild && Guild[key as keyof typeof Guild](value[key as keyof typeof value]));
        }
    };
    export const Feedback = {
        author: Bot._id,
        stars: (value: unknown): boolean => {
            return typeof value === "number" && value > 0 && value < 5;
        },
        postedAt: Bot.createdAt,
        content: (value: unknown): boolean => {
            return isString(value) && value.length < 501;
        },
        targetBot: Bot._id,
        validate: (value: object): boolean => {
            return Object.keys(value).length < 1 ? false : Object.keys(value).every((key: string): boolean => key in Feedback && Feedback[key as keyof typeof Feedback](key as keyof typeof value));
        }
    };
}