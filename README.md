# yamiyomi bot
棒読みちゃんを用いた読み上げ

## 必要なもの
1. 本コード(node.js駆動)
2. 棒読みちゃん


## 使い方
1. コードをダウンロード
2. ```npm install```を実行
3. [Developer Portal](https://discord.com/developers/applications)からPrivileged Intentsを有効化する<br>
![discord-div-Privileged_Intents.png](https://github.com/huda0209/resource/blob/master/discord-bot-template/discord-div-Privileged_Intents.png)<br>
赤枠内のチェックボタンをオンにする<br>
4. config内の`config.json`にトークンをセット
5. 棒読みちゃんを起動
6. ```node main```でbotログイン<br>


## コマンド
`/yy add` : 実行したチャンネルを読み上げリストから追加
`/yy <del/delete>` : 実行したチャンネルを読み上げリストから削除


## ファイル
`config.json` botの動作に必要なデータを設定<br>
初期データ
```json
{
    "NAME" : "YAMIYOMI BOT",
    "VERSION" : "1.0.0",
    "PREFIX" : "/",
    "COMMAND" : "yy",
    "token" : "<YOUR_BOT_TOKEN>"
}
```
<br>
`channel.json` botの読み上げリスト管理用
配列でチャンネルidを記述

## 作成者
- [huda0209](https://github.com/huda0209)

## ライセンス
MITライセンス
