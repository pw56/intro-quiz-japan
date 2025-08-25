function parseYAML() {
  const input = document.getElementById("yamlInput").value;
  const songListDiv = document.getElementById("songList");
  songListDiv.innerHTML = "";

  try {
    const data = jsyaml.load(input);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const songArray = data[key];
        if (Array.isArray(songArray) && songArray.length > 0) {
          const song = songArray[0]; // 最初の要素を取得
          const title = song.title || "タイトル不明";
          const artist = song.artist || "アーティスト不明";

          const query = encodeURIComponent(`${title} ${artist} topic`);
          const searchUrl = `https://www.google.com/search?q=${query}&tbm=vid`;

          const songBlock = document.createElement("div");
          songBlock.className = "song-block";

          const titleElem = document.createElement("div");
          titleElem.className = "song-title";
          titleElem.textContent = title;

          const artistElem = document.createElement("div");
          artistElem.className = "song-artist";
          artistElem.textContent = artist;

          const searchBtn = document.createElement("a");
          searchBtn.href = searchUrl;
          searchBtn.target = "_blank";
          searchBtn.className = "search-button";
          searchBtn.textContent = "ネットで検索";

          songBlock.appendChild(titleElem);
          songBlock.appendChild(artistElem);
          songBlock.appendChild(searchBtn);

          songListDiv.appendChild(songBlock);
        }
      }
    }
  } catch (e) {
    alert("YAMLの解析に失敗しました。フォーマットを確認してください。");
    console.error(e);
  }
}