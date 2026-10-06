// Tiny YAML highlighter for <code class="language-yaml"> blocks. No dependencies.
// Without JavaScript the blocks stay readable, just uncoloured.
(function () {
  "use strict";

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function span(cls, s) {
    return '<span class="y-' + cls + '">' + esc(s) + "</span>";
  }

  // A plain word ends at whitespace, a flow character, a quote, a comment, or a ":" that is
  // followed by space, end of line or a closing flow character (that colon belongs to a key).
  function readWord(line, i) {
    var j = i;
    while (j < line.length) {
      var c = line[j];
      if (/\s/.test(c) || ",[]{}#\"'".indexOf(c) !== -1) break;
      if (c === ":" && (j + 1 >= line.length || /[\s,\]}]/.test(line[j + 1]))) break;
      j++;
    }
    return j;
  }

  function highlightLine(line) {
    var out = "";
    var i = 0;
    while (i < line.length) {
      var c = line[i];

      if (/\s/.test(c)) {
        out += c;
        i++;
      } else if (c === "#" && (i === 0 || /\s/.test(line[i - 1]))) {
        out += span("c", line.slice(i));
        i = line.length;
      } else if (c === '"' || c === "'") {
        var j = i + 1;
        while (j < line.length && line[j] !== c) {
          if (c === '"' && line[j] === "\\") j++;
          j++;
        }
        j = Math.min(j + 1, line.length);
        out += span("s", line.slice(i, j));
        i = j;
      } else if ("[]{},".indexOf(c) !== -1 || c === ":") {
        out += span("p", c);
        i++;
      } else if (c === "-" && /\s/.test(line[i + 1] || " ") && /^\s*$/.test(line.slice(0, i))) {
        out += span("p", c);
        i++;
      } else {
        var end = readWord(line, i);
        if (end === i) end = i + 1; // never stall on an unexpected character
        var word = line.slice(i, end);
        var isKey = line[end] === ":" && (end + 1 >= line.length || /[\s,\]}]/.test(line[end + 1]));
        if (isKey) out += span("k", word);
        else if (/^-?\d+(\.\d+)?[a-z]{0,2}$/.test(word)) out += span("n", word);
        else if (/^(true|false|null|~)$/.test(word)) out += span("b", word);
        else out += esc(word);
        i = end;
      }
    }
    return out;
  }

  function run() {
    var blocks = document.querySelectorAll("code.language-yaml");
    for (var b = 0; b < blocks.length; b++) {
      var lines = blocks[b].textContent.split("\n");
      blocks[b].innerHTML = lines.map(highlightLine).join("\n");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
