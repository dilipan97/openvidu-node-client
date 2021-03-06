import { Publisher } from './Publisher';
import { ConnectionProperties } from './ConnectionProperties';
import { OpenViduRole } from './OpenViduRole';
/**
 * See [[Session.connections]]
 */
export declare class Connection {
    /**
     * Identifier of the Connection. You can call methods [[Session.forceDisconnect]]
     * or [[Session.updateConnection]] passing this property as parameter
     */
    connectionId: string;
    /**
     * Returns the status of the Connection. Can be:
     * - `pending`: if the Connection is waiting for any user to use
     * its internal token to connect to the session, calling method
     * [Session.connect](https://docs.openvidu.io/en/stable/api/openvidu-browser/classes/session.html#connect)
     * in OpenVidu Browser.
     * - `active`: if the internal token of the Connection has already
     * been used by some user to connect to the session, and it cannot be used
     * again.
     */
    status: string;
    /**
     * Timestamp when the Connection was created, in UTC milliseconds (ms since Jan 1, 1970, 00:00:00 UTC)
     */
    createdAt: number;
    /**
     * Timestamp when the Connection was taken by a user (passing from status "pending" to "active")
     * in UTC milliseconds (ms since Jan 1, 1970, 00:00:00 UTC)
     */
    activeAt: number;
    /**
     * <a href="https://docs.openvidu.io/en/stable/openvidu-pro/" target="_blank" style="display: inline-block; background-color: rgb(0, 136, 170); color: white; font-weight: bold; padding: 0px 5px; margin-right: 5px; border-radius: 3px; font-size: 13px; line-height:21px; font-family: Montserrat, sans-serif">PRO</a>
     * Geo location of the Connection, with the following format: `"CITY, COUNTRY"` (`"unknown"` if it wasn't possible to locate it)
     */
    location: string;
    /**
     * A complete description of the platform used by the participant to connect to the session
     */
    platform: string;
    /**
     * Data associated to the Connection on the client-side. This value is set with second parameter of method
     * [Session.connect](/en/stable/api/openvidu-browser/classes/session.html#connect) in OpenVidu Browser
     */
    clientData: string;
    /**
     * The [[ConnectionProperties]] assigned to the Connection
     */
    connectionProperties: ConnectionProperties;
    /**
     * Token associated to the Connection. This is the value that must be sent to the client-side to be consumed in OpenVidu Browser
     * method [Session.connect](https://docs.openvidu.io/en/stable/api/openvidu-browser/classes/session.html#connect).
     */
    token: string;
    /**
     * Array of Publisher objects this particular Connection is publishing to the Session (each Publisher object has one Stream, uniquely
     * identified by its `streamId`). You can call [[Session.forceUnpublish]] passing any of this values as parameter
     */
    publishers: Publisher[];
    /**
     * Array of streams (their `streamId` properties) this particular Connection is subscribed to. Each one always corresponds to one
     * Publisher of some other Connection: each string of this array must be equal to one [[Publisher.streamId]] of other Connection
     */
    subscribers: string[];
    /**
     * @hidden deprecated. Inside ConnectionProperties
     */
    role?: OpenViduRole;
    /**
     * @hidden deprecated. Inside ConnectionProperties
     */
    serverData?: string;
    /**
     * @hidden
     */
    constructor(json: any);
    /**
     * @hidden
     */
    resetWithJson(json: any): Connection;
    /**
     * @hidden
     */
    equalTo(other: Connection): boolean;
    /**
     * @hidden
     */
    overrideConnectionProperties(newConnectionProperties: ConnectionProperties): void;
}
