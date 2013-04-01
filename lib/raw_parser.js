if (global.GENTLY) require = GENTLY.hijack(require);
var Buffer = require('buffer').Buffer;

function RawParser() {
  this.data = new Buffer('');
  this.bytesWriteten = 0;
}
exports.RawParser = RawParser;

RawParser.prototype.initWithLength = function(length) {
  this.data = new Buffer(length);
};

RawParser.prototype.write = function(buffer) {
  if (this.data.length >= this.bytesWritten + buffer.length) {
    buffer.copy(this.data, this.bytesWritten);
  } else {
    this.data = Buffer.concat([this.data, buffer]); 
  }
  this.bytesWritten += buffer.length;
  return buffer.length;
};

RawParser.prototype.end = function() {
  this.onEnd(this.data); 
};
