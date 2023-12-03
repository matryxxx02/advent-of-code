import fs from "fs"

export function readInputFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error("Erreur lors de la lecture du fichier:", err);
        return null;
    }
}