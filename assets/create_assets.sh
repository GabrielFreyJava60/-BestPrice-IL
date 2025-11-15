#!/bin/bash
echo "Создание placeholder изображений для Expo..."

# Создаем простые PNG файлы через Python
python3 << 'PYTHON'
from PIL import Image, ImageDraw
import os

# Icon 1024x1024
icon = Image.new('RGB', (1024, 1024), color='#0066CC')
draw = Image.Draw(icon)
draw.ellipse([200, 200, 824, 824], fill='#FFFFFF')
draw.text((400, 450), 'BP', fill='#0066CC', anchor='mm')
icon.save('icon.png')

# Splash 2048x2048
splash = Image.new('RGB', (2048, 2048), color='#FFFFFF')
draw = Image.Draw(splash)
draw.rectangle([0, 0, 2048, 2048], fill='#0066CC')
draw.text((1024, 1024), 'BestPrice IL', fill='#FFFFFF', anchor='mm')
splash.save('splash.png')

# Adaptive icon foreground
adaptive = Image.new('RGB', (1024, 1024), color='#0066CC')
draw = Image.Draw(adaptive)
draw.ellipse([200, 200, 824, 824], fill='#FFFFFF')
draw.text((400, 450), 'BP', fill='#0066CC', anchor='mm')
adaptive.save('adaptive-icon.png')

print("✅ Изображения созданы!")
PYTHON

chmod +x create_assets.sh
