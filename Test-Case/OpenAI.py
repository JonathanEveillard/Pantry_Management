import requests
import json

# Replace with your actual API key
api_key = "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"

#InputTest
user_input = input("Enter your message: ")

response = requests.post(
  url="https://openrouter.ai/api/v1/chat/completions",
  headers={
    "Authorization": f"Bearer {api_key}",
    "HTTP-Referer": "https://your-site-url.com", # Replace with your actual site URL
    "X-Title": "Your App Name", # Replace with your actual app name
  },
  data=json.dumps({
    "model": "openai/gpt-4o-mini-2024-07-18", # Optional
    "messages": [
      { "role": "user", "content": user_input }
    ]
  })
)

print(response.json())