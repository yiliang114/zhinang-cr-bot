# @yiliang114/zhinang-cr-bot

## What's ZhiNang?

> https://zhinang.ai/

智囊 AI. by[@aoao-eth](https://github.com/Yootou-dev)

## Demo

[Github Action](https://github.com/yiliang114/zhinang-cr-bot/actions)

## Use

### Get ZhiNang Token

### With Bash

```bash
yarn add global @yiliang114/zhinang-cr-bot
NODE_ENV=production zhinang cr 290 --zhinang-token xxxx --owner yiliang114 --repo task-functions
```

### With Github Action

```yml
name: auto-cr action

on:
  pull_request:
    branches:
      - main

permissions:
  contents: 'write'
  id-token: 'write'
  pull-requests: write
  issues: 'write'

jobs:
  AutoCR:
    if: github.event_name != 'pull_request' || !github.event.pull_request.draft
    runs-on: ubuntu-latest
    steps:
      - name: use Node.js 19
        uses: actions/setup-node@v3
        with:
          node-version: 19

      - name: Install dependencies
        run: yarn global add @yiliang114/zhinang-cr-bot
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_GITHUB_TOKEN }}
      - name: Auto CR
        env:
          PR_NUMBER: ${{ github.event.number }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ZHINANG_TOKEN: ${{ secrets.ZHINANG_TOKEN }}
          OWNER: ${{ github.repository_owner }}
          REPO: ${{ github.event.repository.name }}
          NODE_ENV: production
        run: zhinang cr $PR_NUMBER --zhinang-token $ZHINANG_TOKEN --owner $OWNER --repo $REPO
```
