import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"
import "highlight.js/styles/tokyo-night-dark.min.css"

hljs.registerLanguage("json", json)

export function highlight(data: string | unknown) {
  const json_string = typeof data === "string" ? data : JSON.stringify(data, null, 2)
  return hljs.highlight(json_string, { language: "json" }).value
}
