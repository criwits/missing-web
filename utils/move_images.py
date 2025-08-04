import shutil
from pathlib import Path
import os

# 路径设置
content_dir = Path("content")
target_dir = Path("_images")

# 创建目标目录（如果不存在）
target_dir.mkdir(exist_ok=True)

# 遍历 content 目录
for item in content_dir.iterdir():
    # 只处理子目录（跳过 markdown 文件等）
    if item.is_dir():
        dest = target_dir / item.name
        print(f"移动图片目录: {item} → {dest}")
        shutil.move(str(item), str(dest))

print("所有图片目录移动完成。")

# 创建 _markup 目录
os.makedirs("layouts/_default/_markup/", exist_ok=True)

# 写入 render-image.html 文件
with open("layouts/_default/_markup/render-image.html", "w") as f:
    f.write("""
{{- $src := .Destination | printf "https://my.image.site/%s" -}}
<img src="{{ $src }}" alt="{{ .Text | html }}" loading="lazy" />
            """)
    
print("render-image.html 文件已创建。")

