import { Factory } from '../../src/core/common-interfaces';
import { sample } from './sampling';


export abstract class Dummy<T> implements Factory<T> {
    abstract create(...extras: any[]): T;
}


export function createDummies<T>(
    dummy: Dummy<T>,
    count: number,
    extras: any[] = [],
): T[] {

    const list: T[] = [];

    for (let i = 0; i < count; i++) {
        list.push(dummy.create(...extras));
    }

    return list;
}


export class StringIdDummy extends Dummy<string> {
    private id = 0;

    constructor(private readonly namespace = 'id') {
        super();
    }

    create(): string {
        return `${this.namespace}-${this.id++}`;
    }
}


export class TextDummy extends Dummy<string> {
    private count = 0;

    constructor(private readonly baseText = 'Text') {
        super();
    }

    create(): string {
        return `${this.baseText}-${this.count++}`;
    }
}


export class TypesDummy<T> extends Dummy<T> {
    constructor(readonly types: T[]) {
        super();
    }

    create(): T {
        return sample(this.types);
    }
}


export class DatetimeDummy extends Dummy<number> {
    constructor(private date?: Date) {
        super();
    }

    create(): number {
        if (this.date) {
            return this.date.getTime();
        }

        return new Date().getTime();
    }
}