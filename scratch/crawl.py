import urllib.request
import re
from bs4 import BeautifulSoup
import json
import os

url = "https://www.agrya.in/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
except Exception as e:
    print(f"Error fetching {url}: {e}")
    exit(1)

with open("scratch/home.html", "w", encoding="utf-8") as f:
    f.write(html)

soup = BeautifulSoup(html, "html.parser")

# Find all links
links = set()
for a in soup.find_all("a", href=True):
    href = a['href']
    links.add(href)

print("--- FOUND LINKS ---")
for l in sorted(links):
    print(l)

# Find all images
images = set()
for img in soup.find_all("img", src=True):
    images.add(img['src'])

print("\n--- FOUND IMAGES ---")
for img in sorted(images):
    print(img)

# Find JSON-LD
print("\n--- JSON-LD ---")
for s in soup.find_all("script", type="application/ld+json"):
    print(s.string)

# Meta tags
print("\n--- META TAGS ---")
for m in soup.find_all("meta"):
    print(m.attrs)
