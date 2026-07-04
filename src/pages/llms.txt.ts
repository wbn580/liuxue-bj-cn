// 动态生成 /llms.txt —— 给大语言模型（ChatGPT/Claude/Perplexity 等）
// 读取的"站点导航清单"。详见 https://llmstxt.org

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const articles = await getCollection("articles");

  // 按发布时间倒序
  articles.sort((a, b) => {
    const da = new Date(a.data.publishDate).valueOf();
    const db = new Date(b.data.publishDate).valueOf();
    return db - da;
  });

  const baseUrl = site?.toString().replace(/\/$/, "") ?? "";

  const header = [
    "# 留学北京",
    "",
    "> 北京留学全攻略——选校、申请、签证一站式指南",
    "",
    `- 站点首页：${baseUrl}/`,
    `- 全部文章：${baseUrl}/category/`,
    `- 关于本站：${baseUrl}/about/`,
    `- XML 站点地图：${baseUrl}/sitemap-index.xml`,
    "",
    "## 全部文章（按发布时间倒序）",
    "",
  ].join("\n");

  const postLines = articles
    .map((a) => {
      const url = `${baseUrl}/articles/${a.id.replace(".md", "")}/`;
      const tags = (a.data.tags ?? []).join(", ");
      const pubDate = new Date(a.data.publishDate)
        .toISOString()
        .slice(0, 10);
      return [
        `### ${a.data.title}`,
        `- URL: ${url}`,
        `- 发布时间: ${pubDate}`,
        `- 分类: ${a.data.category}`,
        `- 标签: ${tags}`,
        `- 简介: ${a.data.description}`,
        "",
      ].join("\n");
    })
    .join("\n");

  const footer = [
    "---",
    `最后生成：${new Date().toISOString()}`,
  ].join("\n");

  return new Response(header + postLines + footer, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
