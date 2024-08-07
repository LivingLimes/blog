import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export function getAllPagesIds({ directory }) {
  const fileNames = fs.readdirSync(directory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ''),
      },
    }
  })
}

export function getSortedPageData({ directory }) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(directory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(directory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    }
  })
  // Sort posts by date
  return allPostsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPagesData({ id, directory }) {
  const fullPath = path.join(directory, `${id}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
