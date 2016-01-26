/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 erkserkserks
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function() {
  // Override video element canPlayType() function
  var videoElem = document.createElement('video');
  var origCanPlayType = videoElem.canPlayType.bind(videoElem);
  videoElem.__proto__.canPlayType = function(type) {
    if (type === undefined) return '';
    // If queried about webM/vp8/vp8 support, say we don't support them
    if (type.indexOf('webm') != -1 ||
      type.indexOf('vp8') != -1 ||
      type.indexOf('vp9') != -1) {
      return '';
    }
    // Otherwise, ask the browser
    return origCanPlayType(type);
  }

  // Override media source extension isTypeSupported() function
  var mse = window.MediaSource;
  // Check for MSE support before use
  if (mse === undefined) return;
  var origIsTypeSupported = mse.isTypeSupported.bind(mse);
  mse.isTypeSupported = function(type) {
    if (type === undefined) return '';
    // If queried about webM/vp8/vp8 support, say we don't support them
    if (type.indexOf('webm') != -1 ||
      type.indexOf('vp8') != -1 ||
      type.indexOf('vp9') != -1) {
      return '';
    }
    // Do not support >30 fps video
    match = /framerate=(\d+)/.exec(type);
    if (match) {
      if (match[1] > 30) {
          return ''
      }
    }
    // Otherwise, ask the browser
    return origIsTypeSupported(type);
  }
})();

