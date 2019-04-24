export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export const UA = window.navigator.userAgent.toLowerCase();
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));

export function copy(text) {
  const input = document.createElement('textarea');

  input.value = text;

  input.style.fontSize = '12pt';
  input.style.position = 'fixed';
  input.style.top = '0';
  input.style.left = '-9999px';
  input.style.width = '2em';
  input.style.height = '2em';
  input.style.margin = '0';
  input.style.padding = '0';
  input.style.border = 'none';
  input.style.outline = 'none';
  input.style.boxShadow = 'none';
  input.style.background = 'transparent';

  input.setAttribute('readonly', '');

  document.body.appendChild(input);

  if (isIOS) {
    input.contentEditable = 'true';
    input.readOnly = false;

    const range = document.createRange();
    range.selectNodeContents(input);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    input.setSelectionRange(0, 999999);
  }
  else {
    input.select();
  }

  const ret = document.execCommand('copy');

  input.blur();
  document.body.removeChild(input);

  return ret;
}
