import os
import re
from pathlib import Path

# 创建 _markup 目录
os.makedirs("layouts/_default/_markup/", exist_ok=True)

# 写入 render-image.html 文件
with open("layouts/_default/_markup/render-image.html", "w") as f:
    f.write("""
{{- $src := .Destination -}}
{{- $srcStatic := .Destination | printf "https://static.criwits.top/images/%s" -}}
{{- $alt := .Text | default "" -}}
{{- $fileName := replaceRE "([?#].*)$" "" $src | path.Base -}}
{{- $result := first 1 (where .Page.Resources "Name" $fileName) -}}
<a data-fancybox data-src="{{ $srcStatic }}">
{{- with $result -}}
    {{- $r := index . 0 -}}
    {{- if eq $r.MediaType.SubType "svg" -}}
        <img src="{{ $srcStatic }}" alt="{{ $alt }}" loading="lazy" />
    {{- else -}}
        <img src="{{ $srcStatic }}" alt="{{ $alt }}" width="{{ $r.Width }}" height="{{ $r.Height }}" loading="lazy" />
    {{- end -}}
{{- else -}}
    <img src="{{ $srcStatic }}" alt="{{ $alt }}" loading="lazy" />
{{- end -}}
</a>
            """)
    
print("render-image.html 文件已创建。")

def update_front_matter(file_path: str):
    path = Path(file_path)
    text = path.read_text(encoding="utf-8")

    # 使用正则匹配 front matter
    pattern = re.compile(r"^---\s*\ntitle:\s*首页\s*\ntype:\s*docs\s*\n---", re.MULTILINE)
    replacement = """---
title: 首页
type: docs
cascade:
  build:
    publishResources: false
---"""

    new_text = pattern.sub(replacement, text, count=1)

    # 写回文件（或另存为）
    path.write_text(new_text, encoding="utf-8")
    print(f"{file_path} 已更新。")

update_front_matter("content/_index.md")
