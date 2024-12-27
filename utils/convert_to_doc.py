import argparse
import tempfile
import re
import subprocess
import os

def preprocess_md(text: str) -> str:
    # 将 #center、#floatright、#floatleft 删掉
    text = text.replace("#center", "").replace("#floatright", "").replace("#floatleft", "")
    # 将 {{<katex>}}...{{</katex>}} 替换为 $...$
    # 将 {{<katex display>}}...{{</katex>}} 替换为 $$...$$
    # 注意可以存在额外的空格
    text = re.sub(
        r'\{\{\s*<\s*katex\s*>\s*\}\}(.+?)\{\{\s*<\s*/\s*katex\s*>\s*\}\}', 
        r'$\1$', 
        text,
        flags=re.DOTALL
    )
    text = re.sub(
        r'\{\{\s*<\s*katex\s+display\s*>\s*\}\}(.+?)\{\{\s*<\s*/\s*katex\s*>\s*\}\}', 
        r'$$\1$$', 
        text,
        flags=re.DOTALL
    )
    # 将 {{<mermaid>}}...{{</mermaid>}} 替换为 ```mermaid...```
    text = re.sub(r'\[([^\]]+)\]\(\{\{<relref "[^"]+">}}\)', r'《\1》', text, flags=re.DOTALL)
    # 将「」替换成 “”
    text = text.replace("「", "“").replace("」", "”")
    # 将『』替换成 ‘’
    text = text.replace("『", "‘").replace("』", "’")

    return text


parser = argparse.ArgumentParser()
parser.add_argument("input", help="Input file", nargs="+", type=str)
parser.add_argument("-o", "--output", help="Output folder", type=str)
parser.add_argument("-t", "--template", help="Template file", type=str, default="template.docx")
args = parser.parse_args()

temp_dir = tempfile.mkdtemp()

for input_file in args.input:
    resource_path = os.path.dirname(input_file)
    with open(input_file, "r", encoding="utf-8") as f:
        text = f.read()
        text = preprocess_md(text)

        temp = open(os.path.join(temp_dir, "temp.md"), "w", encoding="utf-8")
        temp.write(text)
        temp.flush()

        output_name = os.path.basename(input_file).replace(".md", ".docx")
        output_path = os.path.join(args.output, output_name) if args.output else output_name
        subprocess.run(["pandoc", temp.name, "-o", output_path, "--reference-doc", args.template, "--resource-path", resource_path])

        temp.close()
        os.remove(temp.name)

os.rmdir(temp_dir)