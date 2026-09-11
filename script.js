/**
 * URL Encoder & Decoder - Client-Side Interactive Engine
 * Author: bordia98
 * 100% Privacy Friendly - Zero Server Requests
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Management (Default Light, Persistent via LocalStorage)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'light';
  root.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    showToast(`Switched to ${nextTheme} theme`);
  });

  // --------------------------------------------------------------------------
  // 2. Toast Notifications
  // --------------------------------------------------------------------------
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2400);
  }

  // --------------------------------------------------------------------------
  // 3. Tab Switching
  // --------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(`tab-${btn.dataset.tab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 4. Quick Convert Tab Logic
  // --------------------------------------------------------------------------
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const encodeBtn = document.getElementById('encodeBtn');
  const decodeBtn = document.getElementById('decodeBtn');
  const swapBtn = document.getElementById('swapBtn');
  const clearInputBtn = document.getElementById('clearInputBtn');
  const sampleInputBtn = document.getElementById('sampleInputBtn');
  const copyOutputBtn = document.getElementById('copyOutputBtn');
  const inputStats = document.getElementById('inputStats');
  const outputStats = document.getElementById('outputStats');
  const statusMessage = document.getElementById('statusMessage');
  const liveMode = document.getElementById('liveMode');
  const spacePlus = document.getElementById('spacePlus');
  const encodeModeRadios = document.querySelectorAll('input[name="encodeMode"]');

  const textEncoder = new TextEncoder();

  function updateStats(str, el) {
    if (!el) return;
    const charCount = str.length;
    const byteCount = textEncoder.encode(str).length;
    el.textContent = `${charCount.toLocaleString()} chars | ${byteCount.toLocaleString()} bytes`;
  }

  function getEncodeMode() {
    const checked = document.querySelector('input[name="encodeMode"]:checked');
    return checked ? checked.value : 'component';
  }

  function performEncode() {
    const raw = inputText.value;
    if (!raw) {
      outputText.value = '';
      updateStats('', outputStats);
      setStatus('Ready', 'normal');
      return;
    }

    try {
      let encoded = '';
      const mode = getEncodeMode();

      if (mode === 'component') {
        encoded = encodeURIComponent(raw);
        // RFC 3986 safe character enhancements
        encoded = encoded.replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
      } else {
        encoded = encodeURI(raw);
      }

      if (spacePlus.checked) {
        encoded = encoded.replace(/%20/g, '+');
      }

      outputText.value = encoded;
      updateStats(encoded, outputStats);
      setStatus('Successfully encoded', 'success');
    } catch (err) {
      outputText.value = '';
      setStatus(`Encode error: ${err.message}`, 'error');
    }
  }

  function performDecode() {
    const raw = inputText.value;
    if (!raw) {
      outputText.value = '';
      updateStats('', outputStats);
      setStatus('Ready', 'normal');
      return;
    }

    try {
      let candidate = raw;
      if (spacePlus.checked) {
        candidate = candidate.replace(/\+/g, ' ');
      }

      const mode = getEncodeMode();
      let decoded = '';
      if (mode === 'component') {
        decoded = decodeURIComponent(candidate);
      } else {
        decoded = decodeURI(candidate);
      }

      outputText.value = decoded;
      updateStats(decoded, outputStats);
      setStatus('Successfully decoded', 'success');
    } catch (err) {
      outputText.value = '';
      setStatus(`Decode error: ${err.message}. Input may have invalid percent sequences.`, 'error');
    }
  }

  function setStatus(msg, type = 'normal') {
    if (!statusMessage) return;
    statusMessage.textContent = msg;
    statusMessage.className = 'status-msg ' + (type === 'error' ? 'error' : type === 'success' ? 'success' : '');
  }

  // Live input handler
  inputText.addEventListener('input', () => {
    updateStats(inputText.value, inputStats);
    if (liveMode.checked) {
      performEncode();
    }
  });

  encodeBtn.addEventListener('click', performEncode);
  decodeBtn.addEventListener('click', performDecode);

  swapBtn.addEventListener('click', () => {
    const temp = inputText.value;
    inputText.value = outputText.value;
    outputText.value = temp;
    updateStats(inputText.value, inputStats);
    updateStats(outputText.value, outputStats);
    showToast('Swapped input and output');
  });

  clearInputBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    updateStats('', inputStats);
    updateStats('', outputStats);
    setStatus('Ready', 'normal');
    inputText.focus();
  });

  sampleInputBtn.addEventListener('click', () => {
    inputText.value = 'https://api.example.com/v1/search?query=hello world&filter=user:bordia98&tag=AI & Tools&status=active#results';
    updateStats(inputText.value, inputStats);
    performEncode();
    showToast('Loaded sample URL');
  });

  copyOutputBtn.addEventListener('click', async () => {
    if (!outputText.value) {
      showToast('Nothing to copy!');
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText.value);
      showToast('Copied output to clipboard!');
    } catch {
      outputText.select();
      document.execCommand('copy');
      showToast('Copied to clipboard!');
    }
  });

  encodeModeRadios.forEach(r => {
    r.addEventListener('change', () => {
      if (liveMode.checked && inputText.value) performEncode();
    });
  });

  spacePlus.addEventListener('change', () => {
    if (liveMode.checked && inputText.value) performEncode();
  });

  // --------------------------------------------------------------------------
  // 5. Query Parameter Editor Tab Logic
  // --------------------------------------------------------------------------
  const paramFullUrl = document.getElementById('paramFullUrl');
  const loadParamSampleBtn = document.getElementById('loadParamSampleBtn');
  const compProtocol = document.getElementById('compProtocol');
  const compHost = document.getElementById('compHost');
  const compPath = document.getElementById('compPath');
  const compHash = document.getElementById('compHash');
  const paramCount = document.getElementById('paramCount');
  const paramsTableBody = document.getElementById('paramsTableBody');
  const addParamRowBtn = document.getElementById('addParamRowBtn');
  const assembledUrl = document.getElementById('assembledUrl');
  const copyAssembledBtn = document.getElementById('copyAssembledBtn');

  let currentParsedUrl = null;
  let queryParamsList = []; // array of { key: string, value: string }

  function parseAndRenderUrl() {
    const raw = paramFullUrl.value.trim();
    if (!raw) {
      compProtocol.textContent = '-';
      compHost.textContent = '-';
      compPath.textContent = '-';
      compHash.textContent = '-';
      paramCount.textContent = '0';
      queryParamsList = [];
      renderParamsTable();
      assembledUrl.value = '';
      return;
    }

    try {
      // Support relative or absolute URLs
      let urlObj;
      if (raw.startsWith('http://') || raw.startsWith('https://')) {
        urlObj = new URL(raw);
      } else {
        urlObj = new URL(raw, 'https://example.com');
      }

      currentParsedUrl = urlObj;
      compProtocol.textContent = urlObj.protocol || '-';
      compHost.textContent = urlObj.host || '-';
      compPath.textContent = urlObj.pathname || '-';
      compHash.textContent = urlObj.hash || '-';

      queryParamsList = [];
      urlObj.searchParams.forEach((val, key) => {
        queryParamsList.push({ key, value: val });
      });

      renderParamsTable();
      reconstructUrl();
    } catch {
      compProtocol.textContent = 'Invalid URL';
      compHost.textContent = '-';
      compPath.textContent = '-';
      compHash.textContent = '-';
    }
  }

  function renderParamsTable() {
    paramCount.textContent = queryParamsList.length;
    paramsTableBody.innerHTML = '';

    if (queryParamsList.length === 0) {
      paramsTableBody.innerHTML = `
        <tr>
          <td colspan="3" class="empty-state">No query parameters found. Enter a URL above or click "+ Add Parameter".</td>
        </tr>
      `;
      return;
    }

    queryParamsList.forEach((param, index) => {
      const tr = document.createElement('tr');

      const tdKey = document.createElement('td');
      const inputKey = document.createElement('input');
      inputKey.type = 'text';
      inputKey.className = 'table-input';
      inputKey.value = param.key;
      inputKey.placeholder = 'key';
      inputKey.addEventListener('input', (e) => {
        queryParamsList[index].key = e.target.value;
        reconstructUrl();
      });
      tdKey.appendChild(inputKey);

      const tdVal = document.createElement('td');
      const inputVal = document.createElement('input');
      inputVal.type = 'text';
      inputVal.className = 'table-input';
      inputVal.value = param.value;
      inputVal.placeholder = 'value';
      inputVal.addEventListener('input', (e) => {
        queryParamsList[index].value = e.target.value;
        reconstructUrl();
      });
      tdVal.appendChild(inputVal);

      const tdAction = document.createElement('td');
      tdAction.style.textAlign = 'center';
      const delBtn = document.createElement('button');
      delBtn.className = 'btn-del-row';
      delBtn.textContent = '✕ Remove';
      delBtn.title = 'Remove parameter';
      delBtn.addEventListener('click', () => {
        queryParamsList.splice(index, 1);
        renderParamsTable();
        reconstructUrl();
      });
      tdAction.appendChild(delBtn);

      tr.appendChild(tdKey);
      tr.appendChild(tdVal);
      tr.appendChild(tdAction);
      paramsTableBody.appendChild(tr);
    });
  }

  function reconstructUrl() {
    if (!currentParsedUrl) return;
    try {
      const url = new URL(currentParsedUrl.origin + currentParsedUrl.pathname);
      queryParamsList.forEach(p => {
        if (p.key.trim()) {
          url.searchParams.append(p.key.trim(), p.value);
        }
      });
      if (currentParsedUrl.hash) {
        url.hash = currentParsedUrl.hash;
      }
      assembledUrl.value = url.toString();
    } catch {
      // Fallback manual query string concatenation
      const qs = queryParamsList
        .filter(p => p.key.trim())
        .map(p => `${encodeURIComponent(p.key.trim())}=${encodeURIComponent(p.value)}`)
        .join('&');
      assembledUrl.value = (paramFullUrl.value.split('?')[0] || '') + (qs ? '?' + qs : '');
    }
  }

  paramFullUrl.addEventListener('input', parseAndRenderUrl);

  addParamRowBtn.addEventListener('click', () => {
    queryParamsList.push({ key: '', value: '' });
    renderParamsTable();
    const rows = paramsTableBody.querySelectorAll('tr');
    const lastRow = rows[rows.length - 1];
    if (lastRow) {
      const firstInput = lastRow.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  });

  loadParamSampleBtn.addEventListener('click', () => {
    paramFullUrl.value = 'https://search.engine.org/explore?q=javascript+url+encoding&sort=relevance&limit=25&page=1&safe=true#preview';
    parseAndRenderUrl();
    showToast('Loaded sample URL with parameters');
  });

  copyAssembledBtn.addEventListener('click', async () => {
    if (!assembledUrl.value) {
      showToast('No assembled URL to copy');
      return;
    }
    try {
      await navigator.clipboard.writeText(assembledUrl.value);
      showToast('Copied assembled URL to clipboard!');
    } catch {
      assembledUrl.select();
      document.execCommand('copy');
      showToast('Copied URL to clipboard!');
    }
  });

  // --------------------------------------------------------------------------
  // 6. Base64 URL Safe Tab Logic
  // --------------------------------------------------------------------------
  const b64Input = document.getElementById('b64Input');
  const b64Output = document.getElementById('b64Output');
  const b64EncodeBtn = document.getElementById('b64EncodeBtn');
  const b64DecodeBtn = document.getElementById('b64DecodeBtn');
  const b64ClearBtn = document.getElementById('b64ClearBtn');
  const b64CopyBtn = document.getElementById('b64CopyBtn');

  function toBase64Url(str) {
    // Unicode safe base64 encoding
    const utf8Bytes = new TextEncoder().encode(str);
    let binary = '';
    utf8Bytes.forEach(b => { binary += String.fromCharCode(b); });
    const b64 = btoa(binary);
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function fromBase64Url(b64url) {
    let b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4 !== 0) {
      b64 += '=';
    }
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  }

  b64EncodeBtn.addEventListener('click', () => {
    const val = b64Input.value;
    if (!val) {
      b64Output.value = '';
      return;
    }
    try {
      b64Output.value = toBase64Url(val);
      showToast('Base64 URL-safe encoded!');
    } catch (e) {
      b64Output.value = `Error: ${e.message}`;
    }
  });

  b64DecodeBtn.addEventListener('click', () => {
    const val = b64Input.value.trim();
    if (!val) {
      b64Output.value = '';
      return;
    }
    try {
      b64Output.value = fromBase64Url(val);
      showToast('Base64 URL-safe decoded!');
    } catch (e) {
      b64Output.value = `Error: Invalid Base64URL string (${e.message})`;
    }
  });

  b64ClearBtn.addEventListener('click', () => {
    b64Input.value = '';
    b64Output.value = '';
    b64Input.focus();
  });

  b64CopyBtn.addEventListener('click', async () => {
    if (!b64Output.value) {
      showToast('Nothing to copy!');
      return;
    }
    try {
      await navigator.clipboard.writeText(b64Output.value);
      showToast('Copied Base64 string to clipboard!');
    } catch {
      b64Output.select();
      document.execCommand('copy');
      showToast('Copied to clipboard!');
    }
  });

  // Initialize with blank stats
  updateStats('', inputStats);
  updateStats('', outputStats);
});
