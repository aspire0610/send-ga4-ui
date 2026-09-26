const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const targetUrls = [
    { name: '花櫃', url: 'https://www.costco.com.tw/Sports-Lifestyle/Garden-Lifestyle/Flowers-Plant/c/121307?utm_source=warehouse&utm_medium=W5009&utm_campaign=posm-flowers' },
  { name: '珠寶櫃', url: 'https://www.costco.com.tw/Jewelry-Gold/Jewelry-Buying-guide/Jewelry-Gold/c/CL10?utm_source=warehouse&utm_medium=W5009&utm_campaign=posm-jewelry' },
  { name: 'Rollout 家具海報', url: 'https://www.costco.com.tw/content/showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=Poster-FurnitureRollOut' },
  { name: 'Rollout Lsign', url: 'https://www.costco.com.tw/content/showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-FurnitureRollOut' },
  { name: '吊掛', url: 'https://www.costco.com.tw/c/hero-showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=showroom-hangingbanner' },
  { name: '易拉展', url: 'https://www.costco.com.tw/c/hero-showroom?utm_source=warehouse&utm_medium=W5009&utm_campaign=showroom-rollupbanner' },
  { name: 'Lsign 通用', url: 'https://www.costco.com.tw/c/OnlineExclusive?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-OnlineExclusive' },
  { name: 'Lsign 家電', url: 'https://www.costco.com.tw/Televisions-Appliances/Large-Appliances/c/301?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Appliances' },
  { name: 'Lsign 電視', url: 'https://www.costco.com.tw/Televisions-Appliances/TV-Home-Entertainment/c/101?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-tvs' },
  { name: 'Lsign 輪胎', url: 'https://www.costco.com.tw/Sports-Lifestyle/Automotive/c/1421?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Tire' },
  { name: 'Lsign 玩具', url: 'https://www.costco.com.tw/Household-Baby-Toys/Toys/c/1308?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D28' },
  { name: 'Lsign HABA', url: 'https://www.costco.com.tw/Health-Beauty/Personal-Care/c/801?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D20' },
  { name: 'Lsign 運動', url: 'https://www.costco.com.tw/Sports-Lifestyle/Sports-Fitness/c/1209?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D26' },
  { name: 'Lsign 服飾', url: 'https://www.costco.com.tw/Clothing-Accessories/c/9?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D31D39' },
  { name: 'Lsign 食品', url: 'https://www.costco.com.tw/Food-Dining/c/CL8?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D12D13' },
  { name: 'Lsign 五金', url: 'https://www.costco.com.tw/Furniture-Kitchen/Hardware-DIY/c/605?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D23' },
  { name: 'Lsign 床墊', url: 'https://www.costco.com.tw/Furniture-Kitchen/Bedding/Mattress-Toppers/c/60205?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-Mattress' },
  { name: 'Lsign 儲藏屋', url: 'https://www.costco.com.tw/Sports-Lifestyle/Garden-Lifestyle/Outdoor-Storage/c/40201?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D27' },
  { name: 'Lsign 沙發', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Sofas-Sectionals/c/50202?utm_source=warehouse&utm_medium=W5009&utm_campaign=Lsign-D38' },
  { name: 'ENDCAP', url: 'https://www.costco.com.tw/c/OnlineExclusive?utm_source=warehouse&utm_medium=W5009&utm_campaign=Endcap-OnlineEX' },
  { name: '靜電貼紙 同價', url: 'https://www.costco.com.tw/Same-Price/c/hero-sameprice?utm_source=warehouse&utm_medium=W5009&utm_campaign=Sticker-SamePrice' },
  { name: 'M / L Sign 同價', url: 'https://www.costco.com.tw/Same-Price/c/hero-sameprice?utm_source=warehouse&utm_medium=W5009&utm_campaign=Sign-SamePrice' },
  { name: 'fy26p8 Minispotlight 週期購', url: 'https://www.costco.com.tw/content/subscription?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p8_Minispotlight_Subscription' },
  { name: 'fy26p8 Minispotlight Costco APP', url: 'https://www.costco.com.tw/costco-app?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p8_Minispotlight_CostcoApp' },
  { name: 'fy26 p10 app poster iOS', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_app_poster_iOS' },
  { name: 'fy26 p10 app poster Android', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_app_poster_Android' },
  { name: 'fy26 p10 minispotlight iOS', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_mini_spotlight_iOS' },
  { name: 'fy26 p10 minispotlight Android', url: 'https://www.costco.com.tw/content/costco-app-ios?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_mini_spotlight_Android' },
  { name: 'fy26p10w4 EM', url: 'https://www.costco.com.tw/executive-rewards?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26p_10w4_EM' },
  { name: 'fy26p10w4 D27', url: 'https://www.costco.com.tw/Lawn-Garden/Patio-Furniture/Outdoor-Patio-Furniture/c/40102?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p10_banner_d27' },
  { name: 'fy26p12w3 Showroom 1', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Sofas-Sectionals/c/50202?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_Sofas' },
  { name: 'fy26p12w3 Showroom 2', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Cabinets-Tables/c/50407?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_Cabinets' },
  { name: 'fy26p12w3 Showroom 3', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Dining-Sets/c/50301?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_DiningSets' },
  { name: 'fy26p12w3 Showroom 4', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Computer-Desk-Chair-Sets/c/50602?utm_source=warehouse&utm_medium=W5009&utm_campaign=fy26_p12_Showroom_ComputerDeskChair' }
];

const MEASUREMENT_ID = 'G-F5DSSB6YJ3';

const UTM_MEDIUM_OPTIONS = [
  'W5003', 'W5009', 'W5010', 'W5011', 'W872', 'W874', 'W886',
  'W5001', 'W5002', 'W5007', 'W5008', 'W5018', 'W870', 'W5020'
];

const COUNTER_FILE = path.join(__dirname, 'ga4-counter-data.json');

function loadCounters() {
  try {
    const saved = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
    return {
      total: Number.isInteger(saved.total) && saved.total >= 0 ? saved.total : 0,
      items: saved.items && typeof saved.items === 'object' ? saved.items : {}
    };
  } catch (err) {
    return { total: 0, items: {} };
  }
}

let globalCounters = loadCounters();

function saveCounters() {
  const tempFile = COUNTER_FILE + '.tmp';
  fs.writeFileSync(tempFile, JSON.stringify(globalCounters, null, 2), 'utf8');
  fs.renameSync(tempFile, COUNTER_FILE);
}

app.get('/', (req, res) => {
  const checkboxesHtml = targetUrls.map((item, index) => {
    if (!item.url) {
      return `<div class="section-heading">${item.name.replace(/^-+|-+$/g, '')}</div>`;
    }

    return `
      <div class="url-option">
        <label class="url-label">
          <span class="url-name">
            <input class="url-check" type="checkbox" name="urlIndex" value="${index}" checked>
            <span><b>${index + 1}.</b> ${item.name}</span>
          </span>
          <span class="item-count-badge" id="item-count-${index}">0 次</span>
        </label>
      </div>
    `;
  }).join('');

  const mediumOptionsHtml = UTM_MEDIUM_OPTIONS.map(value =>
    `<option value="${value}"${value === 'W5009' ? ' selected' : ''}>${value}</option>`
  ).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Costco GA4 發送控制台</title>
      <style>
        :root {
          color-scheme: light;
          --ink: #172033;
          --muted: #667085;
          --blue: #087cff;
        }

        * { box-sizing: border-box; }

        body {
          min-height: 100vh;
          margin: 0;
          padding: 28px 16px;
          color: var(--ink);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background:
            radial-gradient(ellipse at 12% 8%, rgba(160,205,255,.55), transparent 34%),
            radial-gradient(ellipse at 90% 16%, rgba(222,197,255,.50), transparent 32%),
            linear-gradient(145deg, #edf5ff, #f5f4fb 48%, #eef4fb);
        }

        body::before {
          content: "";
          position: fixed;
          width: 290px;
          height: 290px;
          left: -100px;
          bottom: -120px;
          border-radius: 50%;
          background: rgba(140,196,255,.32);
          filter: blur(60px);
          pointer-events: none;
        }

        .container {
          position: relative;
          max-width: 980px;
          margin: 0 auto;
          padding: 28px;
          border: 1px solid rgba(255,255,255,.76);
          border-radius: 28px;
          background: rgba(255,255,255,.68);
          backdrop-filter: saturate(170%) blur(28px);
          -webkit-backdrop-filter: saturate(170%) blur(28px);
          box-shadow: 0 24px 70px rgba(40,65,105,.14), inset 0 1px 0 rgba(255,255,255,.9);
        }

        h1 {
          margin: 0 0 5px;
          color: #162b49;
          font-size: clamp(22px, 4vw, 29px);
          letter-spacing: -.035em;
        }

        p { color: var(--muted); font-size: 14px; }

        button {
          padding: 12px 20px;
          border: 1px solid rgba(255,255,255,.72);
          border-radius: 15px;
          color: white;
          background: linear-gradient(180deg, #248aff, #0874ef);
          box-shadow: 0 7px 18px rgba(0,112,235,.22), inset 0 1px 0 rgba(255,255,255,.35);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: .18s ease;
        }

        button:hover { transform: translateY(-1px); filter: brightness(1.04); }
        button:disabled { background: #a7b4c5; box-shadow: none; cursor: not-allowed; }

        .actions, .main-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .actions { margin: 20px 0 14px; }

        .btn-secondary {
          padding: 10px 16px;
          color: #30415c;
          background: rgba(255,255,255,.68);
          border-color: rgba(255,255,255,.88);
          box-shadow: 0 4px 14px rgba(40,60,90,.08), inset 0 1px 0 white;
          font-size: 14px;
        }

        .btn-secondary:hover { color: #0b6ee8; background: rgba(255,255,255,.9); }
        .btn-danger { margin-left: auto; color: #b42334; background: rgba(255,238,240,.82); }
        .btn-stop { background: linear-gradient(180deg, #ff777d, #ed4652); }
        .btn-compact { padding: 6px 10px; font-size: 12px; }

        .grid-box {
          display: grid;
          grid-template-columns: 1fr;
          gap: 7px;
          max-height: 350px;
          overflow-y: auto;
          margin-bottom: 15px;
          padding: 14px;
          border: 1px solid rgba(255,255,255,.85);
          border-radius: 20px;
          background: rgba(255,255,255,.43);
          box-shadow: inset 0 1px 5px rgba(56,80,120,.045);
        }

        @media (min-width: 768px) {
          .grid-box { grid-template-columns: 1fr 1fr; gap: 8px 18px; max-height: 340px; padding: 18px; }
        }

        .url-label {
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 6px 9px;
          border-radius: 12px;
          color: #34435b;
          font-size: 14px;
          cursor: pointer;
        }

        .url-label:hover { background: rgba(255,255,255,.72); }
        .url-name { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .url-name > span { overflow-wrap: anywhere; }
        .url-check { width: 18px; height: 18px; accent-color: var(--blue); }

        .section-heading {
          grid-column: 1 / -1;
          padding: 5px 0 7px;
          border-bottom: 1px solid rgba(90,130,180,.18);
          color: #42658f;
          font-size: 13px;
          font-weight: 700;
        }

        .item-count-badge {
          flex-shrink: 0;
          padding: 2px 8px;
          border: 1px solid rgba(190,207,228,.62);
          border-radius: 999px;
          color: #38628d;
          background: rgba(255,255,255,.78);
          font-size: 12px;
          font-weight: 700;
        }

        .auto-panel {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 13px;
          margin-bottom: 15px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,.88);
          border-radius: 20px;
          background: rgba(255,255,255,.52);
          box-shadow: inset 0 1px 0 white;
        }

        .auto-panel label, .medium-control {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #40516a;
          font-size: 13px;
        }

        .medium-control { font-weight: 600; }

        .auto-panel input[type="number"], #utm-medium-select {
          padding: 8px 10px;
          border: 1px solid rgba(158,177,203,.42);
          border-radius: 11px;
          color: #25364e;
          background: rgba(255,255,255,.82);
          box-shadow: inset 0 1px 2px rgba(33,52,80,.04);
          font-size: 14px;
        }

        .auto-panel input[type="number"] { width: 80px; }
        #utm-medium-select { padding: 9px 12px; font-weight: 700; }

        .ip-box, .total-count-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid rgba(255,255,255,.92);
          border-radius: 14px;
          color: #315b89;
          background: rgba(255,255,255,.68);
          box-shadow: 0 4px 12px rgba(35,65,105,.05), inset 0 1px 0 white;
          font-size: 14px;
          font-weight: 700;
        }

        .total-count-box { color: #075fc8; font-variant-numeric: tabular-nums; }
        #status-text { width: 100%; margin-top: 5px; color: #1473df; font-size: 14px; font-weight: 700; }
        h3 { margin: 16px 0 8px; color: #40516a; font-size: 14px; }

        #log-box {
          height: 280px;
          overflow-y: auto;
          padding: 15px;
          border: 1px solid rgba(255,255,255,.9);
          border-radius: 18px;
          color: #33516f;
          background: rgba(255,255,255,.66);
          box-shadow: inset 0 1px 4px rgba(35,55,85,.05);
          font-family: monospace;
          font-size: 12px;
          line-height: 1.5;
        }

        .log-err { color: #bd3542; }
        .log-info { color: #3475b7; }
        .log-warn { color: #a66a0a; }

        @media (max-width: 600px) {
          body { padding: 12px; }
          .container { padding: 18px; border-radius: 22px; }
          .auto-panel { gap: 11px; }
          .ip-box { flex-wrap: wrap; }
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h1>📊 GA4 選擇性發送控制台</h1>
        <p>請勾選要發送的目標連結：</p>

        <div class="actions">
          <button type="button" class="btn-secondary" onclick="toggleAll(true)">全選</button>
          <button type="button" class="btn-secondary" onclick="toggleAll(false)">全不選</button>
          <button type="button" class="btn-secondary btn-danger" onclick="resetCounts()">清空全域計數</button>
        </div>

        <div class="grid-box">${checkboxesHtml}</div>

        <div class="auto-panel">
          <label class="medium-control" for="utm-medium-select">
            GA4 utm_medium:
            <select id="utm-medium-select">${mediumOptionsHtml}</select>
          </label>

          <div class="ip-box">
            <span>🌐 當前裝置 IP:</span>
            <span id="current-ip">抓取中...</span>
            <button type="button" class="btn-secondary btn-compact" onclick="fetchCurrentIp()">重新整理</button>
          </div>

          <div class="total-count-box">
            <span>🌐 全裝置累積送出:</span>
            <span id="total-sent-count">0</span> 次
          </div>

          <label>
            <input type="checkbox" id="auto-repeat-chk">
            啟用自動重複發送
          </label>

          <label>間隔 (秒):
            <input type="number" id="interval-sec" value="60" min="10">
          </label>

          <label>重複次數:
            <input type="number" id="repeat-count" value="5" min="1">
          </label>

          <div id="status-text"></div>
        </div>

        <div class="main-actions">
          <button type="button" id="start-btn" onclick="handleStart()">單次發送 / 啟動自動重複</button>
          <button type="button" id="stop-btn" class="btn-stop" style="display:none" onclick="stopAutoLoop()">停止自動發送</button>
        </div>

        <h3>即時執行日誌 (包含傳送參數)：</h3>
        <div id="log-box">等待開始執行...</div>
      </div>

      <script>
        var autoTimer = null;
        var countdownTimer = null;
        var isStopped = false;
        var currentRunCount = 0;
        var maxRuns = 1;
        var currentIpAddress = '未知 IP';

        async function fetchCurrentIp() {
          var ipEl = document.getElementById('current-ip');

          try {
            ipEl.innerText = '更新中...';
            var res = await fetch('https://api.ipify.org?format=json');
            var data = await res.json();
            currentIpAddress = data.ip;
            ipEl.innerText = currentIpAddress;
          } catch (err) {
            currentIpAddress = '無法取得 IP';
            ipEl.innerText = currentIpAddress;
          }
        }

        window.addEventListener('DOMContentLoaded', function() {
          fetchCurrentIp();

          var mediumSelect = document.getElementById('utm-medium-select');
          var savedMedium = localStorage.getItem('ga_selected_utm_medium');

          if (savedMedium && Array.from(mediumSelect.options).some(function(option) {
            return option.value === savedMedium;
          })) {
            mediumSelect.value = savedMedium;
          }

          mediumSelect.addEventListener('change', function() {
            localStorage.setItem('ga_selected_utm_medium', mediumSelect.value);
          });

          refreshCounts();
          setInterval(refreshCounts, 3000);
        });

        function toggleAll(status) {
          document.querySelectorAll('input[name="urlIndex"]').forEach(function(cb) {
            cb.checked = status;
          });
        }

        function updateStatus(message, color) {
          var el = document.getElementById('status-text');
          el.innerText = message;
          if (color) el.style.color = color;
        }

        function renderCounters(data) {
          var counts = data.items || {};
          document.getElementById('total-sent-count').innerText = Number(data.total) || 0;

          document.querySelectorAll('.item-count-badge').forEach(function(badge) {
            var targetIndex = badge.id.replace('item-count-', '');
            badge.innerText = (Number(counts[targetIndex]) || 0) + ' 次';
          });
        }

        async function refreshCounts() {
          try {
            var res = await fetch('/counters', { cache: 'no-store' });
            if (!res.ok) throw new Error('無法讀取全域計數');
            renderCounters(await res.json());
          } catch (err) {
            console.warn('讀取全域計數失敗:', err);
          }
        }

        // 顯示伺服器實際回應，避免只看到通用錯誤。
        async function readApiResponse(res) {
          var text = await res.text();
          var data;

          try {
            data = JSON.parse(text);
          } catch (err) {
            data = { message: text.slice(0, 180) || '伺服器沒有回傳 JSON' };
          }

          if (!res.ok) {
            throw new Error((data.message || '請求失敗') + ' (HTTP ' + res.status + ')');
          }

          return data;
        }

        async function incrementCount(targetIndex) {
          var res = await fetch('/record-count', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: targetIndex })
          });

          var data = await readApiResponse(res);
          renderCounters(data);
          return data.persisted !== false;
        }

        async function resetCounts() {
          if (!confirm('確定要清空所有裝置共用的計數嗎？此操作會影響所有使用者，且無法復原。')) return;

          try {
            var res = await fetch('/reset-counters', { method: 'POST' });
            var data = await readApiResponse(res);
            renderCounters(data);

            if (data.persisted === false) {
              alert('計數器已在目前伺服器紀錄，伺服器重啟後將重置。');
            }
          } catch (err) {
            alert(err.message);
          }
        }

        function handleStart() {
          isStopped = false;
          var isAuto = document.getElementById('auto-repeat-chk').checked;

          if (isAuto) {
            maxRuns = parseInt(document.getElementById('repeat-count').value, 10) || 1;
            currentRunCount = 0;
            document.getElementById('start-btn').style.display = 'none';
            document.getElementById('stop-btn').style.display = 'inline-block';
            startNextLoop();
          } else {
            currentRunCount = 1;
            maxRuns = 1;
            executeTask();
          }
        }

        function stopAutoLoop() {
          isStopped = true;
          clearTimeout(autoTimer);
          clearInterval(countdownTimer);

          updateStatus('🛑 已停止自動發送', '#bd3542');
          document.getElementById('start-btn').style.display = 'inline-block';
          document.getElementById('stop-btn').style.display = 'none';
          document.getElementById('start-btn').disabled = false;
          document.getElementById('start-btn').innerText = '單次發送 / 啟動自動重複';
        }

        async function startNextLoop() {
          if (isStopped) return;
          currentRunCount++;

          await executeTask();

          if (isStopped) return;

          var isAuto = document.getElementById('auto-repeat-chk').checked;

          if (!isAuto || currentRunCount >= maxRuns) {
            if (currentRunCount >= maxRuns && isAuto) {
              var logBox = document.getElementById('log-box');
              logBox.innerHTML += '<span class="log-warn">已達到設定的總重複次數 (' +
                maxRuns + ' 次)，自動停止任務。</span><br>';
              logBox.scrollTop = logBox.scrollHeight;
            }

            stopAutoLoop();
            return;
          }

          var sec = parseInt(document.getElementById('interval-sec').value, 10) || 60;
          var remaining = sec;

          updateStatus(
            '⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' +
            remaining + ' 秒',
            '#087cff'
          );

          countdownTimer = setInterval(function() {
            if (isStopped) {
              clearInterval(countdownTimer);
              return;
            }

            remaining--;

            if (remaining > 0) {
              updateStatus(
                '⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' +
                remaining + ' 秒',
                '#087cff'
              );
            } else {
              clearInterval(countdownTimer);
            }
          }, 1000);

          autoTimer = setTimeout(function() {
            if (!isStopped) startNextLoop();
          }, sec * 1000);
        }

        async function executeTask() {
          if (isStopped) return;

          var btn = document.getElementById('start-btn');
          var logBox = document.getElementById('log-box');
          var checkboxes = document.querySelectorAll('input[name="urlIndex"]:checked');
          var selectedIndexes = [];

          checkboxes.forEach(function(cb) {
            selectedIndexes.push(parseInt(cb.value, 10));
          });

          if (selectedIndexes.length === 0) {
            alert('請至少勾選一個連結！');
            stopAutoLoop();
            return;
          }

          btn.disabled = true;

          var isAuto = document.getElementById('auto-repeat-chk').checked;
          var runTag = isAuto ? ' [第 ' + currentRunCount + '/' + maxRuns + ' 輪]' : '';

          await fetchCurrentIp();

          updateStatus('⏳ ' + runTag + ' 數據發送中...', '#d88900');

          logBox.innerHTML += '<br><span class="log-info">[' +
            new Date().toLocaleTimeString() + ']' + runTag +
            ' 開始發送選中的 ' + selectedIndexes.length +
            ' 筆資料... (當前來源 IP: ' + currentIpAddress + ')</span><br>';

          try {
            var res = await fetch('/run-task', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                indexes: selectedIndexes,
                utmMedium: document.getElementById('utm-medium-select').value
              })
            });

            var data = await readApiResponse(res);

            if (data.success && data.items) {
              for (var i = 0; i < data.items.length; i++) {
                if (isStopped) break;

                var item = data.items[i];

                item.params.sid = Math.floor(Date.now() / 1000).toString();
                item.params.sr = (window.screen && window.screen.width && window.screen.height)
                  ? (window.screen.width + 'x' + window.screen.height)
                  : '1920x1080';

                var queryParams = new URLSearchParams(item.params).toString();
                var targetUrl = 'https://www.google-analytics.com/g/collect?' + queryParams;

                try {
                  await fetch(targetUrl, { mode: 'no-cors' });

                  try {
                    var persisted = await incrementCount(selectedIndexes[i]);

                    if (!persisted) {
                      logBox.innerHTML += '<span class="log-warn">計數器已在目前伺服器紀錄，伺服器重啟後將重置。</span><br>';
                    }
                  } catch (countErr) {
                    logBox.innerHTML += '<span class="log-warn">全域計數更新失敗: ' +
                      countErr.message + '</span><br>';
                  }

                  var paramLogHtml =
                    '<div style="color:#52657c;font-size:11px;padding-left:20px;margin-bottom:6px;">' +
                    '↳ <b>[發送來源 IP]</b> ' + currentIpAddress + '<br>' +
                    '↳ <b>[核心識別參數]</b> <b>tid:</b> ' + item.params.tid +
                    ' | <b>cid:</b> ' + item.params.cid +
                    ' | <b>sid:</b> ' + item.params.sid +
                    ' | <b>_fv:</b> ' + item.params._fv + '<br>' +
                    '<span style="padding-left:80px;"><b>UTM 歸因:</b> source=' +
                    (item.params.cs || 'none') +
                    ' | medium=' + (item.params.cm || 'none') +
                    ' | campaign=' + (item.params.cn || 'none') + '</span><br>' +
                    '<span style="padding-left:80px;"><b>Consent Mode:</b> gcs=' +
                    item.params.gcs + ' | gcd=' + item.params.gcd + '</span><br>' +
                    '<span style="padding-left:80px;"><b>dt:</b> ' + item.params.dt + '</span><br>' +
                    '<span style="padding-left:80px;"><b>dl:</b> ' + item.params.dl + '</span>' +
                    '</div>';

                  logBox.innerHTML += '<span style="color:#16804a;">[成功] (' +
                    (i + 1) + '/' + data.items.length + ') ' +
                    item.name + ' 已送達</span><br>' + paramLogHtml;
                } catch (sendErr) {
                  logBox.innerHTML += '<span class="log-err">[失敗] (' +
                    (i + 1) + '/' + data.items.length + ') ' +
                    item.name + ' 失敗: ' + sendErr.message + '</span><br>';
                }

                logBox.scrollTop = logBox.scrollHeight;

                if (i < data.items.length - 1) {
                  var delayMs = Math.floor(Math.random() * 5000) + 5000;
                  await new Promise(function(resolve) {
                    setTimeout(resolve, delayMs);
                  });
                }
              }
            }
          } catch (err) {
            logBox.innerHTML += '<span class="log-err">執行發生錯誤: ' +
              err.message + '</span><br>';
          } finally {
            if (!isAuto && !isStopped) {
              btn.disabled = false;
              btn.innerText = '單次發送 / 啟動自動重複';
              updateStatus('✅ 發送完畢', '#16804a');
            }

            logBox.innerHTML += '<span class="log-info">=== 本次任務執行完畢 ===</span><br>';
            logBox.scrollTop = logBox.scrollHeight;
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.post('/run-task', (req, res) => {
  try {
    const selectedIndexes = req.body && Array.isArray(req.body.indexes)
      ? req.body.indexes
      : [];

    const requestedUtmMedium = req.body && req.body.utmMedium !== undefined
      ? req.body.utmMedium
      : 'W5009';

    if (
      typeof requestedUtmMedium !== 'string' ||
      !UTM_MEDIUM_OPTIONS.includes(requestedUtmMedium)
    ) {
      return res.status(400).json({
        success: false,
        message: '收到未允許的 utm_medium。'
      });
    }

    if (selectedIndexes.length === 0) {
      return res.status(400).json({
        success: false,
        message: '未收到有效的選取索引。'
      });
    }

    const items = selectedIndexes
      .filter(index =>
        Number.isInteger(index) &&
        targetUrls[index] &&
        targetUrls[index].url
      )
      .map(targetIndex => {
        const target = targetUrls[targetIndex];

        const uniqueClientId =
          Math.floor(Math.random() * 899999999 + 100000000) + '.' +
          Math.floor(Math.random() * 899999999 + 100000000);

        const engagementTimeMs = Math.floor(Math.random() * 5000) + 10000;

        let utmSource = '';
        let utmCampaign = '';
        let targetUrl = target.url;

        try {
          const parsedUrl = new URL(target.url);
          parsedUrl.searchParams.set('utm_medium', requestedUtmMedium);
          targetUrl = parsedUrl.toString();
          utmSource = parsedUrl.searchParams.get('utm_source') || '';
          utmCampaign = parsedUrl.searchParams.get('utm_campaign') || '';
        } catch (err) {
          // 保留原本的錯誤處理方式
        }

        return {
          name: target.name,
          params: {
            v: '2',
            tid: MEASUREMENT_ID,
            gtm: '45je68e1v89223874',
            gcs: 'G111',
            gcd: '13r3r3I3I5l1',
            cid: uniqueClientId,
            sid: '',
            sct: '1',
            seg: '1',
            _fv: '1',
            _ss: '1',
            _s: '1',
            ul: 'zh-tw',
            _p: Math.floor(Math.random() * 1000000000).toString(),
            _et: engagementTimeMs.toString(),
            dl: targetUrl,
            dt: target.name,
            en: 'page_view',
            cs: utmSource,
            cm: requestedUtmMedium,
            cn: utmCampaign
          }
        };
      });

    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/counters', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(globalCounters);
});

app.post('/record-count', (req, res) => {
  const targetIndex = Number(req.body && req.body.index);

  if (
    !Number.isInteger(targetIndex) ||
    !targetUrls[targetIndex] ||
    !targetUrls[targetIndex].url
  ) {
    return res.status(400).json({
      success: false,
      message: '無效的目標索引。'
    });
  }

  const itemKey = String(targetIndex);
  globalCounters.total += 1;
  globalCounters.items[itemKey] =
    (Number(globalCounters.items[itemKey]) || 0) + 1;

  let persisted = true;

  try {
    saveCounters();
  } catch (err) {
    persisted = false;
    console.error('無法儲存全域計數檔案:', err.message);
  }

  // 檔案系統不能寫入時，計數仍會在目前伺服器程序內共用。
  res.json({ ...globalCounters, persisted });
});

app.post('/reset-counters', (req, res) => {
  globalCounters = { total: 0, items: {} };

  let persisted = true;

  try {
    saveCounters();
  } catch (err) {
    persisted = false;
    console.error('無法儲存重設後的全域計數:', err.message);
  }

  res.json({ ...globalCounters, persisted });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('UI 介面已啟動！請在瀏覽器開啟: http://localhost:' + PORT);
});
