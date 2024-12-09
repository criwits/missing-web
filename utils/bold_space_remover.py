import argparse
import re

def process_md_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        content = file.read()

    # 使用正则表达式移除加粗文本两端的空格
    processed_content = re.sub(r'\s*(\*\*.*?\*\*)\s*', lambda m: m.group(1), content)

    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(processed_content)

def main():
    parser = argparse.ArgumentParser(description="Remove extra spaces around bold text in a Markdown file.")
    parser.add_argument('input', help="Input Markdown file")
    args = parser.parse_args()

    process_md_file(args.input, args.input)

if __name__ == '__main__':
    main()