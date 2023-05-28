/** Represents a discord ID */

type Snowflake = string;

/** API Bot structure */

export interface BotStructure {
    _id: Snowflake;
    name: string;
    avatar: string;
    inviteURL: string;
    websiteURL: string;
    supportServer: string;
    sourceCode: string;
    shortDescription: string;
    longDescription: string;
    prefix: string[] | string;
    owners: Snowflake[] | string;
    createdAt: string;
    verifiedBot: boolean;
    tags: string[];
    approved: boolean;
};

/** Structure for search bots */

export interface SearchBotOptions {
    query: SearchBotQueryOptions;
};

/** Query options for search */

interface SearchBotQueryOptions extends Partial<BotStructure> {
    limit?: number;
};

/** Represents an express promised response  */

export type ExpressPromise = Promise<Response<any, Record<string, any>>>;

declare module 'express-session' {
    interface SessionData {
        user_info: any
    }
}