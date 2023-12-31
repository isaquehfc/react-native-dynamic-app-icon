// @ts-ignore
import path from "path";
// @ts-ignore
import fs from "fs";

import axios from "axios";

// vProd

async function downloadIconIfNeeded(iconPath: string, iconName: string) {
  try {
    const assetsDir = path.join(process.cwd(), "./assets/icons");
    const outputPath = path.join(
      assetsDir,
      String(iconName.includes(".png") ? iconName : `${iconName}.png`)
    );

    // Verifica se o iconPath é uma URL
    if (iconPath.startsWith("http://") || iconPath.startsWith("https://")) {
      const imageResponse = await axios({
        url: iconPath,
        responseType: "arraybuffer",
      });

      // const img = await sharp(imageResponse.data).toFormat("png").toBuffer();
      const img = imageResponse.data

      await fs.promises.mkdir(assetsDir, { recursive: true });

      await fs.promises.writeFile(outputPath, img);

      // const writer = fs.createWriteStream(outputPath);
      // response.data.pipe(writer);

      return outputPath;

      // return new Promise((resolve, reject) => {
      //   writer.on("finish", resolve);
      //   writer.on("error", reject);
      // });
    } else {
      return outputPath;
    }
  } catch (err) {
    console.log(err);
  }
}

// downloadIconIfNeeded(
//   "https://app-store-apple-icons-lib.vercel.app/icons/1701284169305-banco-pan.png",
//   "banco-pan.png"
// );

export { downloadIconIfNeeded };
