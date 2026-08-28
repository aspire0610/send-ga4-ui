const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// 解析 JSON Body
app.use(express.json());

// ==========================================
// 全域記憶體計數器邏輯 (跨設備同步)
// ==========================================
function getTaiwanDate() {
  return new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' });
}

let dailyCounts = {}; 
let lastRecordDate = getTaiwanDate();

function checkAndResetDaily() {
  const today = getTaiwanDate();
  if (lastRecordDate !== today) {
    dailyCounts = {};
    lastRecordDate = today;
  }
}

// 讀取全域計數 API
app.get('/api/daily-counts', (req, res) => {
  checkAndResetDaily();
  res.json({ success: true, date: lastRecordDate, counts: dailyCounts });
});

// 發送成功後更新單項計數 API
app.post('/api/increment-count', (req, res) => {
  checkAndResetDaily();
  const { index } = req.body;
  if (typeof index === 'number' && index >= 0) {
    dailyCounts[index] = (dailyCounts[index] || 0) + 1;
  }
  res.json({ success: true, counts: dailyCounts });
});

// 重置全域計數 API
app.post('/api/reset-counts', (req, res) => {
  checkAndResetDaily();
  dailyCounts = {};
  res.json({ success: true, counts: dailyCounts });
});
// ==========================================

const targetUrls = [
  
  { name: '886-Lsign 食品',dt:'Lsign 食品', url: 'https://www.costco.com.tw/Food-Dining/c/CL8?utm_source=warehouse&utm_medium=W886&utm_campaign=Lsign-D12D13' },
  { name: '886-Lsign 五金',dt:'Lsign 五金', url: 'https://www.costco.com.tw/Furniture-Kitchen/Hardware-DIY/c/605?utm_source=warehouse&utm_medium=W886&utm_campaign=Lsign-D23' },
  { name: '886-Lsign 沙發',dt:'Lsign 沙發', url: 'https://www.costco.com.tw/Furniture-Kitchen/Furniture/Sofas-Sectionals/c/50202?utm_source=warehouse&utm_medium=W886&utm_campaign=Lsign-D38' },
  
  { name: '874-Lsign 運動',dt:'Lsign 運動', url: 'https://www.costco.com.tw/Sports-Lifestyle/Sports-Fitness/c/1209?utm_source=warehouse&utm_medium=W874&utm_campaign=Lsign-D26' },
  { name: '874-Lsign 服飾',dt:'Lsign 服飾', url: 'https://www.costco.com.tw/Clothing-Accessories/c/9?utm_source=warehouse&utm_medium=W874&utm_campaign=Lsign-D31D39' },
  { name: '874-Lsign 食品',dt:'Lsign 食品', url: 'https://www.costco.com.tw/Food-Dining/c/CL8?utm_source=warehouse&utm_medium=W874&utm_campaign=Lsign-D12D13' },
  
  { name: '5007-Lsign 食品',dt:'Lsign 食品', url: 'https://www.costco.com.tw/Food-Dining/c/CL8?utm_source=warehouse&utm_medium=W5007&utm_campaign=Lsign-D12D13' },
  { name: '5007-Lsign 五金',dt:'Lsign 五金', url: 'https://www.costco.com.tw/Furniture-Kitchen/Hardware-DIY/c/605?utm_source=warehouse&utm_medium=W5007&utm_campaign=Lsign-D23' },
  { name: '5007-Lsign 電視',dt:'Lsign 電視', url: 'https://www.costco.com.tw/Televisions-Appliances/TV-Home-Entertainment/c/101?utm_source=warehouse&utm_medium=W5007&utm_campaign=Lsign-tvs' },
];

const MEASUREMENT_ID = 'G-F5DSSB6YJ3';

app.get('/', (req, res) => {
  const checkboxesHtml = targetUrls.map((item, index) => `
    <div class="item-card">
      <label class="item-label">
        <div class="item-top">
          <input type="checkbox" name="urlIndex" value="${index}" checked class="custom-checkbox">
          <span class="item-title"><b>${index + 1}.</b> ${item.name}</span>
        </div>
        <div class="item-bottom">
          <span id="count-badge-${index}" class="badge">
            已發送: 0 次
          </span>
        </div>
      </label>
    </div>
  `).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="zh-TW">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>📡GA4 發送控制台</title>
        <style>
            * { box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "SF Pro Display", sans-serif; 
                background: radial-gradient(circle at top left, #0f172a, #020617);
                color: #f8fafc; 
                padding: 12px; 
                margin: 0; 
                min-height: 100vh;
            }
            .container { 
                max-width: 900px; 
                margin: 0 auto; 
                background: rgba(30, 41, 59, 0.65); 
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 16px; 
                border-radius: 16px; 
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5); 
            }
            @media (min-width: 768px) { body { padding: 24px; } .container { padding: 28px; } }
            
            .header-bar {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
            }
            h1 { font-size: 20px; margin: 0; color: #38bdf8; font-weight: 700; letter-spacing: -0.5px; }
            .date-badge {
                background: rgba(56, 189, 248, 0.1);
                border: 1px solid rgba(56, 189, 248, 0.25);
                color: #38bdf8;
                font-size: 12px;
                padding: 4px 10px;
                border-radius: 20px;
                font-weight: 600;
                white-space: nowrap;
            }
            p { color: #94a3b8; margin-bottom: 15px; font-size: 13px; }
            
            .actions { margin-bottom: 15px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
            
            button { 
                background: linear-gradient(135deg, #0284c7, #0369a1); 
                color: white; 
                border: 1px solid rgba(255,255,255,0.15); 
                padding: 10px 18px; 
                font-size: 14px; 
                font-weight: 600; 
                border-radius: 10px; 
                cursor: pointer; 
                transition: all 0.2s ease;
                box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
            }
            button:active { transform: scale(0.98); }
            button:hover { background: linear-gradient(135deg, #0369a1, #075985); }
            button:disabled { background: #334155; border-color: transparent; opacity: 0.6; cursor: not-allowed; box-shadow: none; }
            
            .btn-secondary { background: rgba(51, 65, 85, 0.8); color: #e2e8f0; font-size: 13px; padding: 8px 14px; width: auto; box-shadow: none; }
            .btn-secondary:hover { background: rgba(71, 85, 105, 0.9); }
            .btn-danger { background: rgba(153, 27, 27, 0.8); color: #fca5a5; font-size: 12px; padding: 8px 12px; border-radius: 8px; box-shadow: none; }
            .btn-danger:hover { background: rgba(185, 28, 28, 0.9); }
            .btn-stop { background: linear-gradient(135deg, #dc2626, #991b1b); box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3); }
            
            .total-count-badge {
                background: rgba(16, 185, 129, 0.15);
                border: 1px solid rgba(16, 185, 129, 0.3);
                color: #34d399;
                font-size: 12px;
                padding: 6px 12px;
                border-radius: 8px;
                font-weight: 600;
                white-space: nowrap;
            }

            .grid-box { 
                display: grid; 
                grid-template-columns: 1fr; 
                gap: 8px; 
                max-height: 360px; 
                overflow-y: auto; 
                background: rgba(15, 23, 42, 0.6); 
                padding: 10px; 
                border-radius: 12px; 
                border: 1px solid rgba(255, 255, 255, 0.08); 
                margin-bottom: 15px; 
            }
            @media (min-width: 768px) { .grid-box { grid-template-columns: 1fr 1fr; gap: 10px; max-height: 320px; padding: 14px; } }
            
            .item-card { 
                background: rgba(30, 41, 59, 0.4);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 8px 12px;
                transition: background 0.15s ease;
            }
            .item-card:hover { background: rgba(255, 255, 255, 0.05); }
            .item-label { 
                cursor: pointer; 
                display: flex; 
                flex-direction: column;
                gap: 6px;
            }
            .item-top {
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }
            .custom-checkbox { width: 18px; height: 18px; accent-color: #38bdf8; flex-shrink: 0; margin-top: 2px; cursor: pointer; }
            .item-title { 
                color: #f1f5f9; 
                font-size: 13px; 
                line-height: 1.4; 
                word-break: break-word; 
            }
            .item-bottom {
                display: flex;
                justify-content: flex-end;
            }
            .badge { 
                background: rgba(15, 23, 42, 0.8); 
                color: #38bdf8; 
                border: 1px solid rgba(56, 189, 248, 0.2);
                font-size: 11px; 
                font-weight: 600; 
                padding: 2px 8px; 
                border-radius: 10px; 
                white-space: nowrap; 
            }

            .auto-panel { 
                background: rgba(15, 23, 42, 0.6); 
                border: 1px solid rgba(255, 255, 255, 0.08); 
                padding: 12px; 
                border-radius: 12px; 
                margin-bottom: 15px; 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                flex-wrap: wrap; 
            }
            .auto-panel label { color: #cbd5e1; font-size: 13px; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
            .auto-panel input[type="number"] { 
                background: rgba(30, 41, 59, 0.8); 
                border: 1px solid rgba(255, 255, 255, 0.15); 
                color: white; 
                padding: 6px 10px; 
                border-radius: 6px; 
                width: 70px; 
                font-size: 13px; 
                outline: none;
            }
            .ip-box { 
                width: 100%; 
                background: rgba(30, 41, 59, 0.7); 
                border: 1px solid rgba(56, 189, 248, 0.3); 
                color: #38bdf8; 
                padding: 8px 12px; 
                border-radius: 8px; 
                font-size: 13px; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                box-sizing: border-box;
            }
            
            #log-box { 
                background: rgba(9, 13, 22, 0.85); 
                border: 1px solid rgba(255, 255, 255, 0.08); 
                border-radius: 10px; 
                padding: 12px; 
                height: 260px; 
                overflow-y: auto; 
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; 
                font-size: 11px; 
                color: #34d399; 
                line-height: 1.6; 
            }
            .log-err { color: #f87171; }
            .log-info { color: #60a5fa; }
            .log-warn { color: #fbbf24; }
            #status-text { font-weight: 600; color: #38bdf8; width: 100%; margin-top: 4px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header-bar">
                <h1>📡 GA4 選擇性發送控制台 (前端直連)</h1>
                <div class="date-badge" id="current-date">--</div>
            </div>
            <p>請勾選要發送的目標連結：</p>
            
            <div class="actions">
                <button type="button" class="btn-secondary" onclick="toggleAll(true)">全選</button>
                <button type="button" class="btn-secondary" onclick="toggleAll(false)">全不選</button>
                <button type="button" class="btn-danger" onclick="resetDailyCounts()">重置今日計數</button>
                <div class="total-count-badge" id="daily-total-badge">當日已發送總次數: 0 次</div>
            </div>

            <div class="grid-box">
                ${checkboxesHtml}
            </div>

            <div class="auto-panel">
                <div class="ip-box">
                    <div>
                        <span>🌐 當前裝置 IP: </span>
                        <span id="current-ip" style="font-weight: 700;">抓取中...</span>
                    </div>
                    <button type="button" class="btn-secondary" style="padding: 4px 10px; font-size: 11px;" onclick="fetchCurrentIp()">重新整理</button>
                </div>
                <label>
                    <input type="checkbox" id="auto-repeat-chk" class="custom-checkbox">
                    啟用自動重複發送
                </label>
                <label>
                    間隔 (秒): 
                    <input type="number" id="interval-sec" value="20" min="20">
                </label>
                <label>
                    重複次數: 
                    <input type="number" id="repeat-count" value="5" min="1">
                </label>
                <div id="status-text"></div>
            </div>

            <div style="display: flex; gap: 10px;">
                <button type="button" id="start-btn" style="width: 100%;" onclick="handleStart()">單次發送 / 啟動自動重複</button>
                <button type="button" id="stop-btn" class="btn-stop" style="display: none; width: 100%;" onclick="stopAutoLoop()">停止自動發送</button>
            </div>
            
            <h3 style="font-size: 13px; margin: 16px 0 8px 0; color: #94a3b8; font-weight: 600;">即時執行日誌 (包含傳送參數)：</h3>
            <div id="log-box">等待開始執行...</div>
        </div>

        <script>
            var autoTimer = null;
            var countdownTimer = null;
            var isStopped = false;
            var currentRunCount = 0;
            var maxRuns = 1;
            var currentIpAddress = '未知 IP';
            var totalUrlCount = ${targetUrls.length};

            // 全域異步載入計數
            async function loadDailyCounts() {
                try {
                    var res = await fetch('/api/daily-counts');
                    var data = await res.json();
                    if (data.success) {
                        var dateEl = document.getElementById('current-date');
                        if (dateEl) dateEl.innerText = data.date;

                        var counts = data.counts || {};
                        var grandTotal = 0;

                        for (var i = 0; i < totalUrlCount; i++) {
                            var c = counts[i] || 0;
                            grandTotal += c;
                            var badge = document.getElementById('count-badge-' + i);
                            if (badge) badge.innerText = '已發送: ' + c + ' 次';
                        }

                        var totalBadge = document.getElementById('daily-total-badge');
                        if (totalBadge) totalBadge.innerText = '［全域］當日已發送總次數: ' + grandTotal + ' 次';
                    }
                } catch(e) {}
            }

            // 全域異步更新發送成功數
            async function incrementDailyCount(index) {
                try {
                    await fetch('/api/increment-count', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ index: index })
                    });
                    loadDailyCounts();
                } catch(e) {}
            }

            // 全域重置計數
            async function resetDailyCounts() {
                if (confirm('確定要清空今天的【全域】發送次數紀錄嗎？（所有設備都會歸零）')) {
                    try {
                        await fetch('/api/reset-counts', { method: 'POST' });
                        loadDailyCounts();
                    } catch(e) {}
                }
            }

            async function fetchCurrentIp() {
                var ipEl = document.getElementById('current-ip');
                try {
                    ipEl.innerText = '更新中...';
                    var res = await fetch('https://api.ipify.org?format=json');
                    var data = await res.json();
                    currentIpAddress = data.ip;
                    ipEl.innerText = currentIpAddress;
                } catch (e) {
                    currentIpAddress = '無法取得 IP';
                    ipEl.innerText = currentIpAddress;
                }
            }

            window.addEventListener('DOMContentLoaded', function() {
                fetchCurrentIp();
                loadDailyCounts();
                
                // 每 10 秒自動輪巡全域發送次數，確保各裝置畫面同步
                setInterval(loadDailyCounts, 10000);
            });

            function toggleAll(status) {
                var checkboxes = document.querySelectorAll('input[name="urlIndex"]');
                checkboxes.forEach(function(cb) { cb.checked = status; });
            }

            function updateStatus(msg, color) {
                var el = document.getElementById('status-text');
                el.innerText = msg;
                if (color) el.style.color = color;
            }

            function handleStart() {
                // 修復：啟動前先徹底清理舊 Timer，避免多重計時器並行
                stopAutoLoop();
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
                if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
                if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }

                updateStatus('🛑 已停止自動發送', '#f87171');
                document.getElementById('start-btn').style.display = 'inline-block';
                document.getElementById('stop-btn').style.display = 'none';
                document.getElementById('start-btn').disabled = false;
                document.getElementById('start-btn').innerText = '單次發送 / 啟動自動重複';
            }

            async function startNextLoop() {
                if (isStopped) return;
                
                // 修復：檢查發送次數是否已達上限
                if (currentRunCount >= maxRuns) {
                    var logBox = document.getElementById('log-box');
                    logBox.innerHTML += '<span class="log-warn">已達到設定的總重複次數 (' + maxRuns + ' 次)，自動停止任務。</span><br>';
                    logBox.scrollTop = logBox.scrollHeight;
                    stopAutoLoop();
                    return;
                }

                currentRunCount++;
                await executeTask();
                
                if (isStopped) return;

                var isAuto = document.getElementById('auto-repeat-chk').checked;
                if (!isAuto || currentRunCount >= maxRuns) {
                    if (currentRunCount >= maxRuns && isAuto) {
                        var logBox = document.getElementById('log-box');
                        logBox.innerHTML += '<span class="log-warn">已達到設定的總重複次數 (' + maxRuns + ' 次)，自動停止任務。</span><br>';
                        logBox.scrollTop = logBox.scrollHeight;
                    }
                    stopAutoLoop();
                    return;
                }

                var sec = parseInt(document.getElementById('interval-sec').value, 10) || 60;
                var remaining = sec;
                
                updateStatus('⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' + remaining + ' 秒', '#38bdf8');

                // 清除舊的倒數計時器
                if (countdownTimer) clearInterval(countdownTimer);
                
                countdownTimer = setInterval(function() {
                    if (isStopped) { clearInterval(countdownTimer); return; }
                    remaining--;
                    if (remaining > 0) {
                        updateStatus('⏱️ 第 (' + currentRunCount + '/' + maxRuns + ') 次完成，下一次發送倒數: ' + remaining + ' 秒', '#38bdf8');
                    } else {
                        clearInterval(countdownTimer);
                    }
                }, 1000);

                // 清除舊的定時器
                if (autoTimer) clearTimeout(autoTimer);
                
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
                checkboxes.forEach(function(cb) { selectedIndexes.push(parseInt(cb.value, 10)); });

                if (selectedIndexes.length === 0) {
                    alert('請至少勾選一個連結！');
                    stopAutoLoop();
                    return;
                }

                btn.disabled = true;
                var isAuto = document.getElementById('auto-repeat-chk').checked;
                var runTag = isAuto ? ' [第 ' + currentRunCount + '/' + maxRuns + ' 輪]' : '';
                
                await fetchCurrentIp();

                updateStatus('⏳ ' + runTag + ' 數據發送中...', '#f59e0b');
                logBox.innerHTML += '<br><span class="log-info">[' + new Date().toLocaleTimeString() + ']' + runTag + ' 開始發送選中的 ' + selectedIndexes.length + ' 筆資料... (當前來源 IP: ' + currentIpAddress + ')</span><br>';

                try {
                    var res = await fetch('/run-task', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ indexes: selectedIndexes })
                    });
                    
                    var data = await res.json();

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

                                // 發送成功後同步更新全域計數
                                await incrementDailyCount(selectedIndexes[i]);

                                var paramLogHtml = '<div style="color: #64748b; font-size: 11px; padding-left: 20px; margin-bottom: 6px;">' +
                                  '↳ <b>[發送來源 IP]</b> ' + currentIpAddress + '<br>' +
                                  '↳ <b>[核心識別參數]</b> <b>tid:</b> ' + item.params.tid + ' | <b>cid:</b> ' + item.params.cid + ' | <b>sid:</b> ' + item.params.sid + ' | <b>_fv:</b> ' + item.params._fv + '<br>' +
                                  '<span style="padding-left: 20px;"><b>UTM 歸因:</b> source=' + (item.params.cs||'none') + ' | medium=' + (item.params.cm||'none') + ' | campaign=' + (item.params.cn||'none') + '</span><br>' +
                                  '<span style="padding-left: 20px;"><b>Consent Mode:</b> gcs=' + item.params.gcs + ' | gcd=' + item.params.gcd + '</span><br>' +
                                  '<span style="padding-left: 20px;"><b>dt:</b> ' + item.params.dt + '</span><br>' +
                                  '<span style="padding-left: 20px;"><b>dl:</b> ' + item.params.dl + '</span>' +
                                '</div>';

                                logBox.innerHTML += '<span style="color: #34d399;">[成功] (' + (i + 1) + '/' + data.items.length + ') ' + item.name + ' 已送達</span><br>' + paramLogHtml;
                            } catch (sendErr) {
                                logBox.innerHTML += '<span style="color: #f87171;">[失敗] (' + (i + 1) + '/' + data.items.length + ') ' + item.name + ' 失敗: ' + sendErr.message + '</span><br>';
                            }

                            logBox.scrollTop = logBox.scrollHeight;

                            if (i < data.items.length - 1) {
                                var delayMs = Math.floor(Math.random() * 5000) + 5000;
                                await new Promise(function(resolve) { setTimeout(resolve, delayMs); });
                            }
                        }
                    }
                } catch (err) {
                    logBox.innerHTML += '<span class="log-err">執行發生錯誤: ' + err.message + '</span><br>';
                } finally {
                    if (!isAuto && !isStopped) {
                        btn.disabled = false;
                        btn.innerText = '單次發送 / 啟動自動重複';
                        updateStatus('✅ 發送完畢', '#34d399');
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
    const selectedIndexes = (req.body && Array.isArray(req.body.indexes)) ? req.body.indexes : [];

    if (selectedIndexes.length === 0) {
      return res.status(400).json({ success: false, message: '未收到有效的選取索引。' });
    }

    const items = selectedIndexes.map(targetIndex => {
      const target = targetUrls[targetIndex];
      if (!target) return null;

      const uniqueClientId = Math.floor(Math.random() * 899999999 + 100000000) + '.' + Math.floor(Math.random() * 899999999 + 100000000);
      const engagementTimeMs = Math.floor(Math.random() * 5000) + 10000;

      let utmSource = '';
      let utmMedium = '';
      let utmCampaign = '';

      try {
        const parsedUrl = new URL(target.url);
        utmSource = parsedUrl.searchParams.get('utm_source') || '';
        utmMedium = parsedUrl.searchParams.get('utm_medium') || '';
        utmCampaign = parsedUrl.searchParams.get('utm_campaign') || '';
      } catch (e) {}

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
          dl: target.url,
          dt: target.dt,
          en: 'page_view',
          cs: utmSource,
          cm: utmMedium,
          cn: utmCampaign
        }
      };
    }).filter(Boolean);

    res.json({ success: true, items });
  } catch (globalErr) {
    res.status(500).json({ success: false, message: globalErr.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`UI 介面已啟動！請在瀏覽器開啟: http://localhost:${PORT}`);
});
