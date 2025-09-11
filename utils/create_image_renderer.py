import os

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
            """)
    
print("render-image.html 文件已创建。")

