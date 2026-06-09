import re

with open("decoded_pushes.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Let's search for lines starting with target keys
lines = text.split('\n')
keys = ["f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]

# Let's clean the HTML function
def clean_html(val):
    val = val.replace('\\u003c', '<').replace('\\u003e', '>').replace('\\u0026', '&')
    val = val.replace('&amp;', '&').replace('&quot;', '"').replace('&#x27;', "'").replace('&#39;', "'").replace('&nbsp;', ' ')
    return val

for key in keys:
    found = False
    # Check if there is a line starting with key + ":"
    for line in lines:
        if line.startswith(key + ":"):
            print(f"=== KEY {key} ===")
            print(clean_html(line))
            print("="*60)
            found = True
            break
    if not found:
        # Check if the key is inside the line
        # e.g. \n16:something
        # or inside a list
        print(f"Key {key} not found at line start. Searching inside text...")
        pattern = rf'(?:^|\n){key}:(.*?)(?=\n[a-f0-9]+:|\Z)'
        match = re.search(pattern, text, re.DOTALL)
        if match:
            print(f"=== KEY {key} (Search) ===")
            print(clean_html(match.group(1)))
            print("="*60)
        else:
            print(f"Key {key} really not found.")
