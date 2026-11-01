# p.b.q HP・LPアクセス解析

2026-11-01。GA4プロパティ「p.b.q｜HP・LP」、測定ID `G-R6ZDP89L27`。

既存の `/pbq-lp/` と `/pbq-lp/sports/` に同じタグを設置。既存のLINE URL・デザイン・申込の流れは維持する。HPと共通の `analytics.js` を使い、このLPの `content_group` は `lp`。

参加案内LINEクリック `line_click`、問い合わせ `line_contact_click`、Instagramクリック `instagram_click`、スクロール到達 `content_progress`、FAQ開封 `faq_open` を記録する。ボタン位置は `button_position`。

URLのハッシュ・通常のクエリやフォーム入力は送らない。公開パスと安全なUTMだけを利用。Googleシグナルと広告パーソナライズは無効。プライバシーページから停止・再開でき、GPCも尊重する。ローカル確認や他のGitHub Pagesプロジェクトではタグを読み込まない。

クリック数と友だち追加・参加申込の完了数を混同しない。計測前のアクセスを遡って取得することはできない。

検証：`node --test tests/analytics.test.cjs`。
