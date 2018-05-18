let aceEditor;

export function editor() {
  aceEditor = ace.edit("editor");

  // editor.setValue("");

  aceEditor.setTheme("ace/theme/github");
  let PhpMode = ace.require("ace/mode/php").Mode;
  aceEditor.session.setMode(new PhpMode());

  let langTools = ace.require("ace/ext/language_tools");

  aceEditor.setOptions({
    animatedScroll: false,
    autoScrollEditorIntoView: undefined,
    behavioursEnabled: true,
    copyWithEmptySelection: false,
    cursorStyle: "ace",
    displayIndentGuides: true,
    dragDelay: 150,
    dragEnabled: true,
    enableBasicAutocompletion: true,
    enableBlockSelect: true,
    enableEmmet: true,
    enableLiveAutocompletion: true,
    enableMultiselect: true,
    enableSnippets: true,
    fadeFoldWidgets: false,
    firstLineNumber: 1,
    fixedWidthGutter: undefined,
    focusTimeout: 0,
    foldStyle: "markbegin",
    fontFamily: undefined,
    hScrollBarAlwaysVisible: false,
    hasCssTransforms: undefined,
    highlightActiveLine: true,
    highlightGutterLine: true,
    highlightSelectedWord: true,
    indentedSoftWrap: true,
    keyboardHandler: undefined,
    loadDroppedFile: true,
    maxLines: undefined,
    maxPixelHeight: 0,
    mergeUndoDeltas: true,
    minLines: undefined,
    mode: "ace/mode/php",
    navigateWithinSoftTabs: false,
    newLineMode: "auto",
    overwrite: false,
    printMargin: 80,
    printMarginColumn: 80,
    readOnly: false,
    scrollPastEnd: 0,
    scrollSpeed: 2,
    selectionStyle: "line",
    showFoldWidgets: true,
    showGutter: true,
    showInvisibles: false,
    showLineNumbers: true,
    showPrintMargin: true,
    showTokenInfo: false,
    spellcheck: true,
    tabSize: 2,
    theme: "ace/theme/github",
    tooltipFollowsMouse: true,
    useElasticTabstops: undefined,
    useIncrementalSearch: undefined,
    useSoftTabs: true,
    useWorker: true,
    vScrollBarAlwaysVisible: false,
    wrap: "off",
    wrapBehavioursEnabled: true,
  });

  let drupalCompletions = [
    '\\Drupal::setContainer',
    '\\Drupal::unsetContainer',
    '\\Drupal::getContainer',
    '\\Drupal::hasContainer',
    '\\Drupal::service',
    '\\Drupal::hasService',
    '\\Drupal::root',
    '\\Drupal::installProfile',
    '\\Drupal::hasRequest',
    '\\Drupal::request',
    '\\Drupal::requestStack',
    '\\Drupal::routeMatch',
    '\\Drupal::currentUser',
    '\\Drupal::entityManager',
    '\\Drupal::entityTypeManager',
    '\\Drupal::database',
    '\\Drupal::cache',
    '\\Drupal::classResolver',
    '\\Drupal::keyValueExpirable',
    '\\Drupal::lock',
    '\\Drupal::config',
    '\\Drupal::configFactory',
    '\\Drupal::queue',
    '\\Drupal::keyValue',
    '\\Drupal::state',
    '\\Drupal::httpClient',
    '\\Drupal::entityQuery',
    '\\Drupal::entityQueryAggregate',
    '\\Drupal::flood',
    '\\Drupal::moduleHandler',
    '\\Drupal::typedDataManager',
    '\\Drupal::token',
    '\\Drupal::urlGenerator',
    '\\Drupal::url',
    '\\Drupal::linkGenerator',
    '\\Drupal::l',
    '\\Drupal::translation',
    '\\Drupal::languageManager',
    '\\Drupal::csrfToken',
    '\\Drupal::transliteration',
    '\\Drupal::formBuilder',
    '\\Drupal::theme',
    '\\Drupal::isConfigSyncing',
    '\\Drupal::logger',
    '\\Drupal::menuTree',
    '\\Drupal::pathValidator',
    '\\Drupal::accessManager',
    '\\Drupal::destination',
    '\\Drupal::entityDefinitionUpdateManager',
    '\\Drupal::time',
    '\\Drupal::messenger',
    '\\Drupal\\node\\Entity\\Node::preDelete',
    '\\Drupal\\node\\Entity\\Node::postDelete',
    '\\Drupal\\node\\Entity\\Node::baseFieldDefinitions',
    '\\Drupal\\node\\Entity\\Node::getCurrentUserId',
    '\\Drupal\\node\\Entity\\Node::bundleFieldDefinitions',
    '\\Drupal\\node\\Entity\\Node::preCreate',
    '\\Drupal\\node\\Entity\\Node::postLoad',
    '\\Drupal\\node\\Entity\\Node::load',
    '\\Drupal\\node\\Entity\\Node::loadMultiple',
    '\\Drupal\\node\\Entity\\Node::create',
    '\\Drupal\\node\\Entity\\Node::invalidateTagsOnDelete',
    '\\Drupal\\node\\Entity\\Node::publishedBaseFieldDefinitions',
    '\\Drupal\\node\\Entity\\Node::revisionLogBaseFieldDefinitions',
    '\\Drupal\\node\\Entity\\Node::getRevisionMetadataKey',
    '\\Drupal\\taxonomy\\Entity\\Term::postDelete',
    '\\Drupal\\taxonomy\\Entity\\Term::baseFieldDefinitions',
    '\\Drupal\\taxonomy\\Entity\\Term::bundleFieldDefinitions',
    '\\Drupal\\taxonomy\\Entity\\Term::preCreate',
    '\\Drupal\\taxonomy\\Entity\\Term::preDelete',
    '\\Drupal\\taxonomy\\Entity\\Term::postLoad',
    '\\Drupal\\taxonomy\\Entity\\Term::load',
    '\\Drupal\\taxonomy\\Entity\\Term::loadMultiple',
    '\\Drupal\\taxonomy\\Entity\\Term::create',
    '\\Drupal\\taxonomy\\Entity\\Term::invalidateTagsOnDelete',
    '\\Drupal\\user\\Entity\\User::postDelete',
    '\\Drupal\\user\\Entity\\User::getAnonymousUser',
    '\\Drupal\\user\\Entity\\User::baseFieldDefinitions',
    '\\Drupal\\user\\Entity\\User::getAllowedTimezones',
    '\\Drupal\\user\\Entity\\User::getAllowedConfigurableLanguageCodes',
    '\\Drupal\\user\\Entity\\User::bundleFieldDefinitions',
    '\\Drupal\\user\\Entity\\User::preCreate',
    '\\Drupal\\user\\Entity\\User::preDelete',
    '\\Drupal\\user\\Entity\\User::postLoad',
    '\\Drupal\\user\\Entity\\User::load',
    '\\Drupal\\user\\Entity\\User::loadMultiple',
    '\\Drupal\\user\\Entity\\User::create',
    '\\Drupal\\user\\Entity\\User::invalidateTagsOnDelete',
    '\\Drupal\\file\\Entity\\File::preCreate',
    '\\Drupal\\file\\Entity\\File::preDelete',
    '\\Drupal\\file\\Entity\\File::baseFieldDefinitions',
    '\\Drupal\\file\\Entity\\File::bundleFieldDefinitions',
    '\\Drupal\\file\\Entity\\File::postDelete',
    '\\Drupal\\file\\Entity\\File::postLoad',
    '\\Drupal\\file\\Entity\\File::load',
    '\\Drupal\\file\\Entity\\File::loadMultiple',
    '\\Drupal\\file\\Entity\\File::create',
    '\\Drupal\\file\\Entity\\File::invalidateTagsOnDelete',
    '\\Drupal\\block_content\\Entity\\BlockContent::postDelete',
    '\\Drupal\\block_content\\Entity\\BlockContent::baseFieldDefinitions',
    '\\Drupal\\block_content\\Entity\\BlockContent::invalidateBlockPluginCache',
    '\\Drupal\\block_content\\Entity\\BlockContent::bundleFieldDefinitions',
    '\\Drupal\\block_content\\Entity\\BlockContent::preCreate',
    '\\Drupal\\block_content\\Entity\\BlockContent::preDelete',
    '\\Drupal\\block_content\\Entity\\BlockContent::postLoad',
    '\\Drupal\\block_content\\Entity\\BlockContent::load',
    '\\Drupal\\block_content\\Entity\\BlockContent::loadMultiple',
    '\\Drupal\\block_content\\Entity\\BlockContent::create',
    '\\Drupal\\block_content\\Entity\\BlockContent::invalidateTagsOnDelete',
    '\\Drupal\\block_content\\Entity\\BlockContent::publishedBaseFieldDefinitions',
    '\\Drupal\\block_content\\Entity\\BlockContent::revisionLogBaseFieldDefinitions',
    '\\Drupal\\block_content\\Entity\\BlockContent::getRevisionMetadataKey',
    '\\Drupal::entityTypeManager()->getStorage()->load()',
    '\\Drupal::entityTypeManager()->getViewBuilder()->view()'
  ];

  langTools.addCompleter({
    getCompletions: function(editor, session, pos, prefix, callback) {
      callback(null, drupalCompletions.map(function(function_name) {
        return { name: '', value: function_name, score: 1, meta: "" };
      }));
    }
  });

  let cry = function () {
    document.getElementById('editor').classList.add("cry");
  };

  document.addEventListener('keyup', function() {
    document.getElementById('editor').classList.remove("cry");
    clearTimeout(cry);
    setTimeout(cry, 300000);
  });

  document.getElementsByClassName('theme-light')[0].addEventListener('click', function(e) {
    e.preventDefault();
    aceEditor.setTheme("ace/theme/github");
  });

  document.getElementsByClassName('theme-dark')[0].addEventListener('click', function(e) {
    e.preventDefault();
    aceEditor.setTheme("ace/theme/twilight");
  });

}

export function resizeEditor() {
  setTimeout(function () {
      aceEditor.resize()
    }, 300
  );
}
