function generateMusicPrompt(startDate, endDate, numSongs, isSecondTime = false) {
  let prompt =
`${startDate}から${endDate}の間に以下のサイトで上位100位以内にランクインした楽曲(J-POP, K-POP, 洋楽など)を均等に調査し、ランダムな順で重複がないように${numSongs}曲、日本版の曲名とアーティストを列挙してから、列挙したものを指定したYAML形式でフォーマットしてください。推論の過程をプロンプトに出力してください。サンプルではなく${numSongs}曲全ての曲を書式化するまで繰り返してください。要件を満たした出力結果になるまで検索・推論を繰り返してください。実行時間はいくらかかっても構いません。

ランキング調査に用いるサイト:
・Billboard JAPAN Hot 100 (https://www.billboard-japan.com)
・Oricon Singles Chart (https://www.oricon.co.jp)

YAMLのフォーマット:
song_1:
 - title: "title_name"
 - artist: "artist_name"
song_2:
 - title: "title_name"
 - artist: "artist_name"
song_3:
 - title: "title_name"
 - artist: "artist_name"
`;

  if (isSecondTime) {
    prompt += `\nまた、前の処理結果も含めて重複した楽曲がないかチェックし、重複した楽曲が発見された場合は、除外して最初から処理をやり直してください。`;
  }

  return prompt;
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const startDate = document.getElementById("startDate").value.trim();
  const endDate = document.getElementById("endDate").value.trim();
  const numSongs = parseInt(document.getElementById("numSongs").value.trim(), 10);
  const isSecondTime = document.getElementById("excludePrevious").checked;

  if (!startDate || !endDate || isNaN(numSongs) || numSongs <= 0) {
    alert("すべての項目を正しく入力してください。");
    return;
  }

  const promptText = generateMusicPrompt(startDate, endDate, numSongs, isSecondTime);
  document.getElementById("output").value = promptText;
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const outputArea = document.getElementById("output");
  navigator.clipboard.writeText(outputArea.value);
  alert("プロンプトがコピーされました！");
});
