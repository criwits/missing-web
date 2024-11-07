import argparse
import os
import matplotlib.pyplot as plt

parser = argparse.ArgumentParser()
parser.add_argument("path", help="Path to the Markdown file")
args = parser.parse_args()

md_file = os.path.abspath(args.path)
assets_folder = md_file.replace(".md", "")

print(f"Markdown file: {md_file}")
print(f"Assets folder: {assets_folder}")

if not os.path.exists(assets_folder):
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
        image_path_abs = os.path.join(assets_folder, image_name)

        # replace url %-strings with actual characters
        image_path_abs = image_path_abs.replace("%20", " ")
        image_path_abs = os.path.abspath(image_path_abs)

        if "Untitled" in image_path:
            print(f"Untitled image found: {image_path}")
            plt.imshow(plt.imread(image_path_abs))
            plt.show()
            new_name = input("Enter new name: ")
            new_name_no_ext = new_name.split(".")[0]
            new_image_path = os.path.join(assets_folder, new_name)
            new_image_path = os.path.abspath(new_image_path)
            
            new_line = line[:start_index] + f"![{new_name_no_ext}]({new_name})"
            print(new_line)
            new_content.append(new_line)
            os.rename(image_path_abs, new_image_path)
        else:
            new_content.append(line)
    else:
        new_content.append(line)

new_content = "\n".join(new_content)

with open(md_file, "w", encoding="utf-8") as file:
    file.write(new_content)

print("Done")