import json
from deep_translator import GoogleTranslator

with open("src/app/locale/en.json", "r", encoding="utf-8") as f:
    en_data = json.load(f)

translator = GoogleTranslator(source='en', target='fr')
fr_data = {}

for key, text in en_data.items():
    try:
        fr_data[key] = translator.translate(text) if text.strip() else ""
    except Exception as e:
        fr_data[key] = ""

with open("src/app/locale/fr.json", "w", encoding="utf-8") as f:
    json.dump(fr_data, f, ensure_ascii=False, indent=2)

print("✅ fr.json generated successfully.")
