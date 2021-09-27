"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var gsap_1 = require("gsap");
var tl = gsap_1.gsap.timeline();
function nodeActive(node) {
    return new Promise(function (resolve, reject) {
        tl.to(node, {
            scale: 1.2,
            duration: 0.2,
            ease: 'Power1.easeInOut'
        });
        tl.to(node, {
            scale: 1,
            duration: 0.2,
            ease: 'Power1.easeInOut',
            onComplete: resolve
        });
    });
}
function greedyGraphColoring(adjMatrix, nodeRefs) {
    return __awaiter(this, void 0, void 0, function () {
        var coloringSequence, i, colorsUsed, _loop_1, j, chromaticNumber, noDuplicateColors, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    coloringSequence = [1];
                    // trigger animation for first vertex
                    return [4 /*yield*/, nodeActive(nodeRefs[0])];
                case 1:
                    // trigger animation for first vertex
                    _a.sent();
                    i = 1;
                    _a.label = 2;
                case 2:
                    if (!(i < adjMatrix.length)) return [3 /*break*/, 5];
                    // Trigger animation
                    return [4 /*yield*/, nodeActive(nodeRefs[i])];
                case 3:
                    // Trigger animation
                    _a.sent();
                    colorsUsed = coloringSequence.slice();
                    _loop_1 = function (j) {
                        if (adjMatrix[i][j] > 0) {
                            var colorToRemove_1 = coloringSequence[j];
                            colorsUsed = colorsUsed.filter(function (color) {
                                return color != colorToRemove_1;
                            });
                        }
                    };
                    for (j = 0; j < i; j++) {
                        _loop_1(j);
                    }
                    if (colorsUsed.length) {
                        coloringSequence.push(colorsUsed[0]);
                    }
                    else {
                        coloringSequence.push(Math.max.apply(Math, coloringSequence) + 1);
                    }
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    chromaticNumber = 1;
                    noDuplicateColors = [coloringSequence[0]];
                    for (i = 1; i < coloringSequence.length; i++) {
                        if (noDuplicateColors.includes(coloringSequence[i])) {
                            continue;
                        }
                        else {
                            noDuplicateColors.push(coloringSequence[i]);
                        }
                    }
                    return [2 /*return*/, {
                            coloringSequence: coloringSequence,
                            chromaticNumber: noDuplicateColors.length
                        }];
            }
        });
    });
}
exports["default"] = greedyGraphColoring;
