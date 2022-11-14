"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseType = void 0;
const types_1 = require("../types");
const logging_1 = require("../../../logging");
const interfaces_1 = require("../../../interfaces");
/**
 * This is the Type Parser function, which takes a raw Event
 * and determines which of our local event kinds it belongs to.
 */
function ParseType(name, tokenName) {
    const log = logging_1.factory.getLogger(logging_1.addPrefix(__filename, [interfaces_1.SupportedNetwork.ERC20, tokenName]));
    switch (name) {
        // ERC20 Events
        case 'Approval':
            return types_1.EventKind.Approval;
        case 'Transfer':
            return types_1.EventKind.Transfer;
        default: {
            log.info(`Unknown event name: ${name}!`);
            return null;
        }
    }
}
exports.ParseType = ParseType;
