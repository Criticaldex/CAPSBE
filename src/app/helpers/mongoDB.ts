import { log } from 'console';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { rejects } from 'assert';

export function mongoConnect(host: string, db: string) {
    return new Promise(async(resolve, reject) => {
        const conn = await mongoose.connect(`mongodb://${host}/${db}`);
        // let conn = (`mongodb://${host}/${db}`);
        resolve(conn);
        // resolve(conn);
    })
}