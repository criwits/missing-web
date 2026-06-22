#!/usr/bin/env python3
"""
Add white background to transparent PNG images in the content directory.

This script scans all PNG files under `content/`, detects if they have
transparent pixels (alpha channel < 255), and composites them onto a
solid white background. The original file is replaced.

Usage:
    python utils/add_white_bg.py
"""

import os
import sys
from pathlib import Path
from PIL import Image


def has_transparency(img: Image.Image) -> bool:
    """Check if the image has any transparent or semi-transparent pixels."""
    if img.mode not in ('RGBA', 'LA', 'PA'):
        return False
    alpha = img.getchannel('A')
    # Check if any pixel has alpha < 255
    return alpha.getextrema()[0] < 255


def add_white_background(img: Image.Image) -> Image.Image:
    """Composite the image onto a solid white background."""
    if img.mode == 'RGBA':
        background = Image.new('RGBA', img.size, (255, 255, 255, 255))
        return Image.alpha_composite(background, img).convert('RGB')
    elif img.mode == 'LA':
        background = Image.new('L', img.size, 255)
        return Image.alpha_composite(background, img)
    elif img.mode == 'PA':
        background = Image.new('PA', img.size, (255, 255))
        return Image.alpha_composite(background, img).convert('RGB')
    return img


def main():
    content_dir = Path(__file__).resolve().parent.parent / 'content'
    if not content_dir.is_dir():
        print(f"Error: content directory not found at {content_dir}")
        sys.exit(1)

    png_files = list(content_dir.rglob('*.png'))
    total = len(png_files)
    processed = 0

    print(f"Scanning {total} PNG files in {content_dir}...")

    for png_path in png_files:
        try:
            img = Image.open(png_path)
            if has_transparency(img):
                print(f"  Processing: {png_path.relative_to(content_dir.parent)}")
                result = add_white_background(img)
                result.save(png_path, 'PNG')
                processed += 1
        except Exception as e:
            print(f"  Error processing {png_path}: {e}")

    print(f"\nDone: {processed} of {total} images had transparency and were processed.")


if __name__ == '__main__':
    main()
