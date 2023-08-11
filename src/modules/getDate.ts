import { subDays, startOfMonth, format } from 'date-fns';

const specificDate = new Date("2023-08-04");
console.log(specificDate); 

// 現在日時から2日前の日付を生成する関数
export function twoDaysAgo(): string {
    const date = subDays(specificDate, 2); // new Date()
    return format(date, 'yyyy-MM-dd');
}

// 現在日時から3日前の日付を生成する関数
export function threeDaysAgo(): string {
    const date = subDays(specificDate, 3); // new Date()
    return format(date, 'yyyy-MM-dd');
}

// 現在日時から2日前の月を生成して、日を1日として生成する関数
export function startOfMonthFromTwoDaysAgo(): string {
    // まず2日前の日付を取得
    const twoDaysAgoDate = subDays(specificDate, 2); // new Date()
    // 次に、その月の1日を取得
    const startOfMonthDate = startOfMonth(twoDaysAgoDate);
    return format(startOfMonthDate, 'yyyy-MM-dd');
}

// // 関数の使用例
// console.log(twoDaysAgo());                // 現在日時から2日前の日付を出力
// console.log(threeDaysAgo());                // 現在日時から3日前の日付を出力
// console.log(startOfMonthFromTwoDaysAgo());  // 現在日時から2日前の月の1日の日付を出力