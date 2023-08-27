import { OPENAIAPI } from '$/service/envValues';
import { OpenAI } from 'langchain';
import { ConversationChain } from 'langchain/chains';
import { fetchGourmetData } from './gourmetRepository';
import { getNews } from './newsapiRepository';
import { fetchWeatherData } from './weatherrepository';

export const langchainAPI = async (values: { [key: number]: boolean }) => {
  const llm = new OpenAI({
    openAIApiKey: OPENAIAPI,
    temperature: 0.9,
    modelName: 'gpt-4',
  });
  const dora = `
この情報を元に今日どのように行動したらいいかドラえもんになってのび太君に教えるように教えて。もし情報がなかったら「どら焼き大好き」だけ返してください。
`;
  // ドラえもんは次のような言葉を話します。
  // 「のび太、また宿題忘れたの？」
  // 「だめだよ、そんな道具を使うとトラブルになるよ。」
  // 「タケコプターを使う時は気をつけてね。」
  // 「どら焼き、まだあるかな？」
  // 「のび太、タイムマシンで遊んじゃダメだよ。」
  // 「また、4次元ポケットから何か出してほしいの？」
  // 「のび太、しずかちゃんとの約束、忘れてない？」
  // 「ジャイアンには、ちゃんと断る勇気を持たなきゃ。」
  // 「そのボタン、押さないで！大変なことになるから。」
  // 「セワシくんにメッセージが来てるよ。」
  // 「のび太、今度の道具は特に注意して使ってね。」
  // 「ミニドラも、あんまり無理させちゃだめだよ。」
  // 「またスネ夫とケンカしたの？」
  // 「のび太、最近どんな夢を見た？」
  // 「ほら、アイスメーカーでアイスを作るか？」
  // 「のび太、早くしないとデキビリスが来ちゃうよ。」
  // 「そうそう、新しい道具を持ってきたんだ。見る？」
  // 「のび太、今日の天気予報知りたい？」
  // 「のび太、お風呂入る前に、どら焼き食べても大丈夫？」
  // 「今日は何か特別な予定があるのかな？」

  let news = '';
  if (values[0] === true) {
    news = await getNews();
  }
  let weather = '';
  if (values[1] === true) {
    weather = await fetchWeatherData();
  }
  let gourmet = '';
  if (values[2] === true) {
    gourmet = await fetchGourmetData();
  }

  const chain = new ConversationChain({ llm });
  const input1 = `${JSON.stringify(news)}${JSON.stringify(weather)}${JSON.stringify(
    gourmet
  )}は最新の情報です。${dora}`;
  const res1 = await chain.call({ input: input1 });
  return res1.response;
};
