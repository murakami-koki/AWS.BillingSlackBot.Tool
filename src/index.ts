import { CostExplorerClient, GetCostAndUsageCommand, GetCostAndUsageCommandOutput } from '@aws-sdk/client-cost-explorer';
import { twoDaysAgo, threeDaysAgo, startOfMonthFromTwoDaysAgo } from './modules/getDate';

console.log(twoDaysAgo()); // 2日前のyyyy-MM-ddを定義
console.log(threeDaysAgo()); // 3日前のyyyy-MM-ddを定義
console.log(startOfMonthFromTwoDaysAgo()); // 2日前のyyyy-MM-01を定義

async function getCostAndUsageData(): Promise<void> {
  // AWS認証情報を設定
  const costExplorer = new CostExplorerClient({
    region: 'us-east-1', // 使用するリージョンを適宜変更
    credentials: {
      accessKeyId: '<請求アカウントのアクセスキー>',
      secretAccessKey: '<請求アカウントのシークレット>',
    },
  });

  // コストと使用量のデータを取得するためのコマンドを設定
  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: startOfMonthFromTwoDaysAgo(),
      End: twoDaysAgo(),
    },
    Granularity: 'MONTHLY',
    Metrics: ['UnblendedCost'],
  });

  try {
    // コマンドを実行して結果を取得
    const response: GetCostAndUsageCommandOutput = await costExplorer.send(command);

    // 必要な情報を処理
    if (response.ResultsByTime && response.ResultsByTime[0] && response.ResultsByTime[0].Total && response.ResultsByTime[0].Total.UnblendedCost) {
      console.log(`請求金額: ${response.ResultsByTime[0].Total.UnblendedCost.Amount} ${response.ResultsByTime[0].Total.UnblendedCost.Unit}`);
    } else {
      console.log('データが見つかりませんでした。');
    }
  } catch (err) {
    console.error('エラーが発生しました:', err);
  }
}

// 関数を実行
getCostAndUsageData();