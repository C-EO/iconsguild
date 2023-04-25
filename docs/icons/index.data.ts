import fs from 'fs'
import path from 'path'
import { getAllData } from '../.vitepress/lib/icons'

export function getAllCategoryFiles() {
  const fileNames = fs.readdirSync(path.join('../categories')).filter((file) => path.extname(file) === '.json');

  return fileNames
    .map((fileName) => path.basename(fileName, '.json'))
    .map((fileName) => [fileName, fs.readFileSync(path.join('../categories', fileName + '.json'), 'utf8')])
    .map(([name, file]) => ({
      name,
      ...JSON.parse(file)
    }));
}

export default {
  async load() {
    const icons = await getAllData()

    return {
      categories: getAllCategoryFiles(),
      icons,
    }
  }
}
