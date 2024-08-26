import requests
import json


api_key = "sk-or-v1-TESTYOURAPI"

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
