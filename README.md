# 挨拶? 概要？的な
こんにちは。はい、開成学園天文気象部(=天気)のサイトです。
そもそも作者はI ❤️ PC 的な変なパソコンやろーでもないし、そもそも全部ネットで集めた独学なので、後世の人はいい感じに解読して修正してください。
てかREADMEファイルの書き方すら知らないので、こっちもいい感じに直して引き継いでください。

# 個人的ルール?的な
言語はtypescript、あとtailwind使ってます。ESLint?みたいなのはよくわからないけど、多分使ってない。使いたかったら勝手にどうぞ。
GithubのURL: https://github.com/KawaryoPublic/tenki-site
VercelのURL: https://vercel.com/kawaryos-projects/tenki-site
サイトのURL: https://tenki-site.vercel.app/

// フォルダー系の説明
prismaはプリズマです。つまりデータベースと会話するやつ。Vercelではneonみたいなデータベースを使ってる(あまり詳しくない)。
publicは画像とか、動画とか、みんな見れるやつらを置いとく。

srcはソースコード。
appはアプリ。
apiはなんかサーバー系のやつら。
pageは、まあわかるか。

componentsはコンポーネントを集めたやつです。
layoutはheaderとかmain, footerとかのレイアウト(あまり使わない)。
sectionはsection(そのまま)。
uiはユーザーインターフェイス。globalは全部で使いそうなやつら。中でButtonとFormは個別にあります。

libは便利になれ〜と思っておいたやつです。
action.tsはサーバー系(2度目)。
const.tsはコンスタント、定数です。
prisma.tsは前述のprisma用。
type.tsはタイプ、型。
util.tsはユーティリティ、汎用的、困ったらとりあえずここ!

.gitignoreなんかGithubにプッシュしないファイルたちらしいです(つかったことない...)。パスワードとかはここなのかな。
あとのやつらはもうほぼ使ったことないです。こやつらに詳しい人は上手く使ってやってください。

ああ、そういえばセクションなら-Section、ボタンなら-Button、フォームなら-Form、UIなら-UIて感じで、こやつが何なのかわかるように後ろにつけてます。




　　*'``・* 。
　　|　　　　 `*。
　,｡∩　　　　 　* 　　　もうどうにでもな～れ
+　(´･ω･`)　*｡+ﾟ
`*｡ ヽ、　 つ *ﾟ*
　`・+｡*・' ﾟ⊃ +ﾟ
　☆　　 ∪~ ｡*ﾟ
　　`・+｡*・ ﾟ