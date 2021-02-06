const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');

const nuxt = new Nuxt({
  buildDir: 'ssr',
  dev: false
});

const app = express()

app.use(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
});

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
    "user": 'info@jukumiru.net',
    "pass": 'N32#IKOv',
    //"user": 'sd1439801',
    //"pass": 'N32#IKOv',
    "host": 'smtp21.gmoserver.jp',
    "port": 587,
};
// 送信プロトコル
const SEND_CONFIG = {
    host: CONFIG_SEND_MAIL.host,
    port: CONFIG_SEND_MAIL.port,
    secure: true, // SSL
    auth: {
        user: CONFIG_SEND_MAIL.user,
        pass: CONFIG_SEND_MAIL.pass,
    }
};
// 送信情報
const TRANSPOTER = nodemailer.createTransport(SEND_CONFIG);

/* ----------------------------------------------------
    汎用処理
---------------------------------------------------- */
// テンプレートHTMLの読み込み
var read_html_template = async function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};
// メール送信
async function send_mail(mail_data){
    try {
        // メール送信
        var result = await TRANSPOTER.sendMail(mail_data);
        console.log(result)
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
    var user_nm = params.user_nm;
    var juku_nm = params.juku_nm;
    var to = params.to;

    // タイトル
    var subject = 'お申し込みありがとうございました。';

    // 本文
    var html;

    // 本文作成
    // テンプレート読み出し
    await read_html_template('./resource/mail_template/introduction/index.html', async function (err, template) {
        // パラメータマッピング
        var compiled_template = handlebars.compile(template);
        var replacements = {
            user_nm: user_nm,
            juku_nm: juku_nm,
        };
        html = compiled_template(replacements);
    });

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
    var course = params.course;
    var user_nm = params.user_nm;
    var school_grade = params.school_grade;
    var parent_nm = params.parent_nm;
    var parent_email = params.parent_email;
    var juku_nm = params.juku_nm;
    var to = params.to;

    // タイトル
    var subject = '【塾ミル】お申し込みのお知らせ'

    // 本文
    var text = `

    ` + juku_nm + ` 様

    いつもお世話になっております。
    株式会社塾ミルです。

    塾ミルより、御社へのお申し込みがありました。
    ------------------------------------------------
    お申し込み内容：` + course + `
    申込者氏名：` + user_nm + `
    申込者学年：` + school_grade + `
    保護者の方のお名前：` + parent_nm + `
    保護者の方のメールアドレス：` + parent_email + `
    ------------------------------------------------

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
