import shutil
from pathlib import Path
import os

# 路径设置
content_dir = Path("content")
target_dir = Path("_images")

# 清空目标目录（如果存在）
if target_dir.exists():
    shutil.rmtree(target_dir)

# 创建目标目录（如果不存在）
target_dir.mkdir(exist_ok=True)

def contains_md_file(path: Path) -> bool:
    """递归检查路径下是否含有 .md 文件"""
    return any(f.is_file() and f.suffix == ".md" for f in path.rglob("*"))

def move_non_md_contents(src_dir: Path, dst_dir: Path):
    """递归地将非 .md 文件移动到目标目录，并保留 .md 文件原地"""
    for path in src_dir.rglob("*"):
        if path.is_file() and path.suffix == ".md":
            continue  # 保留 .md 文件

        # 跳过空目录（会在最后统一清除）
        if path.is_dir():
            continue

        # 计算相对路径并构造目标路径
        relative_path = path.relative_to(src_dir)
        dest_path = dst_dir / relative_path

        # 确保目标父目录存在
        dest_path.parent.mkdir(parents=True, exist_ok=True)

        # 移动文件
        shutil.move(str(path), str(dest_path))
        print(f"已移动 {path} → {dest_path}")

    # 清除所有因移动操作而可能变空的目录
    remove_empty_dirs(src_dir)

def remove_empty_dirs(base_dir: Path):
    """递归删除空目录，从深层往浅层删"""
    for sub in sorted(base_dir.rglob("*"), reverse=True):
        if sub.is_dir() and not any(sub.iterdir()):
            sub.rmdir()
            print(f"已删除空目录 {sub}")

# 主逻辑
for chapter in content_dir.iterdir():
    if chapter.is_dir():
        if contains_md_file(chapter):
            # 包含 .md 文件 → 保留目录，只移动非 .md 内容
            target_subdir = target_dir / chapter.name
            target_subdir.mkdir(parents=True, exist_ok=True)
            move_non_md_contents(chapter, target_subdir)
        else:
            # 不含 .md 文件 → 整个目录移动
            dest = target_dir / chapter.name
            shutil.move(str(chapter), str(dest))
            print(f"已移动 {chapter} → {dest}")

print("所有图片目录移动完成。")

