import json
from deep_translator import GoogleTranslator

with open("src/app/locale/en.json", "r", encoding="utf-8") as f:
    en_data = json.load(f)

translator = GoogleTranslator(source='en', target='ja')
ja_data = {}

for key, text in en_data.items():
    try:
        ja_data[key] = translator.translate(text) if text.strip() else ""
    except Exception as e:
        ja_data[key] = ""

with open("src/app/locale/ja.json", "w", encoding="utf-8") as f:
    json.dump(ja_data, f, ensure_ascii=False, indent=2)

print("✅ ja.json generated successfully.")
