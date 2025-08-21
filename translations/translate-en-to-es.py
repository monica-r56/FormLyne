import json
from deep_translator import GoogleTranslator

with open("src/app/locale/en.json", "r", encoding="utf-8") as f:
    en_data = json.load(f)

translator = GoogleTranslator(source='en', target='es')
es_data = {}

for key, text in en_data.items():
    try:
        es_data[key] = translator.translate(text) if text.strip() else ""
    except Exception as e:
        es_data[key] = ""

with open("src/app/locale/es.json", "w", encoding="utf-8") as f:
    json.dump(es_data, f, ensure_ascii=False, indent=2)

print("✅ es.json generated successfully.")
