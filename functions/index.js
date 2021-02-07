const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer')
const QRCode = require('qrcode');
const basicAuth = require('basic-auth-connect')

const nuxt = new Nuxt({
  buildDir: 'ssr',
  dev: false
});

const app = express()

app.all('/*', basicAuth(function(user, password) {
    return user === 'nugget' && password === 'nuggetnagetoko';
}));

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

/* ----------------------------------------------------
    共通設定
---------------------------------------------------- */
// 送信元情報
const CONFIG_SEND_MAIL = {
    "from": 'info@jukumiru.net',
    //"user": 'flythenuggets@gmail.com',// Oauth設定
    "user": 'info@jukumiru.net',
    "pass": '#TZ7O9s4',
    "host": 'smtp21.gmoserver.jp',
    //"host": 'smtp.gmail.com',   // Oauth設定
    "port": 465,
};
// 送信プロトコル
const SEND_CONFIG = {
    host: CONFIG_SEND_MAIL.host,
    port: CONFIG_SEND_MAIL.port,
    secure: true, // SSL
    auth: {
        user: CONFIG_SEND_MAIL.user,
        pass: CONFIG_SEND_MAIL.pass,

        /*
        // Oauth設定
        type: 'OAuth2',
        clientId     : '586224629229-27dplrvmubgsbi3uqk74sjqsrt2do62p.apps.googleusercontent.com',
        clientSecret : '4O_DaIP0OP_RSotVe-AjdOkD',
        refreshToken : '1//04xAF_-UZOaxxCgYIARAAGAQSNwF-L9IrUkZmJiEJYjGT_CqXXVhQOw5Y_zbiyuJBqjEuIZPyjrd-juOm57CUxbDV0X79UlnKk38'
        */
    }
};
// 送信情報
const TRANSPOTER = nodemailer.createTransport(SEND_CONFIG);

/* ----------------------------------------------------
    汎用処理
---------------------------------------------------- */
// テンプレートHTMLの読み込み
function read_html_template(path) {
    return new Promise((resolve) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            resolve(data)
        })
    })
}
// 改行あり用ヘルパー
handlebars.registerHelper('breaklines', function(text) {
    text = handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new handlebars.SafeString(text);
});
// メール送信
async function send_mail(mail_data){
    console.log(mail_data)
    try {
        // メール送信
        var result = await TRANSPOTER.sendMail(mail_data);
        // 送信結果を返す
        return result;
    } catch (e) {
        console.log(e)
        // エラー内容を返す
        return e;
    }
}

/* ----------------------------------------------------
    申し込み後メール送信
---------------------------------------------------- */
exports.send_introduction_mail = functions.https.onCall(async (data, context) => {

    // 申込者用パラメータ
    var request_params = data.request;

    // 塾用パラメータ
    var juku_params = data.juku;

    var result = {};

    // 申込者にメール送信
    var mail_data_request = await create_introduction_mail_reuqest(request_params);
    result.request = await send_mail(mail_data_request);

    // 塾にメール送信
    var mail_data_juku = create_introduction_mail_juku(juku_params);
    result.juku = await send_mail(mail_data_juku);

    return result;
});

/*
    申し込み後メール作成：申込者用
*/
async function create_introduction_mail_reuqest(params) {

    // マッピングパラメータ
    var to = params.to;
    var juku_nm = params.juku_nm;
    var user_nm = params.user_nm;

    // タイトル
    var subject = '【塾ミル】お申し込みありがとうございました。';

    // 本文
    var html;

    // 本文作成
    // テンプレート読み出し
    var template = await read_html_template('./resource/mail_template/introduction/index.html');
    // パラメータマッピング
    var compiled_template = handlebars.compile(template);
    var replacements = {
        user_nm: user_nm,
        juku_nm: juku_nm,
    };
    html = compiled_template(replacements);

    // QRコード生成
    // var qr_cd_url = await QRCode.toDataURL("https://blog.katsubemakito.net/nodejs/qrcode-generates");

    // メールデータ本体
    var mail_data = {
        // 送信元
        from: CONFIG_SEND_MAIL.from,
        // 送信先
        to: to,
        // タイトル
        subject: subject,
        // 本文
        html: html,
        // 添付ファイル
        // attachments: [
        //     {
        //         cid: 'qr_cd',
        //         path: qr_cd_url,
        //     },
        // ],
    };

    return mail_data;
}

/*
    申し込み後メール作成：塾用
*/
function create_introduction_mail_juku(params) {

    // マッピングパラメータ
    var to = params.to;
    var juku_nm = params.juku_nm;
    var course = params.course;
    var user_nm = params.user_nm;
    var school_grade = params.school_grade;
    var parent_nm = params.parent_nm;
    var parent_email = params.parent_email;

    // タイトル
    var subject = '【塾ミル】お申し込みのお知らせ'

    // 本文
    var text = `

    ` + juku_nm + ` 様

    いつもお世話になっております。
    株式会社塾ミルです。

    塾ミルより、お客様へのお申し込みがありました。
    ３営業以内でのご対応をお願いいたします。
    
    お申し込み内容：
    ` + course + `
    申込者氏名：
    ` + user_nm + `
    申込者学年：
    ` + school_grade + `
    保護者の方のお名前：
    ` + parent_nm + `
    保護者の方のメールアドレス：
    ` + parent_email + `
    

    以上、よろしくお願いいたします。

    `;

    // メールデータ本体
    var mail_data = {
        // 送信元
        from: CONFIG_SEND_MAIL.from,
        // 送信先
        to: to,
        // タイトル
        subject: subject,
        // 本文
        text: text,
    };

    return mail_data;
}

/* ----------------------------------------------------
    問い合わせメール送信
---------------------------------------------------- */
exports.send_qa_mail = functions.https.onCall(async (data, context) => {

    // 質問者パラメータ
    var request_params = data.request;

    // 塾用パラメータ
    var juku_params = data.juku;

    var result = {};

    // 質問者にメール送信
    var mail_data_request = await create_qa_mail_request(request_params);
    result.request = await send_mail(mail_data_request);

    // 塾にメール送信
    var mail_data_juku = create_qa_mail_juku(juku_params);
    result.juku = await send_mail(mail_data_juku);

    return result;
});

/*
    問い合わせメール作成：質問者用
*/
async function create_qa_mail_request(params) {

    // マッピングパラメータ
    var to = params.to;
    var juku_nm = params.juku_nm;
    var user_nm = params.user_nm;
    var note = params.note;

    // タイトル
    var subject = '【塾ミル】お問い合わせ完了のお知らせ';

    // 本文
    var html;

    // 本文作成
    // テンプレート読み出し
    var template = await read_html_template('./resource/mail_template/qa/index.html');
    // パラメータマッピング
    var compiled_template = handlebars.compile(template);
    var replacements = {
        user_nm: user_nm,
        juku_nm: juku_nm,
        note: note,
    };
    html = compiled_template(replacements);

    // QRコード生成
    // var qr_cd_url = await QRCode.toDataURL("https://blog.katsubemakito.net/nodejs/qrcode-generates");

    // メールデータ本体
    var mail_data = {
        // 送信元
        from: CONFIG_SEND_MAIL.from,
        // 送信先
        to: to,
        // タイトル
        subject: subject,
        // 本文
        html: html,
        // 添付ファイル
        // attachments: [
        //     {
        //         cid: 'qr_cd',
        //         path: qr_cd_url,
        //     },
        // ],
    };

    return mail_data;
}

/*
    問い合わせメール作成：塾用
*/
function create_qa_mail_juku(params) {

    // マッピングパラメータ
    var to = params.to;
    var juku_nm = params.juku_nm;
    var user_nm = params.user_nm;
    var user_email = params.user_email;
    var note = params.note;

    // タイトル
    var subject = '【塾ミル】お問い合わせのお知らせ'

    // 本文
    var text = `
` + juku_nm + ` 様

いつもお世話になっております。
株式会社塾ミルです。

塾ミルより、お客様へのお問い合わせがございました。
ご対応をお願いいたします。

お名前：
` + user_nm + `
メールアドレス：
` + user_email + `
お問い合わせ内容：
` + note + `


以上、よろしくお願いいたします。

`;
        

    // メールデータ本体
    var mail_data = {
        // 送信元
        from: CONFIG_SEND_MAIL.from,
        // 送信先
        to: to,
        // タイトル
        subject: subject,
        // 本文
        text: text,
    };

    return mail_data;
}
