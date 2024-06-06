import fs from "fs";
import path from "path";

function readFilesInFolderSync(folderPath) {
  // Get all files in the folder
  const files = fs.readdirSync(folderPath);

  // Array to store file contents
  let fileContents = {};

  // Read each file synchronously
  files.forEach((file) => {
    const split = file.split(".")[0];
    fileContents[split] = split;
  });

  console.log(fileContents);

  // Join file contents into a single string and return
}

readFilesInFolderSync("src/assets/deck");
