// @ts-ignore
import path from "path";
// @ts-ignore
import fs from "fs";

import axios from "axios";

async function downloadIconIfNeeded(iconPath: string, iconName: string) {
  const assetsDir = path.join(process.cwd(), "./assets/icons");
  const outputPath = path.join(assetsDir, iconName);

  // Verifica se o iconPath é uma URL
  if (iconPath.startsWith("http://") || iconPath.startsWith("https://")) {
    const response = await axios({ url: iconPath, responseType: "stream" });
    await fs.promises.mkdir(assetsDir, { recursive: true });
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }

  return Promise.resolve();
}

export { downloadIconIfNeeded };
