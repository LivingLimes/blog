import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const rootPagesDirectory = path.join(process.cwd(), 'content', 'rootPages');

export function getAllRootPagesIds() {
  const fileNames = fs.readdirSync(rootPagesDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getRootPagesData(id) {
    const fullPath = path.join(rootPagesDirectory, `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    console.log({fileContents})
    const matterResult = matter(fileContents);
  
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  }
  