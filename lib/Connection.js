"use strict";
/*
 * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Publisher_1 = require("./Publisher");
/**
 * See [[Session.connections]]
 */
var Connection = /** @class */ (function () {
    /**
     * @hidden
     */
    function Connection(json) {
        /**
         * Array of Publisher objects this particular Connection is publishing to the Session (each Publisher object has one Stream, uniquely
         * identified by its `streamId`). You can call [[Session.forceUnpublish]] passing any of this values as parameter
         */
        this.publishers = [];
        /**
         * Array of streams (their `streamId` properties) this particular Connection is subscribed to. Each one always corresponds to one
         * Publisher of some other Connection: each string of this array must be equal to one [[Publisher.streamId]] of other Connection
         */
        this.subscribers = [];
        this.resetWithJson(json);
    }
    /**
     * @hidden
     */
    Connection.prototype.resetWithJson = function (json) {
        var _this = this;
        this.connectionId = json.connectionId;
        this.status = json.status;
        this.createdAt = json.createdAt;
        this.activeAt = json.activeAt;
        this.location = json.location;
        this.platform = json.platform;
        this.clientData = json.clientData;
        this.token = json.token;
        if (this.connectionProperties != null) {
            this.connectionProperties.type = json.type;
            this.connectionProperties.data = json.serverData;
            this.connectionProperties.record = json.record;
            this.connectionProperties.role = json.role;
            this.connectionProperties.kurentoOptions = json.kurentoOptions;
            this.connectionProperties.rtspUri = json.rtspUri;
            this.connectionProperties.adaptativeBitrate = json.adaptativeBitrate;
            this.connectionProperties.onlyPlayWithSubscribers = json.onlyPlayWithSubscribers;
            this.connectionProperties.networkCache = json.networkCache;
        }
        else {
            this.connectionProperties = {
                type: json.type,
                data: json.serverData,
                record: json.record,
                role: json.role,
                kurentoOptions: json.kurentoOptions,
                rtspUri: json.rtspUri,
                adaptativeBitrate: json.adaptativeBitrate,
                onlyPlayWithSubscribers: json.onlyPlayWithSubscribers,
                networkCache: json.networkCache
            };
        }
        this.role = json.role;
        this.serverData = json.serverData;
        // publishers may be null
        if (json.publishers != null) {
            // 1. Array to store fetched Publishers and later remove closed ones
            var fetchedPublisherIds_1 = [];
            json.publishers.forEach(function (jsonPublisher) {
                var publisherObj = new Publisher_1.Publisher(jsonPublisher);
                fetchedPublisherIds_1.push(publisherObj.streamId);
                var storedPublisher = _this.publishers.find(function (c) { return c.streamId === publisherObj.streamId; });
                if (!!storedPublisher) {
                    // 2. Update existing Publisher
                    storedPublisher.resetWithJson(jsonPublisher);
                }
                else {
                    // 3. Add new Publisher
                    _this.publishers.push(publisherObj);
                }
            });
            // 4. Remove closed Publishers from local collection
            for (var i = this.publishers.length - 1; i >= 0; --i) {
                if (!fetchedPublisherIds_1.includes(this.publishers[i].streamId)) {
                    this.publishers.splice(i, 1);
                }
            }
        }
        // subscribers may be null
        if (json.subscribers != null) {
            // 1. Array to store fetched Subscribers and later remove closed ones
            var fetchedSubscriberIds_1 = [];
            json.subscribers.forEach(function (jsonSubscriber) {
                fetchedSubscriberIds_1.push(jsonSubscriber.streamId);
                if (_this.subscribers.indexOf(jsonSubscriber.streamId) === -1) {
                    // 2. Add new Subscriber
                    _this.subscribers.push(jsonSubscriber.streamId);
                }
            });
            // 3. Remove closed Subscribers from local collection
            for (var i = this.subscribers.length - 1; i >= 0; --i) {
                if (!fetchedSubscriberIds_1.includes(this.subscribers[i])) {
                    this.subscribers.splice(i, 1);
                }
            }
        }
        return this;
    };
    /**
     * @hidden
     */
    Connection.prototype.equalTo = function (other) {
        var equals = (this.connectionId === other.connectionId &&
            this.status === other.status &&
            this.createdAt === other.createdAt &&
            this.activeAt === other.activeAt &&
            this.connectionProperties.type === other.connectionProperties.type &&
            this.connectionProperties.data === other.connectionProperties.data &&
            this.connectionProperties.record === other.connectionProperties.record &&
            this.connectionProperties.role === other.connectionProperties.role &&
            this.connectionProperties.rtspUri === other.connectionProperties.rtspUri &&
            this.connectionProperties.adaptativeBitrate === other.connectionProperties.adaptativeBitrate &&
            this.connectionProperties.onlyPlayWithSubscribers === other.connectionProperties.onlyPlayWithSubscribers &&
            this.connectionProperties.networkCache === other.connectionProperties.networkCache &&
            this.token === other.token &&
            this.location === other.location &&
            this.platform === other.platform &&
            this.clientData === other.clientData &&
            this.subscribers.length === other.subscribers.length &&
            this.publishers.length === other.publishers.length);
        if (equals) {
            if (this.connectionProperties.kurentoOptions != null) {
                equals = JSON.stringify(this.connectionProperties.kurentoOptions) === JSON.stringify(other.connectionProperties.kurentoOptions);
            }
            else {
                equals = (this.connectionProperties.kurentoOptions === other.connectionProperties.kurentoOptions);
            }
        }
        if (equals) {
            equals = JSON.stringify(this.subscribers.sort()) === JSON.stringify(other.subscribers.sort());
            if (equals) {
                var i = 0;
                while (equals && i < this.publishers.length) {
                    equals = this.publishers[i].equalTo(other.publishers[i]);
                    i++;
                }
                return equals;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**
     * @hidden
     */
    Connection.prototype.overrideConnectionProperties = function (newConnectionProperties) {
        // For now only properties record and role
        if (newConnectionProperties.record != null) {
            this.connectionProperties.record = newConnectionProperties.record;
        }
        if (newConnectionProperties.role != null) {
            this.connectionProperties.role = newConnectionProperties.role;
        }
    };
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map