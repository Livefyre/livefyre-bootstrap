livefyre('''
deploy:
  branch: "^(master)$"
  image:
    label: corpjenkins/node
  git: true
  commands:
    - npm install
    - npm run build
  lfcdn:
    env: prod
''')
