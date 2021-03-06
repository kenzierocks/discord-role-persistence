#!/usr/bin/env node
import {Snowflake} from "discord.js";
import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync('db.json');
const db = lowdb(adapter);

db.defaults({
    roleMap: {},
    roleMappings: {},
    unmoderatedRoles: {},
    nameMap: {},
    procMap: {},
    admins: [],
    token: '',
    pingNames: []
}).write();

export function getPingNames(): string[] {
    return db.get('pingNames').value();
}

export function setPingNames(names: string[]) {
    db.set('pingNames', names).write();
}

export function addPingName(name: string) {
    const pushTarget = getPingNames().slice();
    pushTarget.push(name);
    setPingNames(pushTarget);
}

export function remPingName(name: string) {
    const remTarget = getPingNames().filter(x => x != name);
    setPingNames(remTarget);
}

export function setUserRoles(uid: Snowflake, gid: Snowflake, roles: Snowflake[]) {
    db.set(['roleMap', gid, uid], roles).write();
}

export function getUserRoles(uid: Snowflake, gid: Snowflake): Snowflake[] {
    return db.get(['roleMap', gid, uid]).value();
}

export function setUserName(uid: Snowflake, gid: Snowflake, name: string) {
    db.set(['nameMap', gid, uid], name).write();
}

export function getUserName(uid: Snowflake, gid: Snowflake): string | undefined {
    return db.get(['nameMap', gid, uid]).value();
}

export function setProcessing(uid: Snowflake, gid: Snowflake, processing: boolean) {
    db.set(['procMap', gid, uid], processing).write();
}

export function getProcessing(uid: Snowflake, gid: Snowflake): boolean {
    return !!db.get(['procMap', gid, uid]).value();
}

export function setRoleMapping(gid: Snowflake, fromId: Snowflake, toId: Snowflake) {
    db.set(['roleMappings', gid, fromId], toId).write();
}

export function getRoleMapppings(gid: Snowflake): { [k: string]: string } {
    return db.get(['roleMappings', gid]).value();
}

export function getUnmoderatedRoles(gid: Snowflake): Snowflake[] {
    return db.get(['unmoderatedRoles', gid]).value() || [];
}

export function setUnmoderatedRoles(gid: Snowflake, roles: Snowflake[]) {
    db.set(['unmoderatedRoles', gid], roles).write();
}

export function getAdmins(): Snowflake[] {
    return db.get('admins').value();
}

export function getToken(): string {
    return db.get('token').value();
}
