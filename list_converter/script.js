function parseYAML() {
  const input = document.getElementById("yamlInput").value;
  const songListDiv = document.getElementById("songList");
  songListDiv.innerHTML = "";

  try {
    const data = jsyaml.load(input);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const song = data[key]; // song_1, song_2, etc.

        if (typeof song === "object" && song !== null) {
          const title = song.title || "タイトル不明";
          const artist = song.artist || "アーティスト不明";

          const query = encodeURIComponent(`${title} ${artist} topic site:www.youtube.com`);
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