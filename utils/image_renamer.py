import argparse
import os
import matplotlib.pyplot as plt
from urllib.parse import unquote

parser = argparse.ArgumentParser()
parser.add_argument("path", help="Path to the Markdown file")
args = parser.parse_args()

md_file = os.path.abspath(args.path)
assets_folder_name = os.path.basename(md_file).replace(".md", "")
assets_folder_abs = md_file.replace(".md", "")

print(f"Markdown file: {md_file}")
print(f"Assets folder: {assets_folder_abs}")

if not os.path.exists(assets_folder_abs):
    print("No assets folder found")
    exit(1)

with open (md_file, "r", encoding="utf-8") as file:
    content = file.read()

content = content.split("\n")
new_content = []

for line in content:
    # find ![image](path), note there might be leading spaces
    if line.lstrip().startswith("!["):
        start_index = line.index("![")
        image_path = line.split("(")[1].split(")")[0]
        image_name = os.path.basename(image_path)
        image_path_abs = os.path.join(assets_folder_abs, unquote(image_name))
        image_path_abs = os.path.abspath(image_path_abs)

        if "Untitled" in image_path or "屏幕截图" in image_path_abs:
            print(f"Untitled image found: {image_path}")
            plt.imshow(plt.imread(image_path_abs))
            plt.show()
            new_name = input("Enter new name: ")
            new_name_no_ext = new_name.split(".")[0]
            new_image_path = os.path.join(assets_folder_abs, new_name)
            new_image_path = os.path.abspath(new_image_path)

            place = input("Where? (l/c/r): ")
            if place == "l":
                place = "floatleft"
            elif place == "r":
                place = "floatright"
            else:
                place = "center"
            
            new_line = line[:start_index] + f"![{new_name_no_ext}]({assets_folder_name}/{new_name}#{place})"
            print(new_line)
            new_content.append(new_line)
            os.rename(image_path_abs, new_image_path)
        elif "#" not in line:
            print(f"Unplaced image found: {image_path}")
            place = input("Where? (l/c/r): ")
            if place == "l":
                place = "floatleft"
            elif place == "r":
                place = "floatright"
            else:
                place = "center"
            new_line = line[:start_index] + f"{line[start_index:-1]}#{place})"
            print(new_line)
            new_content.append(new_line)
        else:
            new_content.append(line)
    else:
        new_content.append(line)

new_content = "\n".join(new_content)

with open(md_file, "w", encoding="utf-8") as file:
    file.write(new_content)

print("Done")