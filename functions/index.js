const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer')
const QRCode = require('qrcode');

const nuxt = new Nuxt({
  buildDir: 'ssr',
  dev: false
});

const app = express()

app.use(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
});

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
})

exports.ssr = functions.https.onRequest(app)

/*
  --------------------------------------- メール送信 ---------------------------------------
*/

// 設定
const CONFIG_SEND_MAIL = {
    "from": 'XXXXXXXXXXXXXXXXXXXX',
    "user": 'XXXXXXXXXXXXXXXXXXXX',
    "pass": 'XXXXXXXXX',
    "host": 'XXXXXXXXX',
    "port": 999,
};

//　テンプレートHTMLの読み込み
var read_html_template = async function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

//  申し込み後メール送信
exports.send_introduction_mail = functions.https.onRequest(async (req, res) => {
    
    // リクエストパラメータ
    var params = req.body;
    // 送信先
    var to = params.to;
    // 申込者名
    var user_nm = params.user_nm;
    // 塾名
    var juku_nm = params.juku_nm;

    // プロトコル設定
    var smtp_config = {
      host: CONFIG_SEND_MAIL.host,
      port: CONFIG_SEND_MAIL.port,
      secure: true, // SSL
      auth: {
          user: CONFIG_SEND_MAIL.user,
          pass: CONFIG_SEND_MAIL.pass,
      }
    };

    // 送信情報
    var transporter = nodemailer.createTransport(smtp_config);

    // テンプレート読み出し
    await read_html_template('./resource/mail_template/introduction/index.html', async function(err, html) {
        // パラメータマッピング
        var template = handlebars.compile(html);
        var replacements = {
            user_nm: user_nm,
            juku_nm: juku_nm,
        };
        var send_html = template(replacements);

        // QRコード生成
        var qr_cd_url = await QRCode.toDataURL("https://blog.katsubemakito.net/nodejs/qrcode-generates");

        // メールデータ本体
        var mail_data = {
            // 送信元
            from: CONFIG_SEND_MAIL.from,
            // 送信先
            to: to,
            // タイトル
            subject: 'お申し込みありがとうございました。',
            // 本文
            html: send_html,
            // 添付ファイル
            attachments: [
                {
                    cid: 'qr_cd',
                    path: qr_cd_url,
                },
            ],
        };

        try{
            // メール送信
            var result = await transporter.sendMail(mail_data);
            // 送信結果を返す
            res.send(result);
        }catch(e){
            // エラー内容を返す
            res.send(e);
        }
    
    });

});
