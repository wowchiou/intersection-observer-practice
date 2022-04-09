# JS Intersection Observer API practice

nodejs-version：v12.14.0

使用 JavaScript Intersection Observer API 實現無限滾動與 lazy loading 功能。當觀察物件進入設定的可視範圍內，觸發設定的方法，如載入影片、圖片或加載 api page。

實現基本步驟

1.建立 const observer = new Intersection 實例

2.並賦予實例兩個參數<br>
@observerCallback {function} 當觀察物件進入可視範圍時觸發<br>
@observerOption {object} 設定可視範圍參數<br>

3.建立觀察對象，可只有一個也可多個
observer.observe(target)

4.移除觀察對象
observer.unobserve(target)
