import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface NotePorps {
    title: string;
    description: string | null;
    userId: string;
    createdAt: Date;
}

export class Note {
    private props: NotePorps
    private _id: string

    constructor(props: Replace<NotePorps, { createdAt?: Date, description?: string | null }>, id?: string ) {
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            description: props.description ?? null
        }
        this._id = id || randomUUID();
    }

    get id(): string {
        return this._id
    }

    get title(): string {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
    }

    get description(): string | null {
        return this.props.description
    }

    set description(description: string | null) {
        this.props.description = description
    }

    get userId(): string {
        return this.props.userId
    }

    get createdAt(): Date {
        return this.props.createdAt
    }
}