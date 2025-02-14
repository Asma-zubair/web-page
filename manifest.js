"permissions": ["contextMenus", "storage", "scripting", "activeTab"],
"background": {
  "service_worker": "background.js"
},
"content_scripts": [{
  "matches": ["<all_urls>"],
  "js": ["content.js"]
}]
