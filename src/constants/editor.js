const EDITOR_PLACEHOLDER_JOURNAL = {
  content:
    "<h3>Hey👋, you can write your journal here!</h3>" +
    "<hr/><ul><li>You can write in <code>markdown</code></li>" +
    "<li>Some markdown shortcuts that can come in handy:</li><ul>" +
    "<li><code>__bold__</code> for bold text</li>" +
    "<li><code>_italic_</code> for italic text</li>" +
    "<li><code># Heading</code> for Heading</li>" +
    "<li><code>* Bullet</code> for Bullet</li>" +
    "<li><code>![alt text](image url)</code> for images</li>" +
    "<li><code>[link text](link url)</code> for links</li>" +
    "<li><code>> Quote</code> for > Quote</li>" +
    "<li><code>---</code> for horizontal rule</li>" +
    "<li><code>```code```</code> for `code`</li>" +
    "</ul>" +
    "<li>Or you can use the menubar</li></ul>" +
    "<img src='https://images.unsplash.com/photo-1610385983585-8ea728f572a7' alt='menubar' />",
  journalType: "daily",
  title: "Test Journal",
};

const HEADING_LEVELS = [1, 2, 3, 4];

const ALL_TOOLBAR_ACTIONS = [
  "bold",
  "italic",
  "code",
  "paragraph",
  "bulletList",
  "image",
  ...HEADING_LEVELS.map((level) => `heading${level}`),
]

export { EDITOR_PLACEHOLDER_JOURNAL, HEADING_LEVELS, ALL_TOOLBAR_ACTIONS };
