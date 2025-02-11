// Inspired by this, but significantly edited: https://phuoc.ng/collection/html-dom/allow-to-enter-particular-characters-only/
// TODO: Check this: https://jssecrets.com/how-to-prevent-character-input-javascript/
export function inputLimit(event, pattern) {
  const input = event.data;
  const target = event.currentTarget;
  const currentValue = target.value;

  if (input !== null) {
    const cursorAfter = target.selectionStart;
    const cursorBefore = cursorAfter - input.length;

    let textPieces = {};
    textPieces.before = currentValue.substring(0, cursorBefore);
    textPieces.between = currentValue.substring(cursorBefore, cursorAfter);
    textPieces.after = currentValue.substring(cursorAfter, currentValue.length);
    textPieces.previous = textPieces.before + textPieces.after;

    // TODO: Figure out test(). I feel like there's something wrong with it.
    pattern.test(input)
      ? (target.value = target.value)
      : (target.value = textPieces.previous);
    pattern.test(input)
      ? (null)
      : (target.selectionEnd = textPieces.before.length);
  }
}