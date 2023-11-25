"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadIconIfNeeded = void 0;
// @ts-ignore
const path_1 = __importDefault(require("path"));
// @ts-ignore
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
// vProd
async function downloadIconIfNeeded(iconPath, iconName) {
    const assetsDir = path_1.default.join(process.cwd(), "./assets/icons");
    const outputPath = path_1.default.join(assetsDir, String(iconName.includes(".png") ? iconName : `${iconName}.png`));
    // Verifica se o iconPath é uma URL
    if (iconPath.startsWith("http://") || iconPath.startsWith("https://")) {
        const response = await (0, axios_1.default)({ url: iconPath, responseType: "stream" });
        await fs_1.default.promises.mkdir(assetsDir, { recursive: true });
        const writer = fs_1.default.createWriteStream(outputPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
    }
    return Promise.resolve();
}
exports.downloadIconIfNeeded = downloadIconIfNeeded;
//# sourceMappingURL=downloadIconIfNeeded.js.map