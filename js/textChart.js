/**
 * @file
 * Class to draw a d3 visualization of text. Each word is colored accordint
 *
 * Each word is colored according to an score.
 */

TextChart = class TextChartClass {

  /**
   * Constructs a TextChart object.
   *
   * @constructor
   *
   * @param {array} words
   *   An array of arrays with the words and its weights. Each element is a
   *   object with at least the 'token' and 'attention' keys.
   *   It can have, optionally, a 'sentence' key with
   *   the paragraph number to introduce a break in the visualization
   * @param {object} opts
   *   Settings for the graph. The available options are height, lineHeight,
   *   linePadding, width, maxWords.
  */
  constructor(words, opts = {}) {
    // load in arguments from config object
    this.words = words;
    this.wordsToDisplay = Math.min(opts.maxWords || 500, this.words.length);
    this.width = opts.width || 960;
    this.height = opts.height || 500;
    this.lineHeight = opts.lineHeight || 30;
    this.linePadding = opts.linePadding || 20;
    this.wordHorizontalPadding = 10;
    this.wordVerticalPadding = 2;
    this.wordSeparation = 2;
    this.fontType = 'sans-serif';
    this.paragraph = 0;
    this.useColor = opts.useColor || false;
    this.opacityScale = undefined;
  }

  /**
   * Build the chart into the container.
   *
   * @param {string} containerId
   *   The name of the element to use as parent of the chart.
  */
  draw(containerId) {
    var _chart = this;
    this.containerId = containerId;
    this.buildTexts();
    var svg = d3.select('#' + containerId).append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.plot = svg.selectAll('g')
      .data(this.texts)
      .enter().append('g');

    // placeholder for background rect, position and size will be defined later
    this.plot.append('rect');

    // content of text will be defined later
    this.plot.append('text')
      .attr('font-family', this.fontType)
      .attr('font-size', this.lineHeight + 'px')
      .attr('x', function(d) { return d.x; })
      .attr('y', function(d) { return d.y; })
      .text(function(d) { return d.word; })
      .attr('text-anchor', 'left');

    svg.selectAll('text').each(function(d, i) {
      // get bounding box of text field and store it in texts array
      _chart.texts[i].bb = this.getBBox();
    });

    this.opacityScale = this.getOpacityScale();

    svg.selectAll('rect')
        .attr('x', function(d) {
          return d.x - _chart.wordHorizontalPadding/2;})
        .attr('y', function(d) {
          return d.y - d.bb.height + _chart.wordHorizontalPadding/2;  })
        .attr('width', function(d) {
          return d.bb.width + _chart.wordHorizontalPadding; })
        .attr('height', function(d) {
          return d.bb.height + _chart.wordVerticalPadding; });

    if (this.useColor) {
      svg.selectAll('rect')
          .attr('fill', function(d) {
            return d3.interpolatePiYG(_chart.opacityScale(d.attention)); })
    } else {  // Use opacity
      svg.selectAll('rect')
          .attr('opacity', function(d) {
            return _chart.opacityScale(d.attention); })
          .attr('fill', '#00A1E4');
    }
  }

  getYPosition() {
    this.yPosition = (this.line + 1) * this.lineHeight +
      this.line * this.linePadding;
  }

  getXPosition(word) {
    this.xPosition = this.visualLength(word) + this.xPosition +
      this.wordHorizontalPadding + this.wordSeparation;
    if (this.xPosition > this.height) {
      this.xPosition = 0;
      this.line = this.line + 1;
    }
  }

  getOpacityScale() {
    var domainMin = this.words.reduce(
      (min, p) => Math.min(p.attention, min), this.words[0].attention);
    var domainMax = this.words.reduce(
      (max, p) => Math.max(p.attention, max), this.words[0].attention);
    return d3.scale.linear().domain([domainMin, domainMax]).range([0, 1]);
  }

  addParagraph(word) {
    if (word.sentence != this.paragraph) {
      this.paragraph = parseInt(this.paragraph) + 1;
      this.xPosition = 0;
      this.line = this.line + 1;
    }
  }

  buildTexts() {
    this.texts = [];
    this.line = 0;
    this.xPosition = 0;
    this.paragraph = this.words[0].sentence || 0;  // First paragraph
    for (var i = 0; i < this.wordsToDisplay; i++) {
      var word = this.words[i];
      this.addParagraph(word)
      this.getYPosition();
      this.texts.push({
        index: i, word: word.token,
        x: this.xPosition,
        y: this.yPosition,
        attention: word.attention,
        sentence: parseInt(word.sentence) || 0
      });
      // Calculate the next x position
      this.getXPosition(word.token);
    }
  }

  visualLength(text) {
    if (this.ruler === undefined) {
      $('#' + this.containerId).eq(0).after('<span id="ruler"></span>');
      this.ruler = $('#ruler').eq(0);
      this.ruler.css({
        'font-size': this.lineHeight + 'px',
        'font-family': this.fontType,
        'visibility': 'hidden',
        'white-space': 'nowrap'
      });
    }
    this.ruler.html(text);
    return this.ruler.width();
  }
}
