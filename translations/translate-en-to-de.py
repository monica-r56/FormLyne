import json
from deep_translator import GoogleTranslator

# Path to your English JSON
input_path = "src/app/locale/en.json"
output_path = "src/app/locale/de.json"

# Load the English content
with open(input_path, "r", encoding="utf-8") as f:
    en_data = json.load(f)

# Set up translator: English → German
translator = GoogleTranslator(source='en', target='de')

# Translate each string
de_data = {}
for key, text in en_data.items():
    try:
        de_data[key] = translator.translate(text) if text.strip() else ""
    except Exception as e:
        print(f"Error translating key '{key}': {e}")
        de_data[key] = ""

# Save the translated German content
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(de_data, f, ensure_ascii=False, indent=2)

print("✅ de.json generated successfully.")
