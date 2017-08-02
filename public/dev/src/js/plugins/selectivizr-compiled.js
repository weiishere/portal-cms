/*
selectivizr v1.0.0 - (c) Keith Clark, freely distributable under the terms of the MIT license.
selectivizr.com
*/
(function (x) {
  function K(a) {
    return a.replace(L, o).replace(M, function (b, e, c) {
      b = c.split(",");c = 0;for (var g = b.length; c < g; c++) {
        var j = N(b[c].replace(O, o).replace(P, o)) + t,
            f = [];b[c] = j.replace(Q, function (d, k, l, i, h) {
          if (k) {
            if (f.length > 0) {
              d = f;var u;h = j.substring(0, h).replace(R, n);if (h == n || h.charAt(h.length - 1) == t) h += "*";try {
                u = v(h);
              } catch (da) {}if (u) {
                h = 0;for (l = u.length; h < l; h++) {
                  i = u[h];for (var y = i.className, z = 0, S = d.length; z < S; z++) {
                    var q = d[z];if (!RegExp("(^|\\s)" + q.className + "(\\s|$)").test(i.className)) if (q.b && (q.b === true || q.b(i) === true)) y = A(y, q.className, true);
                  }i.className = y;
                }
              }f = [];
            }return k;
          } else {
            if (k = l ? T(l) : !B || B.test(i) ? { className: C(i), b: true } : null) {
              f.push(k);return "." + k.className;
            }return d;
          }
        });
      }return e + b.join(",");
    });
  }function T(a) {
    var b = true,
        e = C(a.slice(1)),
        c = a.substring(0, 5) == ":not(",
        g,
        j;if (c) a = a.slice(5, -1);var f = a.indexOf("(");if (f > -1) a = a.substring(0, f);if (a.charAt(0) == ":") switch (a.slice(1)) {case "root":
        b = function (d) {
          return c ? d != D : d == D;
        };break;case "target":
        if (p == 8) {
          b = function (d) {
            function k() {
              var l = location.hash,
                  i = l.slice(1);return c ? l == "" || d.id != i : l != "" && d.id == i;
            }x.attachEvent("onhashchange", function () {
              r(d, e, k());
            });return k();
          };break;
        }return false;case "checked":
        b = function (d) {
          U.test(d.type) && d.attachEvent("onpropertychange", function () {
            event.propertyName == "checked" && r(d, e, d.checked !== c);
          });return d.checked !== c;
        };break;case "disabled":
        c = !c;case "enabled":
        b = function (d) {
          if (V.test(d.tagName)) {
            d.attachEvent("onpropertychange", function () {
              event.propertyName == "$disabled" && r(d, e, d.a === c);
            });w.push(d);d.a = d.disabled;return d.disabled === c;
          }return a == ":enabled" ? c : !c;
        };break;case "focus":
        g = "focus";j = "blur";case "hover":
        if (!g) {
          g = "mouseenter";j = "mouseleave";
        }b = function (d) {
          d.attachEvent("on" + (c ? j : g), function () {
            r(d, e, true);
          });d.attachEvent("on" + (c ? g : j), function () {
            r(d, e, false);
          });return c;
        };break;default:
        if (!W.test(a)) return false;break;}return { className: e, b: b };
  }function C(a) {
    return E + "-" + (p == 6 && X ? Y++ : a.replace(Z, function (b) {
      return b.charCodeAt(0);
    }));
  }function N(a) {
    return a.replace(F, o).replace($, t);
  }function r(a, b, e) {
    var c = a.className;b = A(c, b, e);if (b != c) {
      a.className = b;a.parentNode.className += n;
    }
  }function A(a, b, e) {
    var c = RegExp("(^|\\s)" + b + "(\\s|$)"),
        g = c.test(a);return e ? g ? a : a + t + b : g ? a.replace(c, o).replace(F, o) : a;
  }function G(a, b) {
    if (/^https?:\/\//i.test(a)) return b.substring(0, b.indexOf("/", 8)) == a.substring(0, a.indexOf("/", 8)) ? a : null;if (a.charAt(0) == "/") return b.substring(0, b.indexOf("/", 8)) + a;var e = b.split("?")[0];if (a.charAt(0) != "?" && e.charAt(e.length - 1) != "/") e = e.substring(0, e.lastIndexOf("/") + 1);return e + a;
  }function H(a) {
    if (a) {
      s.open("GET", a, false);s.send();return (s.status == 200 ? s.responseText : n).replace(aa, n).replace(ba, function (b, e, c) {
        return H(G(c, a));
      });
    }return n;
  }function ca() {
    var a, b;a = m.getElementsByTagName("BASE");for (var e = a.length > 0 ? a[0].href : m.location.href, c = 0; c < m.styleSheets.length; c++) {
      b = m.styleSheets[c];if (b.href != n) if (a = G(b.href, e)) b.cssText = K(H(a));
    }w.length > 0 && setInterval(function () {
      for (var g = 0, j = w.length; g < j; g++) {
        var f = w[g];if (f.disabled !== f.a) if (f.disabled) {
          f.disabled = false;f.a = true;f.disabled = true;
        } else f.a = f.disabled;
      }
    }, 250);
  }if (! /*@cc_on!@*/true) {
    var m = document,
        D = m.documentElement,
        s = function () {
      if (x.XMLHttpRequest) return new XMLHttpRequest();try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (a) {
        return null;
      }
    }(),
        p = /MSIE ([\d])/.exec(navigator.userAgent)[1];if (!(m.compatMode != "CSS1Compat" || p < 6 || p > 8 || !s)) {
      var I = { NW: "*.Dom.select", DOMAssistant: "*.$", Prototype: "$$", YAHOO: "*.util.Selector.query", MooTools: "$$", Sizzle: "*", jQuery: "*", dojo: "*.query" },
          v,
          w = [],
          Y = 0,
          X = true,
          E = "slvzr",
          J = E + "DOMReady",
          aa = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,
          ba = /@import\s*url\(\s*(["'])?(.*?)\1\s*\)[\w\W]*?;/g,
          W = /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,
          L = /:(:first-(?:line|letter))/g,
          M = /(^|})\s*([^\{]*?[\[:][^{]+)/g,
          Q = /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,
          R = /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,
          Z = /[^\w-]/g,
          V = /^(INPUT|SELECT|TEXTAREA|BUTTON)$/,
          U = /^(checkbox|radio)$/,
          B = p == 8 ? /[\$\^]=(['"])\1/ : p == 7 ? /[\$\^*]=(['"])\1/ : null,
          O = /([(\[+~])\s+/g,
          P = /\s+([)\]+~])/g,
          $ = /\s+/g,
          F = /^\s*((?:[\S\s]*\S)?)\s*$/,
          n = "",
          t = " ",
          o = "$1";m.write("<script id=" + J + " defer src='//:'><\/script>");m.getElementById(J).onreadystatechange = function () {
        if (this.readyState == "complete") {
          a: {
            var a;for (var b in I) if (x[b] && (a = eval(I[b].replace("*", b)))) {
              v = a;break a;
            }v = false;
          }if (v) {
            ca();this.parentNode.removeChild(this);
          }
        }
      };
    }
  }
})(this);

//# sourceMappingURL=selectivizr-compiled.js.map